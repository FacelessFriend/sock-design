const HttpError = require("../utils/httpError");

const validateEmail = (email) => {
  if (!email) throw new HttpError(400, "Email обязателен для заполнения");
  
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    throw new HttpError(400, "Некорректный формат email. Пример: user@example.com");
  }
  return true;
};

const validatePassword = (password) => {
  if (!password) throw new HttpError(400, "Пароль обязателен для заполнения");
  
  const minLength = 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (password.length < minLength) {
    throw new HttpError(400, `Пароль должен содержать минимум ${minLength} символов`);
  }
  
  if (!hasLetter || !hasNumber) {
    throw new HttpError(400, "Пароль должен содержать хотя бы одну букву и одну цифру");
  }
  
  return true;
};

module.exports = {
  validateEmail,
  validatePassword,
};