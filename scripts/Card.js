class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreview());
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelCard);
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeBtn);
  }

  _handleDelCard(e) {
    const card = e.target.closest("#card");
    card.remove();
  }

  _handleLikeBtn(e) {
    e.target.classList.toggle("card__like-button_active");
  }

  _handlePreview() {
    document.querySelector("#modal-preview-image").src = this._link;
    document.querySelector("#modal-preview-title").textContent = this._name;
  }

  renderCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__image").src = this._link;

    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
