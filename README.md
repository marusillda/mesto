# Проект: Место

## [Демонстрация сайта](https://marusillda.github.io/mesto/)

![Превью проекта](./images/preview.jpg)

## ***Содержание:***
- [Описание проекта](#Description)
- [Используемые технологии](#Technologies)
- [Структура каталога проекта](#ProjectStructure)
- [Оценка качества кода](#Quality)
- [Планы по доработке проекта](#Planes)


# Описание проекта <a name="Description"></a>

**Место** — самостоятельный интерактивный проект в рамках обучения на курсе "Web-разработчик" в Яндекс Практикум с использованием Java Script. В рамках обучения для выполнения проектной работы был предоставлен макет в программе [Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1), по которому нужно было сверствать сайт.
Проект "Место" должен корректно отображаться на экранах размеров 1280px и 320px.


# Используемые технологии <a name="Technologies"></a>

1. Проект реализован с помощью языка разметки HTML5.

2. За описание внешнего вида сайта отвечает язык каскадных таблиц стилей CSS.

3. Все элементы страницы и стили реализованы в соответствии с концепцией [БЭМ](https://ru.bem.info/methodology/quick-start/).

4. При размещении элементов на странице использовалась технология для создания сложных гибких макетов [CSS Flexbox](https://doka.guide/css/flexbox-guide/) и технология [CSS Grid Layout](https://doka.guide/css/flexbox-guide/), которая предлагает систему компоновки на основе сетки со строками и столбцами.

5. Все кнопки на странице имеют состояние наведении мыши. Этот эффект реализован с использованием [псевдоклассов](https://doka.guide/css/pseudoclasses/) и свойства [CSS Transition](https://doka.guide/css/transition/).

7. Изменение внешнего вида элемнтов для корректного отображения на устройствах разного типа реализовано с помощью директив CSS - [медиазапросов](https://doka.guide/css/media/).

8. С помощью Java Script реализовано:
 - диалоговое окно из макета — «Редактировать профиль». В нём два поля: «Имя» и «О себе», а также кнопка «Сохранить». Открытие и закрытие popup, изменение имени пользователя и раздела «О себе» реализовано с помощью Java Script. Пока эта информация не сохраняется между перезагрузками страницы, функционал будет добавлен позже после подключения к серверу.
 - форма добавления новой карточки. Форма открывается нажатием на кнопку «+» и закрывалась кликом на крестик. Можно написать имя карточки и дать ссылку на картинку. При клике на «сохранить» новая карточка попадает в начало контейнера с ними. А диалоговое окно после добавления автоматически закрывается.
 - арточки можно лайкать. Изменение цвета сердечка реализовано с помощью Java Script.
 - удаление карточек по нажатию на кнопку с изображением урны.
 - открытие попапа с картинкой. Картинки открываются нажатием на картинку и закрываются кликом на крестик.
 - реализована валидация всех форм. Если хотя бы одно из полей формы не валидно - кнопка submit становится неактивной и выводится сообщение об ошибке к невалидному полю. Невалидное поле помечается красным подчеркиванием. Валидвция "живая".
 - реализовано закрыте любого попап по нажатию клавиши Escape.
 - реализовано закрытие попап по клику на любом месте в Overlay кроме попап.
 - произведен рефакторинг в объектно-ориентированном стиле в соответствии принципами инкапсуляции, наследования и полиморфизма: созданы классы Card, Section, Popup, PopupWithImage, PopupWithForm, UserInfo, FormValidator.
 - используются ES6-классы, директивы import и  export.

9. Плавное открытие и закрытие попапов реализовано с помощью свойств СSS visibility, opacity и transition.

# Структура каталога проекта <a name="ProjectStructure"></a>

```
📦mesto
 ┣ 📂blocks
 ┃ ┣ 📂element
 ┃ ┃ ┣ 📂__capture
 ┃ ┃ ┃ ┗ 📜element__capture.css
 ┃ ┃ ┗ 📂__capture-like
 ┃ ┣ 📂page
 ┃ ┣ 📂popup
 ┃ ┣ 📂profile
 ┃ ┗📂selectable-black
 ┣ 📂fonts
 ┃ ┣ 📜Inter-Regular.woff
 ┃ ┗ 📜Inter-Regular.woff2
 ┣ 📂images
 ┣ 📂pages
 ┃ ┗ 📜index.css
 ┣ 📂scripts
 ┃ ┣ 📜Card.js
 ┃ ┣ 📜constants.js
 ┃ ┣ 📜FormValidator.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜Popup.js
 ┃ ┣ 📜PopupWithForm.js
 ┃ ┣ 📜PopupWithImage.js
 ┃ ┣ 📜Section.js
 ┃ ┗ 📜UserInfo.js
 ┣ 📂vendor
 ┃ ┣ 📜fonts.css
 ┃ ┗ 📜normalize.css
 ┣ 📜.editorconfig
 ┣ 📜.nojekyll
 ┣ 📜index.html
 ┗ 📜README.md

📜.editorconfig - Файл настроек форматирования кода
📜.nojekyll     - Пустой файл, нужен для корректной публикации в GitHub Pages
📜index.html    - Главная страница сайта
📜README.md     - Файл документации проекта
📂blocks        - Каталог, содержащий CSS стили согласно концепции Nested BEM
📂images        - Каталог, содержащие изображения
📂pages         - Каталог в котором подключаются CSS стили, необходимые конкретной странице
📂vendor        - Каталог с 3rd-party зависимостями
📂scripts       - Каталог с js-скриптами
```
# Оценка качества кода <a name="Quality"></a>
Качество кода обусловлено его проверкой по чек-листу Яндекс Практикума, автоматическими проверками и код-ревью специалистом Яндекс Практикума.

Для преварительной проверки использованы валидаторы
- [Markup Validation Service](https://validator.w3.org/#validate_by_uri)
- [Генератор HTML-дерева](https://yoksel.github.io/html-tree/)

# Планы по доработке проекта <a name="Planes"></a>
- Продолжить работу над интерактивной страницей.

