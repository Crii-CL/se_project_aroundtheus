export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
    this._popupElement.addEventListener("mousedown", (e) =>
      this._handleOverlay(e)
    );
    console.log(this._popupElement);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
    this._popupElement.removeEventListener("mousedown", (e) =>
      this._handleOverlay(e)
    );
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay(e) {
    if (!e.target.classList.contains(".modal_opened")) {
      this.close();
    }
  }
}

const newPopup = new Popup({ popupSelector: ".modal" });
newPopup.open();
newPopup.close();
