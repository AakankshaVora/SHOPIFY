const API_BASE_URL = "/api"; // Your API base URL

// Helper function to make API requests
const apiRequest = async (endpoint, method = "GET", body = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return await response.json();
};

// API function to fetch categories by store ID
export const getCategoriesByStore = async (storeId) => {
  return await apiRequest(`/category/get-allCategory/${storeId}`);
};