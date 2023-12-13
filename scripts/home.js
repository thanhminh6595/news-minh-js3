"use strict";
console.log(`--------------Home Pages--------------`);
const currentUser = JSON.parse(getFromStorage(`currentUser`, `[]`));
//4. Home Page
//Hàm hiển thị chưa đăng ký
const renderRegister = function () {
  const html = `<p>Please Login or Register</p>
          <div class="row" >
            <div class="col-md-3">
              <a href="./pages/login.html" class="btn btn-primary btn-block">Login</a>
            </div>
            <div class="col-md-3">
              <a href="./pages/register.html" class="btn btn-primary btn-block">Register</a>
            </div>
          </div>`;
  modalLogin.innerHTML = html;
};
//Hàm hiển thị đã đăng ký
const renderRegistered = function () {
  const html = `<p id="welcome-message">Welcome ${currentUser.firstName}</p>
          <button type="button" onclick = "logoutBtn()"  class="btn btn-primary" id="btn-logout">
            Logout
          </button>`;

  mainContent.innerHTML = html;
};
//Validate
if (currentUser.userName) {
  renderRegistered();
} else {
  renderRegister();
}
//5. Chức năng Logout
const logoutBtn = function () {
  confirm(`Bạn có thật sự muốn Log Out?`);
  window.location.href = `../pages/login.html`;
  localStorage.removeItem(`currentUser`);
  localStorage.removeItem(`currentTodoArr`);
};

/////////////////////////////////

// const minh = {
//   name: `Minh`,
//   birthYear: 1995,
//   calAge(year) {
//     return console.log(year - this.birthYear);
//   },
// };

// const binh = {
//   name: `Binh`,
//   birthYear: 1993,
// };

// const binhBind = minh.calAge.bind(binh, 2037);
// minh.calAge.call(binh, 2037);
// minh.calAge.apply(binh, [2039]);

// document.addEventListener(`click`, binhBind);
// function outerFunction() {
//   var outerVar = 10;
//   function innerFunction() {
//     console.log(outerVar);
//   }
//   return innerFunction;
// }
// outerFunction();
// document.addEventListener(`click`, outerFunction());
// // var closureExample = outerFunction();
// // closureExample(); // Output: 10

// const arr = [1, 2, 3, 4, 5];
// const arr2 = [1, 2, 3, 4, 5];
// console.log(arr.slice(0, -1), arr);
// // console.log(arr.splice(-1, 1), arr);

// const arrStr = `thanh minh`.split(` `);
// const arrJoin = arrStr.join(` `);
// console.log(arrStr, arrJoin);

// console.log(arr.concat(arr2));
// console.log([...arr, ...arr2]);

// const newArrMap = arr.map((val) => val + 1);
// const newArrFilter = arr.filter((val) => val > 3);
// const newArrReduce = arr.reduce((preVal, curVal, indexVal) => {
//   preVal += curVal;
//   // preVal = (0)->(1)->(3)->(6)->(10)
//   // preVal = (1)->(2)->(3)->(4)->(5)
//   return preVal;
// }, 0);
// console.log(newArrMap, newArrFilter);
// console.log(newArrReduce);

// // document.querySelector(`.btn-primary`).remove();

// document
//   .getElementById(`sidebar`)
//   .querySelector(`ul`)
//   .addEventListener(`mouseover`, function (e) {
//     // console.log(e.target.parentElement);
//     console.log(e.target.childNodes);
//   });

// const Person = function (firstName, lastName, birthYear) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calAge = function (year) {
//   return year - this.birthYear;
// };

// const jonas = new Person(`jonas`, `ok`, 1995);
// console.log(jonas);
// console.log(jonas.calAge(2000));

// console.log(jonas.__proto__);
// console.log(Person.prototype.__proto__);

// class Animal {
//   constructor(name) {
//     this.name = name;
//   }
//   speak() {
//     console.log(`${this.name} speak like is animals`);
//   }
// }
// class Dogs extends Animal {
//   constructor(name) {
//     super(name);
//   }
//   speak() {
//     console.log(`${this.name} speak 'Gok Gok'`);
//   }
// }

// const elephant = new Animal(`elephant`);
// const mikio = new Dogs(`mikio`);
// console.log(elephant, mikio);
// mikio.speak();
// elephant.speak();

// const request = new XMLHttpRequest();
// request.open(
//   `GET`,
//   `https://newsapi.org/v2/top-headlines?country=us&apiKey=0af00281aa6d4c70abaa49d5c733d8e0`
// );
// request.send();

// request.addEventListener(`load`, function () {
//   // console.log(this.responseText);
// });
// let x = 5;
// console.log(`1`);
// function wait(seconds) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, seconds * 1000);
//   });
// }
// wait(2)
//   .then(() => {
//     console.log(`toi da cho 2s`);
//     return wait(4);
//   })
//   .then(() => {
//     console.log(`toi da cho 4s`);
//     return wait(1);
//   })
//   .then(() => {
//     console.log(`toi da cho 1s`);
//   });

// const urlres = fetch(
//   `https://newsapi.org/v2/top-headlines?country=us&apiKey=0af00281aa6d4c70abaa49d5c733d8e0`
// );
// urlres
//   .then((res) => {
//     console.log(res);
//     return res.json();
//   })
//   .then((data) => console.log(data));
const arr = [
  {
    name: `minh`,
    birthYear: 1995,
    friends: [`tai`, `hung`, `man`, `thanh`],
  },
  {
    name: `binh`,
    birthYear: 1993,
    friends: [`tuan`, `hung`, `man`, `thanh`],
  },
  {
    name: `thanh`,
    birthYear: 1962,
    friends: [`tuan`, `tai`, `man`, `thanh`],
  },
  {
    name: `van`,
    birthYear: 1967,
    friends: [`tuan`, `tai`, `hung`, `thanh`],
  },
];

const filter2 = arr.filter(function (obj) {
  return !obj.friends.includes(`man`);
});
console.log(filter2);

const filter = arr.filter(function (obj) {
  return obj.friends.some((friend) => friend === `thanh`);
});
console.log(filter);
