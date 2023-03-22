export default class Card {
  constructor(data, userId, cardSelector, handleImageClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = userId;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  setEventListeners() {
    this._cardImg.addEventListener("click", () => this._handlePreview());
    this._cardDelBtn.addEventListener("click", () => this._handleDelCard());
    this._likeBtn.addEventListener("click", () => this._handleLikeClick());
  }

  _handleDelCard = () => {
    this._element.remove();
    this._element = null;
  };

  _handleLikeBtn = () => {
    this._likeBtn.classList.toggle("card__like-button_active");
  };

  _handlePreview() {
    this._handleImageClick(this._name, this._link);
  }

  isLiked() {
    // .classList.contains("card__like-button_active");
    // this._element.querySelector(".card__like-button").owner._id;
    return this._likes.some((like) => {
      return like.owner._id === this._userId;
    });
  }

  renderCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector(".card__like-button");
    this._cardImg = this._element.querySelector(".card__image");
    this._cardDelBtn = this._element.querySelector(".card__delete-button");
    const cardTitle = this._element.querySelector(".card__title");
    const cardCounter = this._element.querySelector(".card__like-counter");

    this._cardImg.src = this._link;
    this._cardImg.alt = `Photo of ${this._name}`;
    cardTitle.textContent = this._name;
    cardCounter.textContent = this._likes.length;

    this.setEventListeners();

    return this._element;
  }
}

//compare to card.owner._id
//loop every id in the likes array
//compare your id to ids in the likes array to determine whether to "put" or "delete"
