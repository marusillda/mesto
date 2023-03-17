export default class Api {
  constructor(options) {
    this._options = options;
  }

  /**
   * Запрос списка начальных карточек
   */
  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: this._options.headers.authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка получения начальных карточек: ${res.status}`);
      });
  }

  /**
   * Запрос данных пользователя
   */
  getUserProfile() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: this._options.headers.authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка получения данных пользователя: ${res.status}`);
      });
  }

  /**
   * Запрос на изменение данных пользователя
   * @param {Object} userProfile
   */
  changeUserProfile(userProfile) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify(userProfile)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка изменения данных пользователя: ${res.status}`);
      });
  }

  /**
   * Запрос на создание новой карточки
   * @param {Object} card
   */
  addNewCard(card) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify(card)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка добавления новой карточки: ${res.status}`)
      });
  }

  /**
   * Запрос на удаление карточки
   * @param {String} cardId
   */
  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._options.headers.authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка удаления карточки: ${res.status}`)
      });
  }

  /**
   * Запрос на добавление лайка карточке
   * @param {String} cardId
   */
  likeCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._options.headers.authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка добавления лайка карточке: ${res.status}`)
      });
  }

  /**
   * Запрос на снятие лайка с карточки
   * @param {String} cardId
   */
  unlikeCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._options.headers.authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка снятия лайка с карточки: ${res.status}`)
      });
  }

  /**
   * Запрос на изменение аватара
   * @param {String} avatar
   */
  changeAvatar(avatar) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({ avatar })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка изменения аватара: ${res.status}`)
      });
  }
}
