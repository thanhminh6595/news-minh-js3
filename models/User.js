"use strict";
const btnPrev = document.getElementById(`btn-prev-list`);
const btnNext = document.getElementById(`btn-next-list`);
// const btnPrevSearch = document.getElementById(`btn-prev`);
// const btnNextSearch = document.getElementById(`btn-next`);
const btnSubmit = document.getElementById(`btn-submit`);
const btnLogout = document.getElementById(`btn-logout`);
const btnAdd = document.getElementById(`btn-add`);
const inputFirstName = document.getElementById(`input-firstname`);
const inputLastName = document.getElementById(`input-lastname`);
const inputUserName = document.getElementById(`input-username`);
const inputPassword = document.getElementById(`input-password`);
const inputPasswordConfirm = document.getElementById(`input-password-confirm`);
const inputTask = document.getElementById(`input-task`);
const inputPageSize = document.getElementById(`input-page-size`);
const inputCategory = document.getElementById(`input-category`);
const inputQuery = document.getElementById(`input-query`);

const modalLogin = document.getElementById(`login-modal`);
const mainContent = document.getElementById(`main-content`);
const newsContainer = document.getElementById(`news-container`);
const pageList = document.getElementById(`page-list`);
const todoList = document.getElementById(`todo-list`);

const apiKey = `0af00281aa6d4c70abaa49d5c733d8e0`;
let pageSize = localStorage.getItem(`pageSize`) || 10;
let country = `us`;
let category = localStorage.getItem(`category`) || `Business`;
let page = 1;
let end = 0;

//Hàm khởi tạo
const userParse = function (dataUser) {
  return new UserCl(
    dataUser.firstName,
    dataUser.lastName,
    dataUser.userName,
    dataUser._password
  );
};
//1. Tạo Class User
class UserCl {
  //Private field (instance)
  // #password;
  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this._password = password;
  }
  // getPassword() {
  //   return this.#password;
  // }
}
//Tạo Class Task
class Task {
  constructor(task, owner, isDone = false) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

//Hàm hiển thị tin tức
const renderNews = function (dataNews, length = dataNews.articles.length) {
  newsContainer.innerHTML = ``;
  for (let i = 0; i < length; i++) {
    const html = `<div class="card flex-row flex-wrap">
              <div class="card mb-3" style="">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="${dataNews.articles[i].urlToImage}"
                      class="card-img"
                      alt="MIT researchers uncover ‘unpatchable’ flaw in Apple M1 chips - TechCrunch">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${dataNews.articles[i].title}</h5>
                      <p class="card-text">${dataNews.articles[i].content}</p>
                      <a href="${dataNews.articles[i].url}"
                        class="btn btn-primary">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
    newsContainer.insertAdjacentHTML(`beforeend`, html);
  }
};
//Hàm hiển thị số trang
const renderPagination = function () {
  pageList.innerHTML = ``;
  const html = `<a class="page-link" id="page-num">${page}</a>`;
  pageList.insertAdjacentHTML(`beforeend`, html);
};

/*
//Hàm hiển thị số trang(Advanded)
const renderPagination = function () {
  pageList.innerHTML = ``;
  let i;
  if (page >= 3) {
    for (i = page - 3; i < end + 5; i++) {
      if (i === page - 1) {
        const html = `<a class="page-link active" id="page-num">${i + 1}</a>`;
        pageList.insertAdjacentHTML(`beforeend`, html);
      } else {
        const html = `<a class="page-link" id="page-num">${i + 1}</a>`;
        pageList.insertAdjacentHTML(`beforeend`, html);
      }
    }
    end++;
  } else {
    pageList.innerHTML = ``;
    for (i = 0; i < 5; i++) {
      if (i === page - 1) {
        const html = `<a class="page-link active" id="page-num">${i + 1}</a>`;
        pageList.insertAdjacentHTML(`beforeend`, html);
      } else {
        const html = `<a class="page-link" id="page-num">${i + 1}</a>`;
        pageList.insertAdjacentHTML(`beforeend`, html);
      }
    }
  }
};
//Hàm hiển thị số trang2(Advanded2)
const renderPaginationHideNext = function () {
  pageList.innerHTML = ``;
  let i;
  for (i = page - 2; i < page + 2; i++) {
    if (i === page) {
      const html = `<a class="page-link active" id="page-num">${i}</a>`;
      pageList.insertAdjacentHTML(`beforeend`, html);
    } else {
      const html = `<a class="page-link" id="page-num">${i}</a>`;
      pageList.insertAdjacentHTML(`beforeend`, html);
    }
  }
};
*/
//Hàm kiểm tra nút nhấn next
const validatePageNext = function (getNews, pageSize) {
  getNews().then((res) => {
    if (page === Math.ceil(res.totalResults / pageSize)) {
      btnPrev.style.display = `block`;
      btnNext.style.display = `none`;
    } else {
      btnPrev.style.display = `block`;
      btnNext.style.display = `block`;
    }
  });
};
//Hàm kiểm tra nút nhấn Previous
const validatePagePrev = function () {
  if (page === 1) {
    btnPrev.style.display = `none`;
    btnNext.style.display = `block`;
  } else {
    btnPrev.style.display = `block`;
    btnNext.style.display = `block`;
  }
};
