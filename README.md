# Front End Web Development Course - CODE By Comtrade
<h1 align="center">Final exam</h1>

[![Build Status][build-shield]]()
[![Code][code-clean]]()
<br />

<h1 align="center">Movie and TV watchlist</h1>

## Project

[![Moview][product-screenshot]](https://github.com/darkomingovski/moview)

## Project description

User friendly movie and tv show watchlist. User can browse whole TMDb database via TMDb api. Application has a sections as now popular movies, last aired tv shows, new movies in teathers etc. Movies and TV shows can be added to or removed from list of watched items and from planned items list too.

## Technology used

<p align="center">

![][html]&nbsp;
![][css]&nbsp;
![][js]&nbsp;
[![][jquery]](https://jquery.com)&nbsp;
[![][json]](https://my-json-server.typicode.com/)&nbsp;
[![][webpack]](https://webpack.js.org/)&nbsp;
[![][axios]](https://www.npmjs.com/package/axios)&nbsp;
[![][jest]](https://github.com/facebook/jest)
<br>
<p align="center">
<br>

## Installation

1. Clone the repo
```sh
git clone https://github.com/darkomingovski/moview.git
```
2. Install NPM packages
```sh
npm install or npm i
```
3. Start JSON server
```sh
npm run server
```
4. Start project
```sh
run index.html and login with demo/demo
```

## Project structure
```sh
.
├── dist
|   ├── js
|   │    └── main.bundle.js
│   └── main.bundle.css
├── node_modules
├── readme
├── src
│   ├── css
|   |   ├── app.css
│   │   └── main.css
│   ├── img
│   ├── js
│   │   ├── __mocks__
|   |   |       ├── fileMock.js
│   │   │       └── styleMock.js
│   │   ├── test
|   |   |     ├── compare-db.test.js
|   |   |     └── user.test.js
│   │   ├── app.js
│   │   ├── compare-db.js
│   │   ├── login.js
|   |   ├── main.js
|   |   ├── register.js
|   |   ├── user.js
│   │   └── watchlist.js
│   ├── app.html
│   └── index.html
├── webpack
|       ├── .eslintrc
|       ├── loaders.js
|       ├── plugins.js
|       ├── postcss.config.js
|       └── webpack.config.js
├── .gitignore
├── babel.config.js
├── db.json
├── package-lock.json
├── package.json
└── README.md
```

## Developers on this project

[@ Darko Mingovski](https://github.com/darkomingovski)

Project Link: [Git Hub Repo - Moview](https://github.com/darkomingovski/moview)
<br>

## Acknowledgements

* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Animate.css](https://daneden.github.io/animate.css)
* [Loaders.css](https://connoratherton.com/loaders)
* [Slick Carousel](https://kenwheeler.github.io/slick)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com)
* [Spinner](https://spin.js.org/)

<!-- LINKS & IMAGES -->
[build-shield]: https://img.shields.io/badge/build-passing-brightgreen.svg?style=popout
[code-clean]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=popout
[html]: https://img.shields.io/badge/HTML-v5-red.svg?style=popout&logo=html5
[css]: https://img.shields.io/badge/CSS-v3-blue.svg?style=popout&logo=css3
[js]: https://img.shields.io/badge/JavaScript-ES6-yellow.svg?style=popout&logo=javascript
[jquery]: https://img.shields.io/badge/jQuery-v3.4.0-violet.svg?style=popout&logo=jquery
[json]: https://img.shields.io/badge/JSON-v0.14.2-green.svg?style=popout&logo=json
[webpack]: https://img.shields.io/badge/WebPack-v4.30.0-blue.svg?style=popout&logo=webpack
[axios]: https://img.shields.io/badge/AXIOS-v0.18-lightblue.svg?style=popout&logo=codesandbox
[jest]: https://img.shields.io/badge/Jest-24.7.1-red.svg?style=popout&logo=appveyor
[product-screenshot]: ./readme/project.png