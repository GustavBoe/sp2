import { get, put } from "./api/apiClient.js";

import {
  backToProfile,
  profileName,
  PARAMETER_ID,
  USER_ENDPOINT,
} from "./const/const.js";

const profileForm = document.getElementById("profile-form");

backToProfile.addEventListener("click", () => {
  location.href = `./index.html?id=${profileName}`;
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
    location.href = `./index.html?id=${PARAMETER_ID}`;
  } catch (error) {
    profileForm.classList = "";
    console.error("Failed to edit profile:", error);
    alert(`Error: ${error.message}`);
    location.href = "./index.html";
  } finally {
    profileForm.classList = "";
  }
});
