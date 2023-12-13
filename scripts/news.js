"use strict";
console.log(`----------News Pages----------`);
const currentUser = userParse(JSON.parse(getFromStorage(`currentUser`, `{}`)));
//Tạo hàm call API
const getNews = async function () {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&category=${category}&page=${page}&apiKey=${apiKey}`;
  const res = await fetch(url);
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
//Kiểm tra đã đăng nhập chưa.
if (currentUser.userName) {
  getNews().then((res) => {
    renderNews(res);
    renderPagination(pageSize, res.totalResults);
    btnPrev.style.display = `none`;
  });
} else {
  alert(`Vui lòng Login để sử dụng tính năng này`);
  window.location.href = `../index.html`;
}
//Xử lý nút nhấn Previous
btnPrev.addEventListener(`click`, function (e) {
  e.preventDefault();
  page -= 1;
  getNews().then((res) => {
    validatePagePrev();
    renderPagination(pageSize, res.totalResults);
    renderNews(res, pageSize);
  });
});
//Xử lý nút nhấn Next
btnNext.addEventListener(`click`, function (e) {
  e.preventDefault();
  page += 1;
  getNews().then((res) => {
    validatePageNext(getNews, pageSize);
    renderPagination(pageSize, res.totalResults);
    renderNews(res, pageSize);
  });
});
