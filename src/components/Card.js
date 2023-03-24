export default class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDelClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = userId;
    // this._ownerId = ownerId;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDelClick = handleDelClick;
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
    this._cardDelBtn.addEventListener("click", () =>
      this._handleDelClick(this._cardId)
    );
    this._likeBtn.addEventListener("click", () =>
      this._handleLikeClick(this._cardId, this._isLiked())
    );
  }

  _handleDelCard = () => {
    this._element.remove();
    this._element = null;
  };

  handleLikeBtn = (res) => {
    this._likes = res.likes;
    this._cardCounter.textContent = this._likes.length;

    if (this._isLiked()) {
      this._likeBtn.classList.add("card__like-button_active");
    } else {
      this._likeBtn.classList.remove("card__like-button_active");
    }
  };

  _handlePreview() {
    this._handleImageClick(this._name, this._link);
  }

  _isLiked() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  // _setLiked() {

  // }

  // _checkCardOwner() {
  //   return this._userId === this._ownerId;
  // }

  renderCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector(".card__like-button");
    this._cardImg = this._element.querySelector(".card__image");
    this._cardDelBtn = this._element.querySelector(".card__delete-button");
    this._cardCounter = this._element.querySelector(".card__like-counter");
    const cardTitle = this._element.querySelector(".card__title");

    this._cardImg.src = this._link;
    this._cardImg.alt = `Photo of ${this._name}`;
    cardTitle.textContent = this._name;
    this._cardCounter.textContent = this._likes.length;

    this.setEventListeners();

    return this._element;
  }
}
