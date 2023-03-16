import '../pages/index.css';

import {
  cardElementsSelector,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  popupDeleteCardSelector,
  popupEditSelector,
  popupAddSelector,
  validationOptions,
  profileEditButton,
  profileAddButton,
  profileAvatarElement,
  pageForms,
  popupPreviewSelector,
  popupImageSelector,
  popupNameSelector,
  popupAddFormName,
  popupEditAvatarFormName,
  popupEditAvatarSelector,
  popupEditFormName,
  popupFormSelector,
  popupFieldSelector,
  popupConfirmButtonSelector,
  baseUrl,
  authorization
} from '../constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api';
import PopupWithConfirm from '../components/PopupWithConfirm';

const popupPreview = new PopupWithImage({ popupSelector: popupPreviewSelector, popupImageSelector, popupNameSelector });
popupPreview.setEventListeners();

let myId;

const userInfo = new UserInfo(profileNameSelector, profileAboutSelector, profileAvatarSelector);

const popupEdit = new PopupWithForm({ popupSelector: popupEditSelector, popupFormSelector, popupFieldSelector }, (formValues) => {
  api.changeUserProfile(formValues)
    .then((userProfile) => {
      userInfo.setUserInfo(userProfile);
    })
    .catch(error => console.error(error));
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({ popupSelector: popupAddSelector, popupFormSelector, popupFieldSelector }, handleAddFormSubmit);
popupAdd.setEventListeners();

const popupEditAvatar = new PopupWithForm({ popupSelector: popupEditAvatarSelector, popupFormSelector, popupFieldSelector }, handleEditAvatarFormSubmit);
popupEditAvatar.setEventListeners();

const popupDeleteConfirm = new PopupWithConfirm({ popupSelector: popupDeleteCardSelector, popupConfirmButtonSelector });
popupDeleteConfirm.setEventListeners();

/**
 *
 * @param {{name: string, link: string}} item
 */
function createCard(item) {
  const card = new Card(
    {
      data: item,
      userId: myId,
      handleCardClick: popupPreview.open.bind(popupPreview),
      handleApiLikeButtonClick: (data, isLiked) => {
        const promise = isLiked ? api.unlikeCard(data._id) : api.likeCard(data._id);
        promise.catch(error => console.error(error));
        return promise;
      },
      handleApiRemoveButtonClick: (data) => {
        const promise = new Promise((resolve, reject) => {
          popupDeleteConfirm.setButtonClickAction(() => {
            api.deleteCard(data._id)
              .then(resolve)
              .catch(error => {
                reject(error);
                console.error(error);
              });
          });
          popupDeleteConfirm.open();
        });

        return promise;
      }
    },
    '#card'
  );
  const cardElement = card.getCard();
  return cardElement;
}

/**
 * Обработчик события Edit Avatar Form Submit
 * @param {object} formValues
 */
function handleEditAvatarFormSubmit(formValues) {
  api.changeAvatar(formValues.link)
    .then((avatar) => {
      userInfo.setUserAvatar(avatar);
    }
    )
    .catch(error => console.error(error));
}

/**
 * Обработчик события Add Form Submit
 * @param {object} formValues
 */
function handleAddFormSubmit(formValues) {
  api.addNewCard(formValues)
    .then((card) => {
      const cardElement = createCard(card);
      initialCardList.addItem(cardElement, false);
    }
    )
    .catch(error => console.error(error));
}

/**
 * Создает FormValidator и включает живую валидацию
 * @param {HTMLElement} formElement
 */
function createFormValidator(formElement) {
  const validator = new FormValidator(validationOptions, formElement);
  validator.enableValidation();

  return validator;
}

//Создает валидатор для каждой формы на странице и запоминаем валидатор для popupEditForm
const formValidators = {};
pageForms.forEach(formElement => {
  const validator = createFormValidator(formElement);
  const formName = formElement.getAttribute('name');

  formValidators[formName] = validator;
});

//Обработчики событий
profileEditButton.addEventListener('click', () => {
  popupEdit.open(userInfo.getUserInfo());
  //Очищает ошибки валидации
  formValidators[popupEditFormName].resetValidation();
});
profileAddButton.addEventListener('click', () => {
  popupAdd.open();
  formValidators[popupAddFormName].resetValidation();
});
profileAvatarElement.addEventListener('click', () => {
  popupEditAvatar.open();
  formValidators[popupEditAvatarFormName].resetValidation();
});

const api = new Api({
  baseUrl,
  headers: {
    authorization,
    'Content-Type': 'application/json'
  }
});

api.getUserProfile()
  .then((userProfile) => {
    myId = userProfile._id;
    userInfo.setUserInfo(userProfile);
    userInfo.setUserAvatar(userProfile);
  })
  .catch(error => console.error(error));

let initialCardList;

api.getInitialCards()
  .then((items) => {
    initialCardList = new Section({
      items,
      renderer: (item) => {
        const cardElement = createCard(item);
        initialCardList.addItem(cardElement);
      }
    }, cardElementsSelector);

    initialCardList.renderItems();
  })
  .catch(error => console.error(error));
