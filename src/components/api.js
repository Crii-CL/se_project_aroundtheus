// Token: "2fee5a13-ea32-4770-a359-bbaf2b3da470"
// group id: group-12
// https://around.nomoreparties.co/v1/group-12/

export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._header = headers;
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
      headers: {
        authorization: `Bearer ${this._headers}`,
      },
    });
  }

  _getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards "), {};
  }
}
