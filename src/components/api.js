// Token: "2fee5a13-ea32-4770-a359-bbaf2b3da470"
// group id: group-12
// https://around.nomoreparties.co/v1/group-12/

export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._token = headers;
    // constructor body
  }

  _checkResponse() {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  _getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._token,
    }).then(this._checkResponse);
  }

  _getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._token,
    }).then(this._checkResponse);
  }
}
