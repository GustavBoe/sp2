import { post } from "./api/apiClient.js";
import { addToLocalStorage } from "../js/storage/localstorage.js";
import { NOROFF_KEY, LOGIN_ENDPOINT } from "./const/const.js";
import { displayHeader } from "./components/header.js";
import { displayFooter } from "./components/footer.js";
displayHeader();
displayFooter();
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginForm.classList = "animate-pulse";
  const formData = new FormData(loginForm);
  const formFields = Object.fromEntries(formData);

  try {
    const response = await post(LOGIN_ENDPOINT, formFields);

    const accessToken = response.data.accessToken;
    const profileName = response.data.name;

    addToLocalStorage("accessToken", accessToken);
    addToLocalStorage("profileName", profileName);
    addToLocalStorage("apiKey", NOROFF_KEY);
    loginForm.classList = "";
    location.href = "../../index.html";
  } catch (error) {
    loginForm.classList = "";
    console.error("Failed to log in user:", error);
    alert(`Error: ${error.message}`);
    location.href = "./login.html";
  }
});
