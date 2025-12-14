import { footer } from "../const/const.js";

export function displayFooter() {
  const elementContainer = document.createElement("div");

  const listTrademark = document.createElement("p");
  const siteMap = document.createElement("p");
  const privacyPolicy = document.createElement("p");
  const termsAndConditions = document.createElement("p");

  listTrademark.textContent = `©List2025`;
  siteMap.textContent = "Sitemap";
  privacyPolicy.textContent = "Privacy policy";
  termsAndConditions.textContent = `Terms & Conditions`;
  elementContainer.append(
    listTrademark,
    siteMap,
    privacyPolicy,
    termsAndConditions
  );

  elementContainer.classList.add(
    "pb-8",
    "pt-8",
    "grid",
    "grid-cols-2",
    "grid-rows-2",
    "gap-5",
    "justify-items-center",
    "text-white"
  );

  footer.classList.add("bg-listBlue");
  footer.append(elementContainer);
}
