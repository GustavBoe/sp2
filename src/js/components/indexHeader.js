import {
  profileName,
  isLoggedIn,
  listLogo,
  desktopLinks,
  mobileLinks,
  OWNER_URL,
  errorMessage,
} from "../const/const.js";

import { getProfileData } from "./header.js";
errorMessage.textContent = "Unable to get user information";

export async function displayIndexHeader() {
  listLogo.addEventListener("click", () => {
    location.href = "/";
  });

  const homeLink = document.createElement("a");
  const createLink = document.createElement("a");
  const creditsDisplay = document.createElement("p");
  const profileLink = document.createElement("a");
  const logInLink = document.createElement("a");
  const logOutButton = document.createElement("button");

  const mobileHomeLink = document.createElement("a");
  const mobileCreateLink = document.createElement("a");
  const mobileCreditsDisplay = document.createElement("p");
  const mobileProfileLink = document.createElement("a");
  const mobileLogInLink = document.createElement("a");
  const mobileLogOutButton = document.createElement("p");

  mobileHomeLink.textContent = "Home";
  mobileHomeLink.setAttribute("href", "/");
  mobileCreateLink.textContent = "Create";
  mobileCreateLink.setAttribute("href", "./src/html/create.html");
  mobileProfileLink.textContent = "Profile";
  mobileLogInLink.textContent = "Log in";
  mobileLogInLink.setAttribute("href", "./src/html/login.html");
  mobileLogOutButton.textContent = "Log out";
  mobileLogOutButton.addEventListener("click", () => {
    localStorage.clear();
    location.href = "/";
  });

  let mobileNavElements = [
    mobileHomeLink,
    mobileCreateLink,
    mobileCreditsDisplay,
    mobileProfileLink,
    mobileLogInLink,
    mobileLogOutButton,
  ];
  mobileNavElements.forEach((element) => {
    element.classList.add(
      "block",
      "px-3",
      "py-2",
      "pl-50",
      "text-right",
      "text-listBlue"
    );
  });
  mobileLogOutButton.classList.remove("text-listBlue");
  mobileLogOutButton.classList.add("text-listAlert");

  listLogo.textContent = "List";
  listLogo.setAttribute("href", "/");
  homeLink.textContent = "Home";
  homeLink.setAttribute("href", "/");
  createLink.textContent = "Create";
  createLink.setAttribute("href", "./src/html/create.html");
  profileLink.textContent = "Profile";
  logInLink.textContent = "Log in";
  logInLink.setAttribute("href", "./src/html/login.html");
  logOutButton.textContent = "Log out";
  logOutButton.classList.add("cursor-pointer", "text-listAlert");
  logOutButton.addEventListener("click", () => {
    localStorage.clear();
    location.href = "/";
  });

  if (!isLoggedIn) {
    desktopLinks.append(homeLink, logInLink);
    mobileLinks.append(mobileHomeLink, mobileLogInLink);
  } else {
    try {
      const user = await getProfileData(OWNER_URL);

      creditsDisplay.textContent = `Credits: ${user.credits}`;
      profileLink.setAttribute(
        "href",
        `./src/html/profile.html?id=${profileName}`
      );

      mobileCreditsDisplay.textContent = `Credits: ${user.credits}`;
      mobileProfileLink.setAttribute(
        "href",
        `./src/html/profile.html?id=${profileName}`
      );

      desktopLinks.append(
        homeLink,
        createLink,
        creditsDisplay,
        profileLink,
        logOutButton
      );

      mobileLinks.append(
        mobileHomeLink,
        mobileCreateLink,
        mobileCreditsDisplay,
        mobileProfileLink,
        mobileLogOutButton
      );
    } catch (error) {
      desktopLinks.append(errorMessage);
      mobileLinks.append(errorMessage);
    }
  }
}
