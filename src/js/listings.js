import { get } from "./api/apiClient.js";
import {
  todaysDate,
  listingsContainer,
  allListingsToggle,
  activeListingsToggle,
  showMoreButton,
  showMoreLoader,
  LISTINGS_ENDPOINT,
} from "./const/const.js";
import { displayIndexHeader } from "./components/indexHeader.js";
import { displayFooter } from "./components/footer.js";
displayIndexHeader();
displayFooter();
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
  showMoreButton.classList.add("animate-pulse");
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
      let listingStatus = "";
      if (todaysDate.toISOString() < listing.endsAt) {
        listingStatus = "Active";
      } else {
        listingStatus = "Closed";
      }

      let latestBid = undefined;

      if (listing.bids.length === 0) {
        latestBid = 0;
      } else {
        let bids = listing.bids.sort((a, b) => a.amount - b.amount).reverse();
        latestBid = bids[0].amount;
      }

      const singleLink = document.createElement("a");
      singleLink.classList.add(
        "w-36",
        "h-48",
        "border-1",
        "border-listBlueShadow",
        "rounded-sm",
        "mb-5",
        "active:border-listBlue",
        "hover:border-listBlue",
        "active:border-3",
        "hover:border-3"
      );
      const singleContainer = document.createElement("div");

      const singleImage = document.createElement("img");
      singleImage.classList.add(
        "object-cover",
        "w-full",
        "h-32",
        "rounded-t-sm"
      );
      const singleTitle = document.createElement("p");
      singleTitle.classList.add(
        "text-listText",
        "text-center",
        "font-xs",
        "font-lexend",
        "font-semibold"
      );
      const singleLatest = document.createElement("p");
      singleLatest.classList.add("text-listBreadtext", "text-center");
      singleLink.setAttribute(
        "href",
        `./src/html/specific.html?id=${listing.id}`
      );
      let listingImage = listing.media;

      if (listingImage.length === 0) {
        let listingImageURL = "https://i.imghippo.com/files/Eht7003Y.png";
        singleImage.src = listingImageURL;
      } else {
        let listingImageURL = listingImage[0].url;
        singleImage.src = listingImageURL;
      }

      singleTitle.textContent = `${listing.title.slice(0, 10)} ...`;
      singleLatest.textContent = `${listingStatus} bid: ${latestBid}C`;
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
    showMoreButton.classList.remove("animate-pulse");
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
