import {
  todaysDate,
  profileName,
  PARAMETER_ID,
  SPECIFIC_LISTING_URL,
  isLoggedIn,
  BIDDING_URL,
  specificContainerLT,
  specificContainerRB,
} from "../js/const/const.js";
import { get, post } from "./api/apiClient.js";

import { displayHeader } from "./components/header.js";
import { displayFooter } from "./components/footer.js";
displayHeader();
displayFooter();
let active = false;
let listingStatus = "";

async function getSpecific() {
  try {
    const response = await get(SPECIFIC_LISTING_URL);

    const listingData = response.data;

    return listingData;
  } catch {}
}

async function renderSpecific() {
  const listing = await getSpecific();
  if (todaysDate.toISOString() < listing.endsAt) {
    active = true;
  } else {
    active = false;
  }
  if (active === true) {
    listingStatus = "Active";
  } else {
    listingStatus = "Closed";
  }

  renderSpecificLeftTop(listing);

  SpecificRightBottom(listing);
}
async function renderSpecificLeftTop(listing) {
  const specificTitle = document.createElement("h1");
  specificTitle.classList.add(
    "text-center",
    "text-2xl",
    "text-listBlue",
    "font-semibold",
    "font-lexend",
    "mt-10",
    "mb-5"
  );
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("max-w-60", "mx-auto");
  const specificImg = document.createElement("img");
  specificImg.classList.add("rounded", "border-2", "border-listBlue");
  imageContainer.append(specificImg);

  const specificStatus = document.createElement("h3");
  specificStatus.classList.add(
    "text-center",
    "text-lg",
    "text-listBlue",
    "font-semibold",
    "font-lexend",
    "mt-2"
  );

  const endsAtContainer = document.createElement("div");
  endsAtContainer.classList.add(
    "w-90",
    "pb-1",
    "border-b-1",
    "border-listBreadtext",
    "text-center"
  );
  const specificEndsAt = document.createElement("p");
  specificEndsAt.classList.add(
    "text-xs",
    "text-listText",
    "font-semibold",
    "font-lexend",
    "mb-4"
  );

  const specificCreator = document.createElement("a");
  specificCreator.classList.add("font-commisioner", "text-sm");
  endsAtContainer.append(specificEndsAt, specificCreator);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add(
    "flex",
    "justify-center",
    "w-90",
    "pb-5",
    "border-b-1",
    "border-listBreadtext",
    "text-listText",
    "font-commisioner",
    "mt-5",
    "mb-4"
  );
  const specificDescription = document.createElement("article");
  specificDescription.classList.add("w-80", "text-left");
  descriptionContainer.append(specificDescription);

  const specificTags = document.createElement("div");
  specificTags.classList.add(
    "w-90",
    "flex",
    "flex-row",
    "flex-wrap",
    "justify-around",
    "pb-5",
    "border-b-1",
    "border-listBreadtext"
  );
  //Checks

  if (listing.media[0] === undefined) {
    specificImg.src = "https://i.imghippo.com/files/Eht7003Y.png";
  } else {
    specificImg.src = `${listing.media[0].url}`;
  }
  if (active) {
    specificStatus.textContent = "Active";
    specificEndsAt.textContent = `Closes on ${listing.endsAt.slice(
      0,
      10
    )} at ${listing.endsAt.slice(11, 19)}`;
  } else {
    specificStatus.textContent = "Closed";
    specificEndsAt.textContent = `Closed on  ${listing.endsAt.slice(
      0,
      10
    )} at ${listing.endsAt.slice(11, 19)}`;
  }

  if (
    listing.description === null ||
    undefined ||
    listing.description.length === 0
  ) {
    specificDescription.textContent = "No description provided";
    specificDescription.classList.remove("text-left");
    specificDescription.classList.add("text-center");
  } else {
    specificDescription.textContent = listing.description;
  }
  if (listing.tags.length !== 0) {
    listing.tags.forEach((tag) => {
      const tagElement = document.createElement("p");
      tagElement.classList.add(
        "pr-2",
        "pl-2",
        "border-2",
        "border-listBlue",
        "rounded-lg",
        "font-commisioner",
        "text-sm",
        "text-listBlue"
      );
      tagElement.textContent = tag;
      specificTags.append(tagElement);
    });
  } else {
    specificTags.textContent = "No tags to show";
  }

  specificTitle.textContent = `${listing.title}`;
  specificCreator.textContent = `Published by ${listing.seller.name}`;
  if (isLoggedIn) {
    specificCreator.setAttribute(
      "href",
      `./profile.html?id=${listing.seller.name}`
    );
  }

  specificContainerLT.append(
    specificTitle,
    imageContainer,
    specificStatus,
    endsAtContainer,
    descriptionContainer,
    specificTags
  );
}
async function SpecificRightBottom(listing) {
  let bids = listing.bids.sort((a, b) => a.amount - b.amount).reverse();

  let latestBid = 0;
  if (bids.length > 0) {
    latestBid = bids[0].amount;
  }

  //Bidding section
  const biddingSection = document.createElement("div");
  const biddingStatus = document.createElement("h2");
  biddingStatus.classList.add(
    "text-md",
    "text-listText",
    "text-center",
    "font-lexend",
    "font-semibold"
  );
  const biddingContainer = document.createElement("div");
  const bidForm = document.createElement("form");
  const fieldContainer = document.createElement("div");
  fieldContainer.classList.add(
    "mt-5",
    "flex",
    "flex-row",
    "w-60",
    "justify-around"
  );
  const fieldAmountContainer = document.createElement("div");
  fieldAmountContainer.classList.add(
    "flex",
    "flex-row",
    "items-center",
    "border",
    "border-listBlue",
    "divide-x-1",
    "divide-listBlue",
    "rounded-sm"
  );
  const creditsC = document.createElement("p");
  creditsC.textContent = "C";
  creditsC.classList.add("h-10", "p-2", "text-listBlue");
  const bidInput = document.createElement("input");
  const bidButton = document.createElement("button");
  bidButton.classList.add(
    "h-10",
    "pr-2",
    "pl-2",
    "rounded",
    "bg-listBlue",
    "text-white",
    "hover:cursor-pointer",
    "active:border",
    "active:bg-white",
    "active:text-listBlue"
  );
  const logInLink = document.createElement("button");
  logInLink.addEventListener("click", () => {
    location.href = "./login.html";
  });
  logInLink.classList.add(
    "mx-auto",
    "mt-5",
    "h-10",
    "pr-2",
    "pl-2",
    "rounded",
    "bg-listBlue",
    "text-white",
    "hover:cursor-pointer",
    "active:border",
    "active:bg-white",
    "active:text-listBlue"
  );

  const editLink = document.createElement("button");
  editLink.addEventListener("click", () => {
    location.href = `./editPost.html?id=${PARAMETER_ID}`;
  });
  editLink.textContent = "Edit listing";
  editLink.classList.add(
    "mx-auto",
    "mt-5",
    "h-10",
    "pr-2",
    "pl-2",
    "rounded",
    "bg-listBlue",
    "text-white",
    "hover:cursor-pointer",
    "active:border",
    "active:bg-white",
    "active:text-listBlue"
  );

  bidInput.type = "number";
  bidInput.name = "amount";
  bidInput.id = "amount";
  bidInput.min = `${latestBid + 1}`;
  bidInput.minLength = 1;
  bidInput.maxLength = 5;
  bidInput.required = true;
  bidInput.placeholder = "Bid";
  bidInput.classList.add("w-20", "h-10", "pl-[12px]");
  fieldAmountContainer.append(bidInput, creditsC);

  bidButton.textContent = "Place bid";
  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    bidButton.textContent = "Placing bid..";
    const formData = new FormData(bidForm);

    const formFields = Object.fromEntries(formData);
    formFields.amount = parseInt(formFields.amount);
    try {
      const response = await post(BIDDING_URL, formFields);
      bidButton.textContent = "Place bid";

      location.href = `./specific.html?id=${listing.id}`;
    } catch (error) {
      console.error("Failed to create listing:", error);
      alert(`Error: ${error.message}`);
      location.href = `./specific.html?id=${listing.id}`;
    } finally {
      bidButton.textContent = "Place bid";
    }
  });

  if (active === true) {
    biddingStatus.textContent = `Active bid: ${latestBid} C`;
    logInLink.textContent = "Log in to place a bid";
  } else {
    biddingStatus.textContent = `Closing bid: ${latestBid} C`;
    logInLink.textContent = "Log in to find a listing";
  }

  if (isLoggedIn && active === true && listing.seller.name !== profileName) {
    fieldContainer.append(fieldAmountContainer, bidButton);
    bidForm.append(fieldContainer);
    biddingContainer.append(bidForm);
  }

  if (!isLoggedIn) {
    biddingContainer.append(logInLink);
  }
  if (listing.seller.name === profileName) {
    biddingContainer.append(editLink);
    biddingSection.classList.add("flex", "flex-col", "items-center");
  }

  biddingSection.append(biddingStatus, biddingContainer);

  //History section
  const biddingHistoryDisplay = document.createElement("div");
  biddingHistoryDisplay.classList.add(
    "py-10",
    "container",
    "mx-auto",
    "px-5",
    "flex",
    "flex-col",
    "items-center",
    "md:max-h-80",
    "md:overflow-auto"
  );
  const biddingHistoryHeading = document.createElement("h3");
  biddingHistoryHeading.classList.add(
    "mt-10",
    "text-center",
    "text-md",
    "text-listText",
    "font-lexend",
    "font-semibold"
  );
  const biddingHistoryContainer = document.createElement("div");
  biddingHistoryContainer.classList = "relative";
  const biddingLeftLine = document.createElement("div");
  biddingLeftLine.classList =
    "border-r-2 border-listBlueShadow absolute h-full top-0";
  biddingLeftLine.style.left = "9px";

  const biddingHistory = document.createElement("ul");
  biddingHistory.classList = "list-none m-0 p-0";

  if (latestBid === 0) {
    biddingHistoryHeading.textContent = "No bids to show!";
    biddingHistoryHeading.classList.add("mb-20");
    biddingHistoryDisplay.classList = "";
    biddingHistoryDisplay.append(biddingHistoryHeading);
  } else {
    biddingHistoryHeading.textContent = "Bidding history";
    bids.forEach((bid) => {
      //Borrowed from https://www.creative-tim.com/twcomponents/component/timeline-5

      const bidderContainerLi = document.createElement("li");
      bidderContainerLi.classList = "mb-5";

      const bidderContainer = document.createElement("div");
      bidderContainer.classList = "flex group items-center ";

      const timelineCircle = document.createElement("div");
      timelineCircle.classList =
        "bg-listBlue z-10 rounded-full border-4 border-listBlue h-5 w-5";

      const bidContentContainer = document.createElement("div");
      bidContentContainer.classList = "flex-1 ml-4 z-10 font-medium";

      const bidderAmount = document.createElement("h3");
      bidderAmount.classList = "mb-3 font-bold text-listText text-lg";

      const bidderBreak = document.createElement("hr");
      bidderBreak.classList.add("text-listBreadtext");

      const bidderTimeStamp = document.createElement("p");
      bidderTimeStamp.classList = "pb-4 text-sm text-listBreadtext";
      bidderAmount.textContent = `${bid.bidder.name} bid ${bid.amount} credits`;
      bidderTimeStamp.textContent = `On ${bid.created.slice(
        0,
        10
      )} at ${bid.created.slice(11, 19)}`;

      bidContentContainer.append(bidderAmount, bidderBreak, bidderTimeStamp);

      bidderContainer.append(timelineCircle, bidContentContainer);

      bidderContainerLi.append(bidderContainer);

      biddingHistory.append(bidderContainerLi);

      biddingHistoryContainer.append(biddingLeftLine, biddingHistory);

      biddingHistoryDisplay.append(biddingHistoryContainer);
    });
  }
  specificContainerRB.append(
    biddingSection,
    biddingHistoryHeading,
    biddingHistoryDisplay
  );
}

renderSpecific();
