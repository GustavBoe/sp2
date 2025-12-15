import { get, put } from "./api/apiClient.js";

import {
  backToProfile,
  profileName,
  PARAMETER_ID,
  USER_ENDPOINT,
  profileForm,
} from "./const/const.js";
import { displayHeader } from "./components/header.js";

import { displayFooter } from "./components/footer.js";
displayHeader();
displayFooter();
const profileForm = document.getElementById("profile-form");

backToProfile.addEventListener("click", () => {
  location.href = `./profile.html?id=${profileName}`;
});
async function fillProfileFields() {
  const profileResponse = await get(USER_ENDPOINT);
  const profileData = profileResponse.data;
  profileForm.avatarURL.value = profileData.avatar.url;
  profileForm.bannerURL.value = profileData.banner.url;
  profileForm.bio.value = profileData.bio;
}
fillProfileFields();
profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  profileForm.classList = "animate-pulse";

  const formData = new FormData(profileForm);
  const formFields = Object.fromEntries(formData);
  formFields.avatar = { url: formFields.avatarURL, alt: "" };
  formFields.banner = {
    url: formFields.bannerURL,
    alt: "",
  };

  try {
    const response = await put(USER_ENDPOINT, formFields);
    alert("Edited profile! Redirecting..");
    profileForm.classList = "";
    location.href = `./profile.html?id=${PARAMETER_ID}`;
  } catch (error) {
    profileForm.classList.remove("animate-pulse");
    console.error("Failed to edit profile:", error);
    alert(`Error: ${error.message}`);
    alert("Redirecting to profile page");
    location.href = `./profile.html?id=${PARAMETER_ID}`;
  } finally {
    profileForm.classList.remove("animate-pulse");
  }
});
