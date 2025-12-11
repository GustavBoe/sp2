import { get } from "./api/apiClient.js";

import {
  todaysDate,
  USER_ENDPOINT,
  ALL_USER_LISTINGS_ENDPOINT,
  ACTIVE_USER_LISTINGS_ENDPOINT,
  profileListingsContainer,
  allListingsToggle,
  activeListingsToggle,
  showMoreButton,
  showMoreLoader,
} from "./const/const.js";
let active = false;

let isFetching = false;
let currentPage = 1;

async function getAndRenderProfileData() {
  try {
    const response = await get(USER_ENDPOINT);
    const profile = response.data;
    console.log(profile);
  } catch (error) {
    alert(error, "Could not get user");
  }
}
async function getAndRenderProfileListings(page) {
  isFetching = true;

  let CHOSEN_URL = "";

  showMoreLoader.classList = "loading loading-spinner loading-md";
  showMoreButton.textContent = `Loading..`;
  showMoreButton.classList = "animate-pulse";
  showMoreButton.disabled = true;

  try {
    if (active === false) {
      CHOSEN_URL = `${ALL_USER_LISTINGS_ENDPOINT}&page=${page}&limit=12 `;
    } else if (active === true) {
      CHOSEN_URL = `${ACTIVE_USER_LISTINGS_ENDPOINT}&page=${page}&limit=12`;
    }

    const response = await get(CHOSEN_URL);
    const listings = response.data.reverse();

    const meta = response.meta;

    listings.forEach((listing) => {
      let listingStatus = "";
      let latestBid = 0;
      let bids = listing.bids;
      let sortedBids = [];

      //Checks
      if (bids === undefined) {
        latestBid = 0;
      } else {
        sortedBids = bids.reverse();
        if (sortedBids[0] === undefined) {
          latestBid = 0;
        } else {
          latestBid = sortedBids[0].amount;
        }
      }
      if (todaysDate.toISOString() < listing.endsAt) {
        listingStatus = "Active";
      } else {
        listingStatus = "Closed";
      }
      const singleLink = document.createElement("a");
      const singleContainer = document.createElement("div");
      const statusContainer = document.createElement("div");
      const singleStatus = document.createElement("h2");
      const singleImage = document.createElement("img");
      const singleTitle = document.createElement("h2");
      const singleLatest = document.createElement("p");
      singleLink.setAttribute(
        "href",
        `../listing/specific.html?id=${listing.id}`
      );
      let listingImage = listing.media;

      if (listingImage.length === 0) {
        let listingImageURL = "https://i.imghippo.com/files/Eht7003Y.png";
        singleImage.src = listingImageURL;
      } else {
        let listingImageURL = listingImage[0].url;
        singleImage.src = listingImageURL;
      }

      singleTitle.textContent = listing.title;
      singleStatus.textContent = listingStatus;
      singleLatest.textContent = latestBid;
      statusContainer.append(singleStatus);
      singleContainer.append(
        statusContainer,
        singleImage,
        singleTitle,
        singleLatest
      );
      singleLink.append(singleContainer);
      profileListingsContainer.append(singleLink);
    });
    if (meta.isLastPage) {
      showMoreButton.style.display = "none";
    } else {
      showMoreButton.textContent = "Show more";
      showMoreButton.disabled = false;
    }
  } catch (error) {
    console.error("Failed to load listings", error);
    showMoreButton.textContent = "Whoops! Please reload the page";
    showMoreButton.disabled = false;
  } finally {
    showMoreButton.classList = "";
    showMoreLoader.classList = "";
    isFetching = false;
  }
}
allListingsToggle.addEventListener("click", () => {
  active = false;
  profileListingsContainer.textContent = "";
  console.log("All endpoint");
  getAndRenderProfileListings(currentPage);
});
activeListingsToggle.addEventListener("click", () => {
  active = true;
  profileListingsContainer.textContent = "";
  console.log("Active endpoint");
  getAndRenderProfileListings(currentPage);
});
showMoreButton.addEventListener("click", () => {
  if (!isFetching) {
    currentPage++;
    getAndRenderProfileListings(currentPage);
  }
});
async function renderProfile() {
  await getAndRenderProfileData();
  await getAndRenderProfileListings(currentPage);
}
renderProfile();
