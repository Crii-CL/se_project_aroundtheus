// Token: "2fee5a13-ea32-4770-a359-bbaf2b3da470"
// group id: group-12
// https://around.nomoreparties.co/v1/group-12/

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._token = headers;
    // constructor body
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._token,
    }).then((res) => this._checkResponse(res));
  }

  updateProfileInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._token,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._token,
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._token,
      body: JSON.stringify({
        name,
        link,
        likes: [],
      }),
    }).then((res) => this._checkResponse(res));
  }

  getLikes() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._token,
    });
  }

  updateLikes(cardId, isliked) {
    return fetch(`${this._baseUrl}/cards/like${cardId}`, {
      method: isliked ? "PUT" : "DELETE",
      headers: this._headers,
    });
  }

  // getAPiInfo() {
  //   return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  // }

  // in createcard method call api for getlikes for the card and
  //display the number returned

  // in the likebutton event handler do api call to update likes that
  //returns total number of likes for that card and then update number of likes element

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}
