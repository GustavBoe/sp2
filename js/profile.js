import { get } from "./api/apiClient.js";

import {
  todaysDate,
  USER_ENDPOINT,
  ALL_USER_LISTINGS_ENDPOINT,
  ACTIVE_USER_LISTINGS_ENDPOINT,
  WON_LISTINGS_URL,
  wonListingsToggle,
  profileListingsContainer,
  allListingsToggle,
  activeListingsToggle,
  showMoreButton,
  showMoreLoader,
  showMoreContainer,
  profileDataContainer,
  profileLoaderContainer,
  profileName,
} from "./const/const.js";
import { displayHeader } from "./components/header.js";
import { displayFooter } from "./components/footer.js";
displayHeader();
displayFooter();
profileLoaderContainer.classList =
  "absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2";
const profileLoader = document.createElement("div");
profileLoader.classList =
  "border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64";
profileLoaderContainer.append(profileLoader);

let active = false;
let wins = false;
let isFetching = false;
let currentPage = 1;
function renderErrorPage() {}
function showPageLoader() {
  profileLoaderContainer.style.display = "block";
}
function hidePageLoader() {
  profileLoaderContainer.style.display = "none";
}
async function getProfileData(url) {
  try {
    const response = await get(url);
    const profileData = response.data;
    return profileData;
  } catch (error) {
    alert(error, "Could not get user");
  }
}
async function renderProfileData(profile) {
  if (profileName === profile.name) {
    //section append ( email and Edit profile button )
  }
  const profileBanner = document.createElement("img");
  const profileInfo = document.createElement("div");
  const profileImgContainer = document.createElement("div");
  const profileImg = document.createElement("img");
  const profileTextContainer = document.createElement("div");
  const userName = document.createElement("p");
  const userEmail = document.createElement("p");
  const userBio = document.createElement("p");
  profileBanner.src = profile.banner.url;
  profileImg.src = profile.avatar.url;
  profileImg.alt = profile.avatar.alt;

  userName.textContent = profile.name;
  userEmail.textContent = profile.email;
  userBio.textContent = profile.bio;
  profileImgContainer.append(profileImg);
  profileTextContainer.append(userName, userEmail, userBio);
  profileInfo.append(profileImgContainer, profileTextContainer);
  profileDataContainer.append(profileBanner, profileInfo);
}
async function getAndRenderProfileListings(page) {
  isFetching = true;

  let CHOSEN_URL = "";

  if (currentPage !== 1) {
    showMoreLoader.classList = "loading loading-spinner loading-md";
    showMoreButton.textContent = `Loading..`;
    showMoreButton.classList = "animate-pulse";
    showMoreButton.disabled = true;
  }

  try {
    if (active === false) {
      CHOSEN_URL = `${ALL_USER_LISTINGS_ENDPOINT}&page=${page}&limit=12&_wins=true `;
    }
    if (active === true) {
      CHOSEN_URL = `${ACTIVE_USER_LISTINGS_ENDPOINT}&page=${page}&limit=12&_wins=true`;
    }

    if (wins === true) {
      CHOSEN_URL = `${WON_LISTINGS_URL}&limit=12`;
    }

    const response = await get(CHOSEN_URL);
    let listings = undefined;

    if (wins === true) {
      listings = response.data.wins;
    } else {
      listings = response.data;
    }

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
        sortedBids = listing.bids.sort((a, b) => a.amount - b.amount).reverse();
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
  wins = false;
  profileListingsContainer.textContent = "";
  try {
    getAndRenderProfileListings(currentPage);
  } catch (error) {
    alert(error, "Could not get all listings, refreshing the page..");
    location.href = "/index.html";
  }
});
activeListingsToggle.addEventListener("click", () => {
  active = true;
  wins = false;
  profileListingsContainer.textContent = "";

  try {
    getAndRenderProfileListings(currentPage);
  } catch (error) {
    alert(error, "Could not get active listings, refreshing the page..");
  }
});
wonListingsToggle.addEventListener("click", () => {
  wins = true;
  profileListingsContainer.textContent = "";
  try {
    getAndRenderProfileListings(currentPage);
  } catch (error) {
    alert(error, "Could not get active listings, refreshing the page..");
  }
});
showMoreButton.addEventListener("click", () => {
  if (!isFetching) {
    currentPage++;
    getAndRenderProfileListings(currentPage);
  }
});
async function renderProfile() {
  showPageLoader();
  try {
    const user = await getProfileData(WON_LISTINGS_URL);
    await renderProfileData(user);
    await getAndRenderProfileListings(currentPage);
  } catch (error) {
    alert(error, "Could not get user");
    confirm("Go back to listing?");
    if (confirm) {
      history.back();
    } else {
      renderErrorPage();
    }
  } finally {
    hidePageLoader();
  }
}
renderProfile();
