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
      }),
    }).then((res) => this._checkResponse(res));
  }

  // showLikes() {
  //   return fetch(`${this._baseUrl}/cards`), {
  //     method: "GET";
  //     headers: this._headers,
  //   }
  // }

  getAPiInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
