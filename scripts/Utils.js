class Popup {
  constructor(element) {
    this._element = element;
  }

  _setEventListeners() {}

  openPopup() {
    this._element.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleOverlayClose);
  }

  closePopup() {
    this._element.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleOverlayClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target.classList.contains("modal_opened")) {
      this.close();
    }
  }
}

export default Popup;

// export default Utils;
