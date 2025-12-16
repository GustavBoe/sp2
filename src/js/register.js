import { post } from "./api/apiClient.js";
import { REGISTER_ENDPOINT } from "./const/const.js";
import { displayHeader } from "./components/header.js";
import { displayFooter } from "./components/footer.js";
displayHeader();
displayFooter();
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  registerForm.classList = "animate-pulse";
  const formData = new FormData(registerForm);
  const formFields = Object.fromEntries(formData);

  try {
    const response = await post(REGISTER_ENDPOINT, formFields);

    console.log("User created successfully!", response.data);
    registerForm.classList = "";
    location.href = "./login.html";
  } catch (error) {
    registerForm.classList = "";
    console.error("Failed to create user:", error);
    alert(`Error: ${error.message}`);
  }
});
