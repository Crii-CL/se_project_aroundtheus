class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreview);
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDelBtn);
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeBtn);
  }
  _handleDelBtn(e) {
    const card = e.target.closest("#card");
    card.remove();
  }

  _handleLikeBtn(e) {
    e.target.classList.toggle("card__like-button_active");
  }

  _handlePreview() {
    this._element.querySelector(
      "#modal-preview-image"
    ).src = `url(${this._link})`;
    this._element.querySelector("#modal-preview-title").textContent =
      this._name;
  }

  getView() {
    this._element = this._getTemplate;

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;

    this._element.querySelector("#modal-preview-image").textContent =
      this._name;

    this._element.querySelector("card__title").textContent = this._name;

    this._setEventListeners();
  }
}

export default Card;

// It takes card data — text and a link to the image — and a template element selector as parameters into the constructor.
// It has private methods for working with markup and adding event listeners.
// It has private methods for each event handler.
// It has one public method that returns a fully functional card element populated with data.
