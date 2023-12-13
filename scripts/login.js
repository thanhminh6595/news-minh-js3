"use strict";
console.log(`-----------Login pages-------------`);
//3. Chức năng Login
const checkUsername = JSON.parse(getFromStorage(`checkUsername`, `[]`));
const userLogin = JSON.parse(getFromStorage(`userLogin`, `[]`));
let currentUser;
let checkPassword = userLogin.map((password) => password._password);
let indexUser;

const loginFn = function () {
  const data = {
    formUserName: inputUserName.value,
    formPassword: inputPassword.value,
  };
  //Validate
  if (!data.formUserName || !data.formPassword) {
    alert(`Không có trường nào bị bỏ trống`);
  } else if (checkUsername.includes(data.formUserName)) {
    indexUser = checkUsername.indexOf(data.formUserName);
    if (!(checkPassword[indexUser] === data.formPassword)) {
      alert(`Username hoặc Password không chính xác`);
    } else {
      currentUser = userLogin[indexUser];
      saveToStorage(`currentUser`, JSON.stringify(currentUser));
      //Chuyển trang
      window.location.href = `../index.html`;
    }
  } else {
    alert(`Username hoặc Password không chính xác`);
  }
};

//Bắt sự kiện submit Login
btnSubmit.addEventListener(`click`, function (e) {
  e.preventDefault();
  loginFn();
});
//Enter
inputUserName.addEventListener(`keypress`, function (e) {
  if (e.key === `Enter`) {
    loginFn();
  }
});
inputPassword.addEventListener(`keypress`, function (e) {
  if (e.key === `Enter`) {
    loginFn();
  }
});
