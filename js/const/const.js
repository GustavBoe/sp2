//Functions

import { getFromLocalStorage } from "../storage/localstorage.js";
export const profileName = getFromLocalStorage("profileName");

export let todaysDate = new Date();

//Endpoints

export const BASE_URL = "https://v2.api.noroff.dev";

export const NOROFF_KEY = "206ef2e3-5877-41e3-849c-e10e344868ec";

export const REGISTER_ENDPOINT = "/auth/register";

export const LOGIN_ENDPOINT = "/auth/login";

export const LISTINGS_ENDPOINT = "/auction/listings";

export const USER_ENDPOINT = "/auction/profiles/" + profileName;

export const ALL_USER_LISTINGS_ENDPOINT = USER_ENDPOINT + "/listings";

export const ACTIVE_USER_LISTINGS_ENDPOINT =
  ALL_USER_LISTINGS_ENDPOINT + "?_active=true";

export const queryString = window.location.search;
export const urlParams = new URLSearchParams(queryString);
export const PARAMETER_ID = urlParams.get("id");
export const SPECIFIC_LISTING_URL =
  LISTINGS_ENDPOINT + "/" + PARAMETER_ID + "?_seller=true&_bids=true";

//Images

export const placeholderImage = "https://i.imghippo.com/files/sE6922GH.webp";

// Listings

export const specificListing = document.getElementById("listing");

// Components
export const allListingsToggle = document.getElementById("all-listings");
export const activeListingsToggle = document.getElementById("active-listings");
export const showMoreLoader = document.getElementById("show-more-loader");
export const showMoreButton = document.getElementById("show-more-button");
export const backToProfile = document.getElementById("back-to-profile");
export const editProfileButton = document.getElementById("edit-profile-button");
export const deleteButton = document.getElementById("delete-button");

// Containers
export const listingsContainer = document.getElementById("listings-container");
export const specificContainerLT = document.getElementById(
  "specific-container-left-top"
);
export const specificContainerRB = document.getElementById(
  "specific-container-right-bottom"
);
