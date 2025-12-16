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
  editButtonContainer,
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
  const sendToEdit = document.createElement("a");
  const profileInfo = document.createElement("div");
  const bannerImage = document.createElement("img");
  const profileImgContainer = document.createElement("div");
  const profileImg = document.createElement("img");
  const profileTextContainer = document.createElement("div");
  const userName = document.createElement("p");
  const userEmail = document.createElement("p");
  const userBio = document.createElement("p");
  userName.classList.add("p-2");
  userEmail.classList.add("p-2");
  userBio.classList.add("p-2", "overflow:hidden");
  const bannerImageContainer = document.createElement("div");
  bannerImage.src = profile.banner.url;
  bannerImage.alt = profile.banner.alt;

  bannerImage.classList.add(
    "h-55",
    "w-full",
    "object-cover",
    "object-[10%_20%]",
    "m-0"
  );
  bannerImageContainer.append(bannerImage);
  profileImg.src = profile.avatar.url;
  profileImg.alt = profile.avatar.alt;
  profileImg.classList.add(
    "w-20",
    "h-20",
    "md:w-30",
    "md:h-30",
    "rounded-full"
  );
  userName.textContent = profile.name;
  userEmail.textContent = profile.email;
  userBio.textContent = profile.bio;
  profileImgContainer.append(profileImg);
  profileTextContainer.append(userName, userEmail, userBio);
  profileTextContainer.classList.add(
    "flex",
    "flex-col",
    "text-xs",
    "md:text-sm"
  );

  const backgroundContainer = document.createElement("div");
  backgroundContainer.append(profileImgContainer, profileTextContainer);
  backgroundContainer.classList.add(
    "min-w-full",
    "pr-2",
    "bg-listBlue/75",
    "flex",
    "flex-row",
    "items-center",
    "h-fit",
    "rounded-r-lg",
    "rounded-l-full"
  );
  profileInfo.classList.add(
    "absolute",
    "inset-0",
    "flex",
    "flex-row",
    "pt-20",
    "pl-10",
    "pb-5",
    "text-white"
  );
  if (profileName === profile.name) {
    sendToEdit.setAttribute("href", "./editProfile.html");
    sendToEdit.textContent = "Edit profile";
    sendToEdit.classList =
      " bg-white text-listBlue p-2 mr-12 border border-listBlue rounded-sm text-xs md:text-sm hover:bg-listBlue hover:text-white";
    editButtonContainer.append(sendToEdit);
  } else {
    sendToEdit.classList.add("hidden");
  }
  profileInfo.append(backgroundContainer);

  profileDataContainer.append(bannerImage, profileInfo);
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
      CHOSEN_URL = `${WON_LISTINGS_URL}?page=${page}&limit=12&_wins=true&_bids=true`;
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

      const statusContainer = document.createElement("div");
      const singleStatus = document.createElement("h2");
      const singleImage = document.createElement("img");
      singleImage.classList.add(
        "object-cover",
        "w-full",
        "h-32",
        "rounded-t-sm"
      );
      const singleTitle = document.createElement("h2");
      singleTitle.classList.add(
        "text-listText",
        "text-center",
        "font-xs",
        "font-lexend",
        "font-semibold"
      );
      const singleLatest = document.createElement("p");
      singleLatest.classList.add("text-listBreadtext", "text-center");
      singleLink.setAttribute("href", `./specific.html?id=${listing.id}`);
      let listingImage = listing.media;

      if (listingImage.length === 0) {
        let listingImageURL = "https://i.imghippo.com/files/Eht7003Y.png";
        singleImage.src = listingImageURL;
      } else {
        let listingImageURL = listingImage[0].url;
        singleImage.src = listingImageURL;
      }
      if (wins === true) {
        singleLatest.classList.add("hidden");
      }
      singleLatest.textContent = latestBid;
      singleTitle.textContent = `${listing.title.slice(0, 10)} ...`;
      singleLatest.textContent = `${listingStatus} bid: ${latestBid}C`;
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
      showMoreContainer.classList.add("hidden");
    } else {
      showMoreButton.textContent = "Show more";
      showMoreButton.disabled = false;
    }
  } catch (error) {
    console.error("Failed to load listings", error);
    showMoreButton.textContent = "Whoops! Please reload the page";
    showMoreButton.disabled = false;
    showMoreContainer.classList.add("hidden");
  } finally {
    showMoreButton.classList.remove("animate-pulse");
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
    location.href = `./profile.html?id=${listing.seller.name}`;
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
    location.href = `./profile.html?id=${listing.seller.name}`;
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
