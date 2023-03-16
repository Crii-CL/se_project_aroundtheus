import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
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
