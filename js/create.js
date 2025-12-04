import { post } from "./api/apiClient.js";

import { LISTINGS_ENDPOINT, placeholderImage } from "./const/const.js";

const createForm = document.getElementById("create-form");

createForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  createForm.classList = "animate-pulse";

  const formData = new FormData(createForm);
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
    const response = await post(LISTINGS_ENDPOINT, formFields);

    createForm.classList = "";
    location.href = "../index.html";
  } catch (error) {
    createForm.classList = "";
    console.error("Failed to create listing:", error);
    alert(`Error: ${error.message}`);
    location.href = "/index.html";
  } finally {
    createForm.classList = "";
  }
});
