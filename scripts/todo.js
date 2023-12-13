"use strict";
// 8. Hiển thị Todo List
// a. Thêm mới Todo và Lưu dữ liệu vào LocalStorage
let todoArr = JSON.parse(getFromStorage(`todoArr`, `[]`));
let todoArrHasNotCurrentTodoArr = [];
const currentUser = userParse(JSON.parse(getFromStorage(`currentUser`, `{}`)));
let currentTodoArr = JSON.parse(getFromStorage(`currentTodoArr`, `[]`));

//Tạo 2 mảng currentTodoArr và todoArrHasNotCurrentTodoArr
currentTodoArr = [];
todoArrHasNotCurrentTodoArr = todoArr.filter((element) => {
  return element.owner !== currentUser.userName;
});
currentTodoArr = todoArr.filter((element) => {
  return element.owner === currentUser.userName;
});
//Tạo hàm xử lý sự kiện
const todoFn = function () {
  //Validate Add
  if (inputTask.value) {
    const data = new Task(inputTask.value, currentUser.userName);
    todoArr.push(data);
    currentTodoArr.push(data);
    saveToStorage(`todoArr`, JSON.stringify(todoArr));
    saveToStorage(`currentTodoArr`, JSON.stringify(currentTodoArr));
    //Chỉ hiển thị todolist của userName đang login
    if (currentUser.userName === data.owner) {
      renderTodoList(todoArr);
    }
    inputTask.value = ``;
  } else {
    alert(`Vui lòng nhập nhiệm vụ cần làm của bạn`);
  }
};
//bắt sự kiện Add
btnAdd.addEventListener(`click`, function (e) {
  e.preventDefault();
  //Kiểm tra đã đăng nhập chưa.
  if (currentUser.userName) {
    todoFn();
  } else {
    alert(`Vui lòng Login để sử dụng tính năng này`);
    window.location.href = `../index.html`;
  }
});
//Enter
inputTask.addEventListener(`keypress`, function (e) {
  if (e.key === `Enter`) {
    todoFn();
  }
});
// b. Hiển thị các Task
const renderTodoList = function (dataTask) {
  todoList.innerHTML = ``;
  for (let i = 0; i < dataTask.length; i++) {
    //Chỉ hiển thị todolist của userName đang login
    if (dataTask[i].owner === currentUser.userName) {
      const html = `<li class="${dataTask[i].isDone ? `checked` : ``}">
      ${dataTask[i].task}
      <span class="close">×</span>
      </li>`;
      todoList.insertAdjacentHTML(`beforeend`, html);
    }
  }
};
renderTodoList(todoArr);

// c. Toggle Task
todoList.addEventListener(`click`, function (e) {
  e.target.classList.toggle(`checked`);
  let children = todoList.childNodes;
  for (let i = 0; i < children.length; i++) {
    if (children[i] === e.target) {
      currentTodoArr[i].isDone = children[i].classList.contains(`checked`)
        ? true
        : false;
      localStorage.removeItem(`currentTodoArr`);
      localStorage.removeItem(`todoArr`);
      todoArr = [...todoArrHasNotCurrentTodoArr, ...currentTodoArr];
      saveToStorage(`todoArr`, JSON.stringify(todoArr));
      saveToStorage(`currentTodoArr`, JSON.stringify(currentTodoArr));
    }
  }
});
// d. Delete Task
todoList.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`close`)) {
    if (confirm(`Bạn có muốn xóa Task?`)) {
      let childrens = todoList.childNodes;
      for (let i = 0; i < childrens.length; i++) {
        if (childrens[i].children[0] === e.target) {
          currentTodoArr.splice(i, 1);
        }
      }
      renderTodoList(currentTodoArr);
      localStorage.removeItem(`currentTodoArr`);
      localStorage.removeItem(`todoArr`);
      todoArr = [...todoArrHasNotCurrentTodoArr, ...currentTodoArr];
      saveToStorage(`todoArr`, JSON.stringify(todoArr));
      saveToStorage(`currentTodoArr`, JSON.stringify(currentTodoArr));
    }
  }
});
