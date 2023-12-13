"use strict";

const getFromStorage = function (key, defaultVal) {
  return localStorage.getItem(key) || defaultVal;
};

const saveToStorage = function (key, value) {
  localStorage.setItem(key, value);
};
