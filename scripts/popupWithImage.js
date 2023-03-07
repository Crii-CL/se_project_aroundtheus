// add image to the popup with he corresponding src att
//add caption to the popup

import Popup from "./popup.js";
import Card from "./card.js";

export default class PopupImage extends Popup {
  constructor() {
    this._image = this._popupElement.querySelector(".modalPreview__image");
    this._caption = this._popupElement.querySelector(".modalPreview__title");
    this._previewPopup = document.querySelector("#modal-preview");
  }

  open() {
    this._previewPopup.src = this._image;
    this._previewPopup.alt = this._caption;
    super.open();
  }
}
