//Находим DOM-элементы
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
const editFormNameElement = document.querySelector('#profile_name');
const editFormAboutElement = document.querySelector('#profile_about');
const addFormNameElement = document.querySelector('#card_name');
const addFormLinkElement = document.querySelector('#card_link');
const popupCloseButtons = Array.from(document.querySelectorAll('.popup__close-button'));
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupAddForm = popupNewCard.querySelector('.popup__form');
const initialCards = [
  {
    name: 'Эсто-Садок',
    link: './images/element-esto.jpg'
  },
  {
    name: 'Побережье Анапы',
    link: './images/element-anapa.jpg'
  },
  {
    name: 'Абрау Дюрсо',
    link: './images/element-abrau.jpg'
  },
  {
    name: 'Красная Поляна',
    link: './images/element-mountain.jpg'
  },
  {
    name: 'Морской вокзал Сочи',
    link: './images/element-sochi.jpg'
  },
  {
    name: 'Роза Хутор',
    link: './images/element-rosa-hutor.jpg'
  }
];

/**
 * переключение состояния кнопки Like
 * @param {HTMLElement} likeButton
 */
function toggleLikeCard(likeButton){
  likeButton.classList.toggle('element__like-fill');
}

/**
 * Удаление карточки из DOM
 * @param {HTMLElement} cardElement
 */
function removeCardElement(cardElement){
  cardElement.remove();
}

/**
 * Обработка события клика по кнопке Like
 * @param {Event} event
 */
function handleLikeButtonClick(event){
  toggleLikeCard(event.target);
}

/**
 * Обработка события клика по кнопке Удалить карточку
 * @param {Event} event
 */
function handleRemoveButtonClick(event){
  const cardElement = event.target.closest('.element');
  removeCardElement(cardElement);
}

/**
 * Создание карточки по шаблону
 * @param {Object} card Объект с полями name  и  link
 * @returns {HTMLElement}
 */
function getCard(card){
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__photo').src = card.link;
  cardElement.querySelector('.element__photo').alt = card.name;
  cardElement.querySelector('.element__capture').textContent = card.name;
  cardElement.querySelector('.element__like').addEventListener('click', handleLikeButtonClick);
  cardElement.querySelector('.element__trash').addEventListener('click', handleRemoveButtonClick);

  return cardElement;
}

/**
 * Добавляет карточку в DOM в конец
 * @param {HTMLElement} cardElement
 */
function appendCard(cardElement){
  const cardElements = document.querySelector('.elements');
  cardElements.append(cardElement);
}

/**
 * Добавляет карточку в DOM в начало
 * @param {HTMLElement} cardElement
 */
function prependCard(cardElement){
  const cardElements = document.querySelector('.elements');
  cardElements.prepend(cardElement);
}

/**
 * Загрузка начальных карточек их массива
 */
function loadInitialCards(){
  initialCards.forEach(function (card){
    const cardElement = getCard(card);
    appendCard(cardElement);
  });
}

/**
 * Закрытие Popup
 * @param {HTMLElement} popup
 */
function closePopup(popup){
  popup.classList.remove('popup_opened');
}

/**
 * Обработчик события Form Submit
 * @param {Event} event
 */
function handleEditFormSubmit(event){
  event.preventDefault();

  profileNameElement.textContent = editFormNameElement.value;
  profileAboutElement.textContent = editFormAboutElement.value;

  closePopup(popupEdit);
}

/**
 * Обработчик события Add Form Submit
 * @param {Event} event
 */
function handleAddFormSubmit(event){
  event.preventDefault();
  const newCard = {
    name: addFormNameElement.value,
    link: addFormLinkElement.value
  };
  const cardElement = getCard(newCard);
  prependCard(cardElement);
  closePopup(popupNewCard);
}

/**
 * Открытие Popup
 * @param {HTMLElement} popup
 */
function openPopup(popup){
  popup.classList.add('popup_opened');
}

/**
 * Обработчик закрытия Popup
 */
function handlePopupClose(event){
  const popup = event.target.closest('.popup');
  closePopup(popup);
}

/**
 * Обработчки открытия Popup с редактированием имени профиля и профессии
 */
function handlePopupEditOpen(){
  editFormNameElement.value = profileNameElement.textContent;
  editFormAboutElement.value = profileAboutElement.textContent;

  openPopup(popupEdit);
}

/**
 * Обработчки открытия Popup добавления карточки
 */
function handlePopupAddOpen(){
  popupAddForm.reset();
  openPopup(popupNewCard);
}

//Обработчики событий
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupAddForm.addEventListener('submit', handleAddFormSubmit);
popupCloseButtons.forEach(function(closeButton){
  closeButton.addEventListener('click', handlePopupClose);
});
profileEditButton.addEventListener('click', handlePopupEditOpen);
profileAddButton.addEventListener('click', handlePopupAddOpen);

loadInitialCards();
