# Чат с JWT авторизацией (frontend)

Для создания использованы следующие основные библиотеки:
+ React + TypeScript
+ Redux
+ Axios
+ Material UI
+ Socket.io
+ Date fns
+ Formik

## Запуск приложения:
1. Backend тут https://github.com/vbmakarov/chat1-backend
Не забудьте установить зависимости командой npm i
2. Для локального сервера, в файле package.json заменить строку: "start": "node server.js", на "start": "react-scripts build". Перейти в папку src командой npm start или yarn start запустить приложение.
Приложение запустится на http://localhost:3000
3. Для рабочего VPS сервера произвести сборку приложения командой npm build и запустить
приложение командой npm start