import { get } from "./api/apiClient.js";
import {
  listingsContainer,
  allListingsToggle,
  activeListingsToggle,
  showMoreButton,
  showMoreLoader,
  LISTINGS_ENDPOINT,
} from "./const/const.js";
let active = false;

let isFetching = false;
let currentPage = 1;

export async function getAndRenderListings(page, endpoint) {
  let ALL_LISTINGS_ENDPOINT =
    endpoint + `?_seller=true&_bids=true&page=${page}&limit=12`;
  let ACTIVE_LISTINGS_ENDPOINT =
    endpoint + `?_seller=true&_bids=true&page=${page}&limit=12&_active=true`;

  isFetching = true;

  let CHOSEN_URL = "";

  showMoreLoader.classList = "loading loading-spinner loading-md";
  showMoreButton.textContent = `Loading..`;
  showMoreButton.classList = "animate-pulse";
  showMoreButton.disabled = true;

  try {
    if (active === false) {
      CHOSEN_URL = ALL_LISTINGS_ENDPOINT;
    } else if (active === true) {
      CHOSEN_URL = ACTIVE_LISTINGS_ENDPOINT;
    }

    const response = await get(CHOSEN_URL);
    const listings = response.data.reverse();

    const meta = response.meta;

    listings.forEach((listing) => {
      let latestBid = undefined;
      if (listing.bids.length === 0) {
        latestBid = 0;
      } else {
        let sortedBids = listing.bids.reverse();
        latestBid = sortedBids[0].amount;
      }
      const singleLink = document.createElement("a");
      const singleContainer = document.createElement("div");
      const singleImage = document.createElement("img");
      const singleTitle = document.createElement("h2");
      const singleLatest = document.createElement("p");
      singleLink.setAttribute(
        "href",
        `./listing/specific.html?id=${listing.id}`
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
      singleLatest.textContent = latestBid;
      singleContainer.append(singleImage, singleTitle, singleLatest);
      singleLink.append(singleContainer);
      listingsContainer.append(singleLink);
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
  allListingsToggle.addEventListener("click", () => {
    active = false;
    listingsContainer.textContent = "";
    getAndRenderListings(currentPage, endpoint);
  });
  activeListingsToggle.addEventListener("click", () => {
    active = true;
    listingsContainer.textContent = "";
    getAndRenderListings(currentPage, endpoint);
  });
  showMoreButton.addEventListener("click", () => {
    if (!isFetching) {
      currentPage++;
      getAndRenderListings(currentPage, endpoint);
    }
  });
}

getAndRenderListings(currentPage, LISTINGS_ENDPOINT);
