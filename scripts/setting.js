"use strict";
inputPageSize.value = pageSize;
inputCategory.value = category;
btnSubmit.addEventListener(`click`, function (e) {
  if (inputPageSize.value) {
    pageSize = inputPageSize.value;
    category = inputCategory.value;
    saveToStorage(`category`, category);
    saveToStorage(`pageSize`, pageSize);
    renderUI();
  } else {
    alert(`Vui lòng nhập thông tin`);
  }
});
const renderUI = function () {
  const html = `<p class="mt-3">Thông tin của bạn đã được lưu</p>`;
  document
    .getElementById(`main`)
    .querySelector(`form`)
    .insertAdjacentHTML(`beforeend`, html);
};
