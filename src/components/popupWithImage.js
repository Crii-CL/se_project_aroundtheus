// add image to the popup with he corresponding src att
//add caption to the popup

import popup from "./popup.js";

export default class popupImage extends popup {
  open(name, link) {
    const popupPreview = this._popupElement.querySelector(
      ".modalPreview__image"
    );
    const popupPreviewTitle = this._popupElement.querySelector(
      ".modalPreview__title"
    );

    popupPreview.src = link;
    popupPreviewTitle.textContent = name;
    popupPreview.alt = `Photo of ${name}`;
    super.open();
  }
}
