import {
  profileName,
  isLoggedIn,
  desktopLinks,
  mobileLinks,
  OWNER_URL,
  errorMessage,
} from "../const/const.js";
import { get } from "../api/apiClient.js";
errorMessage.textContent = "Unable to get user information";

async function getProfileData(url) {
  try {
    const response = await get(url);
    const profileData = response.data;
    return profileData;
  } catch (error) {
    alert(error, "Could not get user");
  }
}
export async function displayHeader() {
  const listLogo = document.createElement("a");
  listLogo.textContent = "List";
  listLogo.setAttribute("href", "../index.html");

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
  const mobileLogOutButton = document.createElement("button");

  mobileHomeLink.textContent = "Home";
  mobileHomeLink.setAttribute("href", "../index.html");
  mobileCreateLink.textContent = "Create";
  mobileCreateLink.setAttribute("href", "../listing/create.html");
  mobileProfileLink.textContent = "Profile";
  mobileLogInLink.textContent = "Log in";
  mobileLogInLink.setAttribute("href", "../login/index.html");
  mobileLogOutButton.textContent = "Log out";
  mobileLogOutButton.addEventListener("click", () => {
    localStorage.clear();
    location.href = "../index.html";
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
    element.classList = " block px-3 py-2 text-grey-700 hover:text-blue-600";
  });

  listLogo.textContent = "List";
  listLogo.setAttribute("href", "../index.html");
  homeLink.textContent = "Home";
  homeLink.setAttribute("href", "../index.html");
  createLink.textContent = "Create";
  createLink.setAttribute("href", "../listing/create.html");
  profileLink.textContent = "Profile";
  logInLink.textContent = "Log in";
  logInLink.setAttribute("href", "../login/index.html");
  logOutButton.textContent = "Log out";
  logOutButton.addEventListener("click", () => {
    localStorage.clear();
    location.href = "../index.html";
  });
  let desktopNavElements = [
    homeLink,
    createLink,
    creditsDisplay,
    profileLink,
    logInLink,
    logOutButton,
  ];
  //desktopNavElements.forEach((element) => {
  //element.classList = "text-grey-700 hover:text-blue-600";
  //});
  if (!isLoggedIn) {
    desktopLinks.append(homeLink, logInLink);
    mobileLinks.append(mobileHomeLink, mobileLogInLink);
  } else {
    try {
      const user = await getProfileData(OWNER_URL);

      creditsDisplay.textContent = `Credits: ${user.credits}`;
      profileLink.setAttribute(
        "href",
        `../profile/index.html?id=${profileName}`
      );

      mobileCreditsDisplay.textContent = `Credits: ${user.credits}`;
      mobileProfileLink.setAttribute(
        "href",
        `../profile/index.html?id=${profileName}`
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
