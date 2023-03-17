// Token: "2fee5a13-ea32-4770-a359-bbaf2b3da470"
// group id: group-12
// https://around.nomoreparties.co/v1/group-12/

export default class Api {
  constructor(options) {
    this._options = options;
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "2fee5a13-ea32-4770-a359-bbaf2b3da470",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}
