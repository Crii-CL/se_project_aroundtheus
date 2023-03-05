export default class Section {
  constructor({ items, renderer }, cardEl) {
    this._items = items;
    this._renderer = renderer;
    this._cardEl = document.querySelector("#card");
  }

  renderItems() {}

  addItem() {}
}
