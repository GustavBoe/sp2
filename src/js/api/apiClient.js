import { BASE_URL } from "../const/const.js";
//Function from Noroff JS2 module 2 lesson 2.2
async function apiClient(endpoint, options = {}) {
  const { body, ...customOptions } = options;
  const headers = {};
  const config = {
    method: body ? "POST" : "GET",
    ...customOptions,
    headers: {
      ...headers,
      ...customOptions.headers,
    },
  };
  if (body) {
    if (body instanceof FormData) {
      config.body = body;
    } else {
      config.body = JSON.stringify(body);
      config.headers["Content-Type"] = "application/json";
    }
  }
  const apiKey = localStorage.getItem("apiKey");
  const accessToken = localStorage.getItem("accessToken");
  if (apiKey) config.headers["X-Noroff-API-Key"] = apiKey;
  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

  try {
    const response = await fetch(BASE_URL + endpoint, config);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.errors?.[0]?.message || "An API error occurred"
      );
    }
    if (response.status === 204) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("API Client Error", error);
    throw error;
  }
}
export const get = (endpoint) => apiClient(endpoint);
export const post = (endpoint, body) => apiClient(endpoint, { body });
export const put = (endpoint, body) =>
  apiClient(endpoint, { method: "PUT", body });
export const del = (endpoint) => apiClient(endpoint, { method: "DELETE" });
