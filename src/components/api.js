// Token: "2fee5a13-ea32-4770-a359-bbaf2b3da470"
// group id: group-12
// https://around.nomoreparties.co/v1/group-12/

class Api {
  constructor(options) {
    this._options = options;
    // constructor body
  }

  getInitialCards() {
    GET("https://around.nomoreparties.co/v1/group-12/user/me", {
      headers: {
        authorization: "2fee5a13-ea32-4770-a359-bbaf2b3da470",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    });
  }

  // other methods for working with the API
}

// const api = new Api({
//   baseUrl: "https://around.nomoreparties.co/v1/group-12",
//   headers: {
//     authorization: "2fee5a13-ea32-4770-a359-bbaf2b3da470",
//     "Content-Type": "application/json",
//   },
// });
