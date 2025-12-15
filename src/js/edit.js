import { del, get, put } from "./api/apiClient.js";

import {
  profileName,
  SPECIFIC_LISTING_URL,
  PARAMETER_ID,
  placeholderImage,
  deleteButton,
} from "./const/const.js";
import { displayHeader } from "./components/header.js";

import { displayFooter } from "./components/footer.js";
displayHeader();
displayFooter();
const editForm = document.getElementById("edit-form");
async function renderListing() {
  const listingResponse = await get(SPECIFIC_LISTING_URL);
  const listingData = listingResponse.data;
  editForm.title.value = listingData.title;
  editForm.description.value = listingData.description;
  editForm.url.value = listingData.media[0].url;
  editForm.alt.value = listingData.media[0].alt;
  editForm.tags.value = listingData.tags;
}
renderListing();
editForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  editForm.classList = "animate-pulse";

  const formData = new FormData(editForm);
  const formFields = Object.fromEntries(formData);

  let tags = [formFields.tags];

  formFields.tags = tags;
  const finalDate = formFields.date + "T" + formFields.time + ":00.000Z";
  formFields.endsAt = finalDate;

  formFields.url = placeholderImage;
  console.log(formFields.url);
  const media = [
    {
      url: formFields.url,
      alt: formFields.alt,
    },
  ];

  formFields.media = media;
  console.log(formFields);
  try {
    const response = await put(SPECIFIC_LISTING_URL, formFields);
    alert("Edited post! Redirecting to post");
    editForm.classList = "";
    location.href = `./specific.html?id=${PARAMETER_ID}`;
  } catch (error) {
    editForm.classList = "";
    console.error("Failed to edit listing:", error);
    alert(`Error: ${error.message}`);
    location.href = "/index.html";
  } finally {
    editForm.classList.remove("animate-pulse");
  }
});
async function deleteListing() {
  try {
    await del(SPECIFIC_LISTING_URL);
  } catch (error) {
    alert("Something went wrong! Redirecting to editing page");
    console.error(error);
    location.href = `./editPost.html?id=${PARAMETER_ID}`;
  }
}

deleteButton.addEventListener("click", () => {
  confirm("Do you want to delete your listing? This cannot be reversed");
  if (confirm) {
    try {
      deleteListing();
      location.href = `./profile.html?id=${profileName}`;
    } catch (error) {
      alert("Something went wrong, redirecting to home");
      location.href("../index.html");
    }
  }
});
