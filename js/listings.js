import { get } from "./api/apiClient.js";
import { LISTINGS_ENDPOINT, BASE_URL, specificListing } from "./const/const.js";

async function getListings() {
  try {
    const data = await get(
      LISTINGS_ENDPOINT + "/?_active=true&_seller=true&_bids=true&limit=12"
    );
    const response = await get("/auction/profiles/Spellemann/listings");
    const userData = response.data;
    console.log(data);
    console.log(userData);
    specificListing.setAttribute(
      "href",
      "../listing/specific.html?id=e9909160-82ca-472b-88d7-bd56d111b5bf"
    );
  } catch (error) {
    console.error(error.message);
  }
}

getListings();
