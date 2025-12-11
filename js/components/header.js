import {
  profileName,
  isLoggedIn,
  header,
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
  const navContainer = document.createElement("div");
  const listLogo = document.createElement("a");
  const headerNav = document.createElement("nav");
  const homeLink = document.createElement("a");
  const createLink = document.createElement("a");
  const creditsDisplay = document.createElement("p");
  const profileLink = document.createElement("a");
  const logInLink = document.createElement("a");
  const logOutButton = document.createElement("button");

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

  if (!isLoggedIn) {
    headerNav.append(homeLink, logInLink);
  } else {
    try {
      const user = await getProfileData(OWNER_URL);

      creditsDisplay.textContent = `Credits: ${user.credits}`;
      profileLink.setAttribute(
        "href",
        `../profile/index.html?id=${profileName}`
      );

      headerNav.append(
        homeLink,
        createLink,
        creditsDisplay,
        profileLink,
        logOutButton
      );
    } catch (error) {
      headerNav.append(errorMessage);
    }
  }
  navContainer.append(listLogo, headerNav);
  header.append(navContainer);
}
