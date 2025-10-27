import { createNotification } from "../components/notification.js";

const form = document.querySelector("#form");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const matchInput = document.querySelector("#match-input");
const formBtn = document.querySelector("#form-btn");
const notification = document.querySelector("#notification");
console.log(axios);

console.log("hola")

const EMAIL_VALIDATION = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_VALIDATION =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const NAME_VALIDATION =
  /^[A-Z\u00d1][a-zA-Z-Ÿí\u00f1\u00d1]+(\s*[A-Z\u00d1][a-zA-Z-Ÿí\u00f1\u00d1]*)$/;

let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

const validation = (input, regexValidation) => {
  formBtn.disabled =
    nameValidation && emailValidation && passwordValidation && matchValidation
      ? false
      : true;

  if (input.value === "") {
    input.classList.remove("ring-red-700", "ring-2", "ring", "ring-green-700");
    input.classList.add("focus:ring-indigo-700", "focus:ring-2");
  } else if (regexValidation) {
    input.classList.remove(
      "focus:ring-red-700",
      "focus:ring-indigo-700",
      "ring-red-700"
    );
    input.classList.add("ring-green-700", "ring-2");
  } else if (!regexValidation) {
    input.classList.remove("focus:ring-indigo-700", "ring-green-700");
    input.classList.add("ring-red-700", "ring-2");
  }
};

nameInput.addEventListener("input", (e) => {
  nameValidation = NAME_VALIDATION.test(e.target.value);

  validation(nameInput, nameValidation);
});
emailInput.addEventListener("input", (e) => {
  emailValidation = EMAIL_VALIDATION.test(e.target.value);
  validation(emailInput, emailValidation);
});
passwordInput.addEventListener("input", (e) => {
  passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
  matchValidation = e.target.value === matchInput.value;
  validation(passwordInput, passwordValidation);
  validation(matchInput, matchValidation);
});

matchInput.addEventListener("input", (e) => {
  matchValidation = e.target.value === passwordInput.value;
  validation(matchInput, matchValidation);
});

form.addEventListener("submit", async (e) => {
e.preventDefault();
    try {
    const newUser = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };
    const {data} = await axios.post("/api/users", newUser);
     createNotification(false,data);
    setTimeout(() =>{
      notification.innerHTML = " "
    },3000)  
    } catch (error) {
      console.log( " chao", error)
    createNotification(true, error.response.data.error);
    setTimeout(() =>{
      notification.innerHTML = " "
    },3000)  
      
    createNotification(true, error.response.data.error);
    }
});