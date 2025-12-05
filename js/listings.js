import { get } from "./api/apiClient.js";
import {
  LISTINGS_ENDPOINT,
  listingsContainer,
  showMoreButton,
  showMoreLoader,
} from "./const/const.js";

let currentPage = 1;
let isFetching = false;

async function getAndRenderListings(page) {
  isFetching = true;
  showMoreLoader.classList = "loading loading-spinner loading-md";
  showMoreButton.textContent = `Loading..`;
  showMoreButton.classList = "animate-pulse";
  showMoreButton.disabled = true;

  try {
    const response = await get(
      LISTINGS_ENDPOINT + `?_seller=true&_bids=true&page=${page}&limit=12`
    );
    const listings = response.data;

    const meta = response.meta;

    listings.forEach((listing) => {
      let latestBid = null;
      if (listing.bids.length === 0) {
        latestBid = 0;
      } else {
        latestBid = listing.bids[0].amount;
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
      if (listing.media.url) {
        singleImage.src = `${listing.media.url}`;
      } else {
        singleImage.src = "https://i.imghippo.com/files/Eht7003Y.png";
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
    isFetching = false;
  }
}

showMoreButton.addEventListener("click", () => {
  if (!isFetching) {
    currentPage++;
    getAndRenderListings(currentPage);
  }
});
getAndRenderListings(currentPage);
