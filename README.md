# shopping-platform

A practice of shopping platform with javascript.

嘗試用這幾年學到的各種框架、套件做一個簡單的專案。

這個購物網站的框架使用

- NodeJs的ExpressJS作為
- Mongoose作為ORM，處理
- Redis處理網頁會話（Session）與Cookie。
- jQuery處理前段頁面，主要是Server-side rendering的設計。

細節：

- Server端兼用async/await以及JS原生Promise處理非同步操作。
- 註冊會員：除了可以直接在平台上註冊，也可以透過Twitter/Facebook/Yahoog使用Oauth2.0驗證。使用Passport.js串接各個驗證服務提供商。

- Session 使用 `express-session` `redis` `connect-redis`


額外注意到的

- 可用redis實作小型的Pub/Sub
