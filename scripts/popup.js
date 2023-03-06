export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._removeEventListeners();
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay(e) {
    if (e.target.classList.contains("modal_opened")) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
    document.addEventListener("mousedown", (e) => this._handleOverlay(e));
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
    document.removeEventListener("mousedown", (e) => this._handleOverlay(e));
  }
}
