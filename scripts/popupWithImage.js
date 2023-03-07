// add image to the popup with he corresponding src att
//add caption to the popup

import Popup from "./popup.js";

export default class PopupImage extends Popup {
  constructor({ src, caption }) {
    this._src = src;
    this._caption = caption;
  }

  open() {
    super.open();
  }
}
