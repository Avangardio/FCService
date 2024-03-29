# FCService
Веб-сервис FCService от Avangardio.
Ознакомиться "вживую" можно на <a href="https://avangardio-1.ru" target = "_blank">моём сайте</a>.
<p><img src="https://avangardio-1.ru/static/TextHeader.svg"></p>

# Обзор
Данный проект рассчитывался как практический опыт в создании приложения по типу мессенджера, как полностью клиентскую, так и серверную часть.
Подробное описание проекта можно изучить в следующем документе: <a href="https://avangardio-1.ru/static/readme.pdf" target = "_blank">Документ</a> (ссылка на файл с моего сервера).
<p>Пользователи могут создавать аккаунты, редактировать и индивидуализировать свои профили, искать и общаться с другими пользователями, обмениваться фотографиями, а
хорошо продуманная архитектура и оптимизация позволяет сделать задержки в использовании минимальными.

# Доступные версии
Доступна релизная версия для пк и для мобильных устройств.
# Фотографии
<p>Вариант для компьютера:</p>
<img src="https://avangardio-1.ru/static/photo_desktop.png" style="border-radius: 5%;"/>
<p>Вариант для телефона:</p>
<img src="https://avangardio-1.ru/static/photo_mobile.png" style="border-radius: 5%;"/>

# Использованные технологии
Для своего проекта я использовал следующие технологии:
<p>Использование многих функций библиотеки <a href="https://https://reactjs.org/" target = "_blank">ReactJS</a> и грамотное управление ими позволяет создавать "живые" и крайне интересные проекты.
<p>С использованием хранилища состояний <a href="https://redux.js.org/" target = "_blank">ReduxJS</a> приложение становится намного продуманнее и интерактивнее из-за крайней полезности использования в клиентской части приложения! 
<p>Использование протокола WebSocket позволяет очень быстро получать и отсылать информацию между пользователями.
<p>Хранение сервером данных происходит в нереляционной базе данных <a href="https://www.mongodb.com/" target = "_blank">MongoDB</a>.
<p>Использование <a href="https://github.com/expressjs/express" target = "_blank">ExpressJS</a> дает большую вариативность создания серверной архитектуры, особенно хорошо использовать MVC-подход.
<p><a href="https://github.com/axios/axios" target = "_blank">Axios</a> - библиотека, намного упрощающая и повышающая удобства создания и получение ответа на запросы.
<p><a href="https://redis.io/">Redis</a> Дает огромные возможности для хранения данных и крайне быстрого взаимодействия с ними.

# Установка и локальное использование
Установка:
Скопировать репозиторий в ветке "dev".
<p>Для запуска что серверной, что клиентской части, рекомендую настроить запуск через команду "npm run start".

# Цели по изменению приложения
  <ul>
    <li>Провести переработку внешнего вида приложения</li>
        <li>Провести переработку элементов серверной архитектуры приложения</li>
        <li>Провести переработку элементов вида клиента</li>
    <li>Остальные общие улучшения проекта</li>
    </ul>
