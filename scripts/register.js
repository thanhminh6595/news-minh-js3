"use strict";

//2. Chức năng Register

const userArr = JSON.parse(getFromStorage(`userArr`, `[]`));
let checkUsername = userArr.map((username) => username.formUserName);
const userLogin = JSON.parse(getFromStorage(`userLogin`, `[]`));

console.log(`--------------Register Pages--------------`);

const parseUser = function (dataUser) {
  return new UserCl(
    dataUser.formFirstName,
    dataUser.formLastName,
    dataUser.formUserName,
    dataUser.formPassword
  );
};

const initForm = function () {
  inputFirstName.value = "";
  inputLastName.value = "";
  inputUserName.value = "";
  inputPassword.value = "";
  inputPasswordConfirm.value = "";
};

btnSubmit.addEventListener(`click`, function (e) {
  e.preventDefault();
  const data = {
    formFirstName: inputFirstName.value,
    formLastName: inputLastName.value,
    formUserName: inputUserName.value,
    formPassword: inputPassword.value,
    formPasswordConfirm: inputPasswordConfirm.value,
  };

  //Không có trường nào bị bỏ trống
  if (
    !data.formFirstName ||
    !data.formLastName ||
    !data.formUserName ||
    !data.formPassword ||
    !data.formPasswordConfirm
  ) {
    alert(`Không có trường nào bị bỏ trống`);
  }
  //Username không được trùng với Username của các người dùng trước đó.
  else if (checkUsername.includes(data.formUserName)) {
    alert(`Username đã bị trùng`);
  } else if (data.formPassword.length < 8) {
    alert(`Password phải có nhiều hơn 8 ký tự`);
  } else if (data.formPassword !== data.formPasswordConfirm) {
    alert(`Password và Confirm Password phải giống nhau`);
  } else {
    userArr.push(data);
    checkUsername = userArr.map((username) => username.formUserName);
    saveToStorage(`userArr`, JSON.stringify(userArr));
    saveToStorage(`checkUsername`, JSON.stringify(checkUsername));
    window.location.href = `../pages/login.html`;
    userLogin.push(parseUser(userArr[userArr.length - 1]));
    saveToStorage(`userLogin`, JSON.stringify(userLogin));
    // initForm();
  }
});
