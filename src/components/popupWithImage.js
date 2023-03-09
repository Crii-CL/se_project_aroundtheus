// add image to the popup with he corresponding src att
//add caption to the popup

import Popup from "./popup.js";

export default class PopupImage extends Popup {
  open(name, link) {
    this._popupElement.querySelector(".modalPreview__title").textContent = name;
    this._popupElement.querySelector(".modalPreview__image").src = link;
    this._popupElement.alt = `Photo of ${name}`;
    super.open();
  }
}
