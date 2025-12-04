import { PARAMETER_ID, SPECIFIC_LISTING_URL } from "../js/const/const.js";
import { get } from "./api/apiClient.js";
import { getFromLocalStorage } from "./storage/localstorage.js";

async function getSpecific() {
  try {
    const response = await get(SPECIFIC_LISTING_URL);

    const listingData = response.data;

    const sellerName = listingData.seller.name;
    checkSeller(sellerName);
  } catch {}
}

async function checkSeller(seller) {
  if (seller === getFromLocalStorage("profileName")) {
    sendToEdit();
  }
}
function sendToEdit() {
  const main = document.getElementById("main");
  const editBtn = document.createElement("button");
  editBtn.addEventListener("click", () => {
    location.href = `./edit.html?id=${PARAMETER_ID}`;
  });
  editBtn.textContent = "Click here for edit";

  main.append(editBtn);
}
async function renderSpecific() {
  await getSpecific();
}
renderSpecific();
