//Functions

import { getFromLocalStorage } from "../storage/localstorage.js";

export const profileName = getFromLocalStorage("profileName");

export let todaysDate = new Date();

export let isLoggedIn = false;

if (getFromLocalStorage("accessToken")) {
  isLoggedIn = true;
}

//Endpoints

export const BASE_URL = "https://v2.api.noroff.dev";

export const NOROFF_KEY = "206ef2e3-5877-41e3-849c-e10e344868ec";

export const REGISTER_ENDPOINT = "/auth/register";

export const LOGIN_ENDPOINT = "/auth/login";

export const LISTINGS_ENDPOINT = "/auction/listings";

export const queryString = window.location.search;

export const urlParams = new URLSearchParams(queryString);

export const PARAMETER_ID = urlParams.get("id");

export const SPECIFIC_LISTING_URL = `${LISTINGS_ENDPOINT}/${PARAMETER_ID}?_seller=true&_bids=true`;

export const BIDDING_URL = `${LISTINGS_ENDPOINT}/${PARAMETER_ID}/bids`;

export const OWNER_URL = `/auction/profiles/${profileName}`;

export const USER_ENDPOINT = `/auction/profiles/${PARAMETER_ID}`;

export let ALL_USER_LISTINGS_ENDPOINT = `${USER_ENDPOINT}/listings?_seller=true&_bids=true`;

export let ACTIVE_USER_LISTINGS_ENDPOINT = `${ALL_USER_LISTINGS_ENDPOINT}&_active=true`;

export let WON_LISTINGS_URL = `${USER_ENDPOINT}?_wins=true`;

//Images

export const placeholderImage = "https://i.imghippo.com/files/Eht7003Y.png";

// Listings

export const specificListing = document.getElementById("listing");

// Components
export const errorMessage = document.createElement("p");

export const header = document.getElementById("header");
export const footer = document.getElementById("footer");
export const showMoreLoader = document.getElementById("show-more-loader");

export const allListingsToggle = document.getElementById("all-listings");

export const activeListingsToggle = document.getElementById("active-listings");

export const wonListingsToggle = document.getElementById("wins");

export const showMoreContainer = document.getElementById("show-more-container");

export const showMoreButton = document.getElementById("show-more-button");

export const backToProfile = document.getElementById("back-to-profile");
export const profileForm = document.getElementById("profile-form");

export const deleteButton = document.getElementById("delete-button");
export const profileDataContainer = document.getElementById(
  "profile-data-container"
);

export const profileLoaderContainer = document.getElementById(
  "profile-loader-container"
);

// Containers
export const listingsContainer = document.getElementById("listings-container");

export const specificContainerLT = document.getElementById(
  "specific-container-left-top"
);

export const specificContainerRB = document.getElementById(
  "specific-container-right-bottom"
);
export const profileListingsContainer = document.getElementById(
  "profile-listings-container"
);
