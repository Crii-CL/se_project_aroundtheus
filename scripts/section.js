export default class Section {
  constructor({ items, renderer }, cardsList) {
    this._items = items;
    this._renderer = renderer;
    this._cardsList = cardsList;
    //items serves as an array of data which you need to add on a page when initializing a class
    //renderer is a function responsible for createing and rendering data
  }

  renderItems() {
    this._items.forEach((cardData) =>
      this._renderer(this._items, this._cardsList)
    );
    // initialCards => this._items;
    //rendereCard => this._renderer
    //renders all elements on the page
    //renderer will render them
  }

  addItem() {
    //takes DOM element and adds it to the container
  }
}
