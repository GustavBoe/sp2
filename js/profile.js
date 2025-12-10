import { get } from "./api/apiClient.js";
import {
  profileName,
  PARAMETER_ID,
  editProfileButton,
  USER_ENDPOINT,
  ALL_USER_LISTINGS_ENDPOINT,
  listingsContainer,
} from "./const/const.js";

editProfileButton.addEventListener("click", () => {
  location.href = `./edit.html?id=${profileName}`;
});

async function getProfile() {
  try {
    const userResponse = await get(USER_ENDPOINT);

    const userData = userResponse.data;

    console.log(userData);
    console.log(USER_ENDPOINT);
    getProfileListings();
  } catch {}
}
async function getProfileListings() {
  try {
    const listingResponse = await get(ALL_USER_LISTINGS_ENDPOINT);
    const listingData = listingResponse.data;
    if (listingData.length === 0) {
      const emptyContainer = document.createElement("div");
      const emptyContainerHeading = document.createElement("h1");
      emptyContainer;
      emptyContainerHeading.textContent = "No listings to show!";
      listingsContainer.append(emptyContainer);
    }
    console.log(listingData);
  } catch {}
}
getProfile();
