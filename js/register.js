import { post } from "./api/apiClient.js";
import { KEY_ENDPOINT, REGISTER_ENDPOINT } from "./const/const.js";
import { displayHeader } from "./components/header.js";
displayHeader();
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  registerForm.classList = "animate-pulse";
  const formData = new FormData(registerForm);
  const formFields = Object.fromEntries(formData);

  try {
    const response = await post(REGISTER_ENDPOINT, formFields);
    const noroffKey = await post(KEY_ENDPOINT);
    console.log(noroffKey);
    console.log("User created successfully!", response.data);
    registerForm.classList = "";
    location.href = "../login/index.html";
  } catch (error) {
    registerForm.classList = "";
    console.error("Failed to create user:", error);
    alert(`Error: ${error.message}`);
  }
});
