import {
  todaysDate,
  PARAMETER_ID,
  SPECIFIC_LISTING_URL,
  specificContainerLT,
  specificContainerRB,
} from "../js/const/const.js";
import { get } from "./api/apiClient.js";
import { getFromLocalStorage } from "./storage/localstorage.js";
let listingStatus = "";

async function getSpecific() {
  try {
    const response = await get(SPECIFIC_LISTING_URL);

    const listingData = response.data;

    const sellerName = listingData.seller.name;
    checkSeller(sellerName);
    return listingData;
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
  const listing = await getSpecific();
  renderSpecificLeftTop(listing);
  renderSpecificRightBottom(listing);
}
async function renderSpecificLeftTop(listing) {
  const specificTitle = document.createElement("h1");

  const specificImg = document.createElement("img");

  const specificStatus = document.createElement("h3");

  const specificEndsAt = document.createElement("p");

  const specificDescription = document.createElement("article");

  const specificTags = document.createElement("div");
  //Checks

  if (listing.media.url) {
    specificImg.src = `${listing.media.url}`;
  } else {
    specificImg.src = "https://i.imghippo.com/files/Eht7003Y.png";
  }
  if (todaysDate.toISOString() < listing.endsAt) {
    listingStatus = "Active";
    specificEndsAt.textContent = `Closes on ${listing.endsAt}`;
  } else {
    listingStatus = "Closed";
    specificEndsAt.textContent = `Closed on ${listing.endsAt}`;
  }
  if (listing.description === null || undefined) {
    specificDescription.textContent = "No description provided";
  } else {
    specificDescription.textContent = listing.description;
  }
  if (listing.tags) {
    listing.tags.forEach((tag) => {
      const tagElement = document.createElement("p");
      tagElement.textContent = tag;
      specificTags.append(tagElement);
    });
  } else {
    specificTags.textContent = "No tags to show";
  }

  specificTitle.textContent = `${listing.title}`;
  specificStatus.textContent = listingStatus;
  console.log(listingStatus);

  specificContainerLT.append(
    specificTitle,
    specificImg,
    specificStatus,
    specificEndsAt,
    specificDescription,
    specificTags
  );
}
async function renderSpecificRightBottom(listing) {
  // Checks
  let latestBid = null;
  if (listing.bids[0] === 0) {
    latestBid = 0;
  } else {
    latestBid = listing.bids[0].amount;
  }

  if (listingStatus === "Active") {
    const activeBid = document.createElement("h2");

    const addBidForm = document.createElement("form");

    const addBidContainer = document.createElement("div");
    const addBidLabel = document.createElement("label");
    addBidLabel.textContent = "Add a bid";
    const addBidField = document.createElement("input");
    addBidField.type = "number";
    addBidField.required = true;

    const addBidButton = document.createElement("button");
    addBidContainer.append(addBidLabel, addBidField, addBidButton);
    addBidForm.append(addBidContainer);
    const biddingHeading = document.createElement("h2");

    const biddingHistoryContainer = document.createElement("div");
    biddingHistoryContainer.classList = "relative";

    if (listing.bids.length > 0) {
      listing.bids.forEach((bid) => {
        const biddingLeftLine = document.createElement("div");
        biddingLeftLine.classList =
          "border-r-4 border-black absolute h-full top-0";
        biddingLeftLine.style.left = "9px";
        const biddingHistory = document.createElement("ul");
        biddingHistory.classList = "list-none m-0 p-0";

        const bidderContainerLi = document.createElement("li");
        bidderContainerLi.classList = "mb-5";

        const bidderContainer = document.createElement("div");
        bidderContainer.classList = "flex group items-center ";

        const timelineCircle = document.createElement("div");
        timelineCircle.classList =
          "bg-gray-800 z-10 rounded-full border-4 border-black  h-5 w-5;";

        const timelineLine = document.createElement("div");
        timelineLine.classList = "bg-black h-1 w-6 items-center  ml-4 mt-1";

        const bidContentContainer = document.createElement("div");
        bidContentContainer.classList = "flex-1 ml-4 z-10 font-medium";
        const bidContainer = document.createElement("div");
        bidContainer.classList =
          "order-1 space-y-2 bg-gray-800 rounded-lg shadow-only transition-ease lg:w-5/12 px-6 py-4";

        const bidderAmount = document.createElement("h3");
        bidderAmount.classList = "mb-3 font-bold text-white text-2xl";

        const bidderBreak = document.createElement("hr");

        const bidderTimeStamp = document.createElement("p");
        timelineCircle.append(timelineLine);
        bidContainer.append(bidderAmount, bidderBreak, bidderTimeStamp);
        bidContentContainer.append(bidContainer);
        bidderContainer.append(timelineCircle, bidContentContainer);
        bidderContainerLi.append(bidderContainer);
        biddingHistoryContainer.append(biddingHistory);
      });
    } else {
    }
    activeBid.textContent = `Active bid:${latestBid} C`;

    specificContainerRB.append(activeBid, addBidForm, biddingHistoryContainer);
  } else {
    const closingBid = document.createElement("h2");
    closingBid.textContent = `Closing bid:${latestBid} C`;
    specificContainerRB.append(closingBid);
  }
  //specificContainerRB.append(activeBid, addBidForm, biddingHistoryContainer);
  const lastEdit = document.createElement("h4");
  if (listing.updated === null || undefined) {
    lastEdit.textContent = `Created on ${listing.created}`;
  } else {
    lastEdit.textContent = `Last edited on ${listing.updated}`;
  }
}

renderSpecific();
