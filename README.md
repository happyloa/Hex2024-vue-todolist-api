![](https://i.imgur.com/0wgSHAE.png)

# 六角 2024 Vue 前端新手營最終挑戰 - Todolist API 整合證書任務

此專案為六角學院 2024 Vue 前端新手營最終挑戰之成品

- [線上部署連結](https://hex2024-vue-todolist-api.worksbyaaron.com/#/login)
- [設計稿](https://www.figma.com/design/MFSk8P5jmmC2ns9V9YeCzM/TodoList?node-id=0-1&t=hgswJMZPd4ttA8R8-0)
- [API 文件](https://todolist-api.hexschool.io/doc/#/)

## 使用技術

- [Vite](https://vitejs.dev/)
- [Vue 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)

## 開發環境設置

建議使用 [VSCode](https://code.visualstudio.com/) 搭配 [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## 快速開始

**專案設置（Project setup）**

將專案複製到本地端

```sh
$ git clone https://github.com/happyloa/Hex2024-vue-todolist-api.git
```

套件安裝

```sh
$ cd hex2024-vue-todolist-api
$ npm install
```

**執行專案（Start the server）**

```sh
$ npm run dev
```

在瀏覽器上輸入

```
http://localhost:5173/
```

即可在本地端預覽專案

## 頁面路徑（Router Link）

位於 `src/views` 與 `src/router`

結構說明

```
src/views
├── LoginView.vue                  豋入頁面
├── RegisterView.vue               註冊頁面
└── TodosView.vue                  待辦事項清單列表頁面
```

```
src/router
└── index.js                       Vue Router 路由表
```

## 元件檔案（Components）

位於 `src/components`

結構說明

```
src/components
├── todos
    ├── TodoInput.vue              用來新增待辦事項的 input 元件
    ├── TodoListContent.vue        代辦事項清單整體容器
    ├── TodoListItem.vue           代辦事項列表
    └── TodoNoItem.vue             沒有代辦事項時，顯示這個裝飾元件
├── LoginForm.vue                  登入表單
├── LogoAndDecoImage.vue           登入&註冊表單頁面裝飾元件
└── RegisterForm.vue               註冊表單
```

## 靜態檔案

位於 `public` 與 `src/assets`

結構說明

```
public
├── CNAME                          網站的 DNS CNAME 紀錄
└── favicon.ico                    網站 favicon
```

```
src/assets
├── css                            獨立出來的較長的樣式檔案
├── icons                          存放新增與刪除圖示
├── images                         存放裝飾圖片，網站 Logo 也在這
├── main.css                       網站整體樣式，有引入思源黑體 API
└── scrollBar.css                  頁面卷軸樣式
```

## 使用的套件 & 工具

- [axios](https://axios-http.com/)
- [gh-pages](https://www.npmjs.com/package/gh-pages)
- [sweetalert2](https://sweetalert2.github.io/)
- [Vue Router](https://router.vuejs.org/)
- [TinyPNG](https://tinypng.com/)
- [ChatGPT 4o](https://openai.com/)
