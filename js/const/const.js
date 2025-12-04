//Functions

import { getFromLocalStorage } from "../storage/localstorage.js";
export const profileName = getFromLocalStorage("profileName");
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
  LISTINGS_ENDPOINT + "/" + PARAMETER_ID + "?_seller=true";

//Images

export const placeholderImage = "https://i.imghippo.com/files/sE6922GH.webp";

// Listings
export const specificListing = document.getElementById("listing");

// Components

export const deleteButton = document.getElementById("delete-button");
