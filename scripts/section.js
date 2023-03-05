export default class Section {
  constructor({ items, renderer }, cardEl) {
    this._items = items;
    this._renderer = renderer;
    this._cardEl = document.querySelector("#cards-list");
    //items serves as an array of data which you need to add on a page when initializing a class
    //renderer is a function responsible for createing and rendering data
  }

  renderItems() {
    //renders all elements on the page
    //renderer will render them
  }

  addItem() {
    //takes DOM element and adds it to the container
  }
}
