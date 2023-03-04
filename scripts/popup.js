export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", () => this._handleEscClose());
    document.addEventListener("mousedown", () => this._handleOverlay());
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", () => this._handleEscClose());
    document.removeEventListener("mousedown", () => this._handleOverlay());
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      // const openedPopup = document.querySelector(".modal_opened");
      this.close();
    }
  }

  _handleOverlay(e) {
    if (e.target !== this._popupElement) {
      this.close();
    }
  }
}

const newPopup = new Popup({ popupSelector: ".modal" });
newPopup.open();
newPopup.close();
newPopup._handleEscClose();