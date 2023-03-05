export default class Section {
  constructor({ items, renderer }, cardsList) {
    this._items = items;
    this._renderer = renderer;
    this._cardsList = cardsList;
    //items serves as an array of data which you need to add on a page when initializing a class
    //renderer is a function responsible for createing and rendering data
  }

  renderItems(item) {
    this._items.forEach((item) => this._renderer(item));
    //renders all elements on the page
    //renderer will render them
  }

  addItem(item) {
    const newItem = this._renderer(item);
    this._cardsList.prepend(newItem);
    //takes DOM element and adds it to the container
  }
}
