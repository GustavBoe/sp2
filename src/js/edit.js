import { del, get, put } from "./api/apiClient.js";

import {
  todaysDate,
  profileName,
  SPECIFIC_LISTING_URL,
  PARAMETER_ID,
  placeholderImage,
  specificContainerLT,
} from "./const/const.js";
import { displayHeader } from "./components/header.js";

import { displayFooter } from "./components/footer.js";

displayHeader();
displayFooter();
let active = false;
let listingStatus = "";
const editForm = document.getElementById("edit-form");
async function renderListing() {
  const listingResponse = await get(SPECIFIC_LISTING_URL);
  const listingData = listingResponse.data;
  renderPostForEdit(listingData);

  editForm.title.value = listingData.title;
  editForm.description.value = listingData.description;
  editForm.url.value = listingData.media[0].url;
  editForm.alt.value = listingData.media[0].alt;
  editForm.tags.value = listingData.tags;
}
function renderPostForEdit(listing) {
  const specificTitle = document.createElement("h1");
  specificTitle.classList.add(
    "text-center",
    "text-2xl",
    "text-listBlue",
    "font-semibold",
    "font-lexend",
    "mt-10",
    "mb-5"
  );
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("max-w-60", "mx-auto");
  const specificImg = document.createElement("img");
  specificImg.classList.add("rounded", "border-2", "border-listBlue");
  imageContainer.append(specificImg);

  const specificStatus = document.createElement("h3");
  specificStatus.classList.add(
    "text-center",
    "text-lg",
    "text-listBlue",
    "font-semibold",
    "font-lexend",
    "mt-2"
  );

  const endsAtContainer = document.createElement("div");
  endsAtContainer.classList.add(
    "w-90",
    "pb-1",
    "border-b-1",
    "border-listBreadtext",
    "text-center"
  );
  const specificEndsAt = document.createElement("p");
  specificEndsAt.classList.add(
    "text-xs",
    "text-listText",
    "font-semibold",
    "font-lexend",
    "mb-4"
  );

  const specificCreator = document.createElement("a");
  specificCreator.classList.add("font-commisioner", "text-sm");
  endsAtContainer.append(specificEndsAt, specificCreator);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add(
    "flex",
    "justify-center",
    "w-90",
    "pb-5",
    "border-b-1",
    "border-listBreadtext",
    "text-listText",
    "font-commisioner",
    "mt-5",
    "mb-4"
  );
  const specificDescription = document.createElement("article");
  specificDescription.classList.add("w-80", "text-left");
  descriptionContainer.append(specificDescription);

  const specificTags = document.createElement("div");
  specificTags.classList.add(
    "w-90",
    "flex",
    "flex-row",
    "flex-wrap",
    "justify-around",
    "pb-5",
    "border-b-1",
    "border-listBreadtext"
  );
  //Checks
  if (todaysDate.toISOString() < listing.endsAt) {
    active = true;
  } else {
    active = false;
  }
  if (active === true) {
    listingStatus = "Active";
  } else {
    listingStatus = "Closed";
  }

  if (listing.media[0] === undefined) {
    specificImg.src = "https://i.imghippo.com/files/Eht7003Y.png";
  } else {
    specificImg.src = `${listing.media[0].url}`;
  }
  if (active) {
    specificStatus.textContent = "Active";
    specificEndsAt.textContent = `Closes on ${listing.endsAt.slice(
      0,
      10
    )} at ${listing.endsAt.slice(11, 19)}`;
  } else {
    specificStatus.textContent = "Closed";
    specificEndsAt.textContent = `Closed on  ${listing.endsAt.slice(
      0,
      10
    )} at ${listing.endsAt.slice(11, 19)}`;
  }

  if (
    listing.description === null ||
    undefined ||
    listing.description.length === 0
  ) {
    specificDescription.textContent = "No description provided";
    specificDescription.classList.remove("text-left");
    specificDescription.classList.add("text-center");
  } else {
    specificDescription.textContent = listing.description;
  }
  if (listing.tags.length === 0) {
    listing.tags.forEach((tag) => {
      const tagElement = document.createElement("p");
      tagElement.classList.add(
        "pr-2",
        "pl-2",
        "border-2",
        "border-listBlue",
        "rounded-lg",
        "font-commisioner",
        "text-sm",
        "text-listBlue"
      );
      tagElement.textContent = tag;
      specificTags.append(tagElement);
    });
  } else {
    specificTags.textContent = "No tags to show";
  }
  const deleteButton = document.createElement("button");
  deleteButton.id = "delete-button";
  deleteButton.textContent = "Delete listing";
  deleteButton.classList.add(
    "mx-auto",
    "mt-5",
    "h-10",
    "pr-2",
    "pl-2",
    "rounded",
    "bg-listAlert",
    "text-white",
    "hover:cursor-pointer",
    "active:border",
    "active:bg-white",
    "active:text-listAlert"
  );
  deleteButton.addEventListener("click", () => {
    confirm("Do you want to delete your listing? This cannot be reversed");
    if (confirm) {
      try {
        deleteListing();
        location.href = `./profile.html?id=${profileName}`;
      } catch (error) {
        alert("Something went wrong, redirecting to home");
        location.href("../../index.html");
      }
    } else {
      location.reload();
    }
  });

  specificTitle.textContent = `${listing.title}`;
  specificCreator.textContent = `Published by ${listing.seller.name}`;

  specificContainerLT.append(
    specificTitle,
    imageContainer,
    specificStatus,
    endsAtContainer,
    descriptionContainer,
    specificTags,
    deleteButton
  );
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
