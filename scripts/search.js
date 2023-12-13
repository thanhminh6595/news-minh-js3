"use strict";
let keyWord;
console.log(`----------Search Pages----------`);
const currentUser = userParse(JSON.parse(getFromStorage(`currentUser`, `{}`)));

//Bắt sự kiện nút nhấn submit
let flag = true;
btnSubmit.addEventListener(`click`, function (e) {
  //Kiểm tra đã đăng nhập chưa.
  if (currentUser.userName) {
    if (inputQuery.value) {
      keyWord = inputQuery.value;
      getSearchNews().then((res) => {
        if (res.totalResults === 0) {
          newsContainer.innerHTML = `Không tìm thấy thông tin`;
          btnPrev.style.display = `block`;
          btnNext.style.display = `block`;
          renderPagination(1, 1);
        } else {
          renderNews(res, pageSize);
          renderPagination();
          validatePagePrev();
          document.getElementById("nav-page-num").style.display = `block`;
          page = 1;
        }
        flag = false;
      });
    } else {
      alert(`Vui lòng nhập từ khóa tìm kiếm`);
    }
  } else {
    alert(`Vui lòng Login để sử dụng tính năng này`);
    window.location.href = `../index.html`;
  }
});
const getSearchNews = async function () {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${keyWord}&page=${page}&apiKey=${apiKey}`
  );
  const data = await res.json();
  if (data.status === `error`) {
    alert(`${data.message}`);
    throw new Error(`Something went wrong. ${data.code}. Try again!`);
  } else if (data.status === `Bad Request`) {
    alert(
      `The request was unacceptable, often due to a missing or misconfigured parameter`
    );
    throw new Error(`Something went wrong. Try again!`);
  } else if (data.status === `Unauthorized`) {
    alert(`Your API key was missing from the request, or wasn't correct.`);
    throw new Error(`Something went wrong. Try again!`);
  } else if (data.status === `Too Many Requests`) {
    alert(
      `You made too many requests within a window of time and have been rate limited. Back off for a while`
    );
    throw new Error(`Something went wrong. Try again!`);
  } else if (data.status === `Server Error`) {
    alert(`Something went wrong on our side.`);
    throw new Error(`Something went wrong. Try again!`);
  }
  return data;
};
//Xử lý nút nhấn Previous
btnPrev.addEventListener(`click`, function (e) {
  e.preventDefault();
  page -= 1;
  if (page >= 1) {
    getSearchNews().then((res) => {
      validatePagePrev();
      renderPagination();
      renderNews(res, pageSize);
    });
  }
});
//Xử lý nút nhấn Next
btnNext.addEventListener(`click`, function (e) {
  e.preventDefault();
  if (!flag) {
    page += 1;
    getSearchNews().then((res) => {
      validatePageNext(getSearchNews, 100);
      renderPagination();
      renderNews(res, pageSize);
    });
  }
});
