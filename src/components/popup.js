export default class popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this.closeBtn = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this.removeEventListeners();
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

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._popupElement.addEventListener(
      "mousedown",
      this._handleOverlay.bind(this)
    );
    this.closeBtn.addEventListener("click", this.close.bind(this));
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleOverlay.bind(this)
    );
    this.closeBtn.removeEventListener("click", this.close.bind(this));
  }
}
