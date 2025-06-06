import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Base URL for your API

// Fetch all categories by store ID
export const fetchAllCategories = async (storeId, selectedLanguage) => {
  const response = await fetch(
    `${API_BASE_URL}/category/all-category/${storeId}?language=${selectedLanguage}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  const data = await response.json();

  return data.data; // Adjust based on the structure of your API response
};

export const createCategory = async (storeId, categoryData) => {
  console.log("storeId : ", storeId);
  console.log("categoryData : ", categoryData);

  const response = await axios.post(
    `${API_BASE_URL}/category/create-category`,
    {
      storeId,
      categoryName: categoryData.name,
      description: categoryData.description,
    },
  );

  console.log("response: ", response.data);

  return response.data; // Return the response data
};

export const updateCategory = async (categoryId, categoryData) => {
  const response = await axios.put(
    `${API_BASE_URL}/category/update-category/${categoryId}`,
    {
      categoryName: categoryData.name,
      description: categoryData.description,
      isActive: categoryData.isActive,
    },
  );
  return response.data.data; // Return updated category data
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/category/delete-category/${categoryId}`,
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete category",
    );
  }
};

export const fetchFaqsByCategory = async (categoryId, selectedLanguage) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/faq/${categoryId}?language=${selectedLanguage}`);
    console.log("response:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return []; // Return an empty array in case of an error
  }
};

export const createFaq = async (faqData) => {
  try {
    console.log(faqData);

    const response = await axios.post(`${API_BASE_URL}/faq/create`, faqData);
    console.log("FAQ Created:", response.data.data);
    return response.data.data; // Return the newly created FAQ data
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return null; // Return null in case of an error
  }
};

export const deleteFAQById = async (faqId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/faq/delete-faq/${faqId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete FAQ");
  }
};

export const updateFAQById = async (faqId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/faq/update-faq/${faqId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update FAQ");
  }
};

export const getFaqCountByCategory = async (categoryId) => {
  try {
    // Validate categoryId before making the request
    if (!categoryId || typeof categoryId !== "string") {
      console.error("Invalid categoryId:", categoryId);
      return 0;
    }

    const response = await axios.get(`${API_BASE_URL}/faq/count/${categoryId}`);
    const data = await response.data.data.totalFAQs;

    // Ensure `data.data.totalFAQs` exists before returning
    return data || 0;
  } catch (error) {
    console.error("Error fetching FAQ count:", error);
    return 0;
  }
};

export const getCategoriesWithFAQs = async (storeId, selectedLanguage) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/category/get-data/${storeId}?language=${selectedLanguage}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories with FAQs",
    );
  }
};

export const updateFAQByCategoryAndId = async (
  categoryId,
  faqId,
  updatedData,
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/faq/update-faq/${categoryId}/${faqId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update FAQ");
  }
};

// export const addFAQ = async (storeId, question, answer) => {
//   try {
//     console.log("Adding new FAQ:", question, answer, answerType);
//     const data = {
//       storeId,
//       question,
//       answer,
//       answerType,
//       mediaFile
//     };  

//     console.log("data : ", data);

//     const response = await axios.post(
//       `${API_BASE_URL}/faq/create`,
//       data,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );

//     return response;
//   } catch (error) {
//     throw new Error(error.message || "Failed to add FAQ");
//   }
// };

// export const addFAQ = async (storeId, question, answer) => {
//   try {
//     console.log("Adding new FAQ:", question, answer);

//     const formData = new FormData();
//     formData.append("storeId", storeId);
//     formData.append("question", question);
//     formData.append("answer", answer);


//     const response = await axios.post(`${API_BASE_URL}/faq/create`, formData,{
//       headers: {
        
//       },
//     });

//     return response;
//   } catch (error) {
//     throw new Error(error.message || "Failed to add FAQ");
//   }
// };

export const addFAQ = async (storeId, question, answer) => {
  try {
    console.log("Adding new FAQ:", storeId, question, answer);

    const data = {
      storeId,
      question,
      answer,
    };

    console.log("data: ", data);

    const response = await axios.post(
      `${API_BASE_URL}/faq/create`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error(error.message || "Failed to add FAQ");
  }
};

export const createFAQByCategory = async (categoryId, storeId, question, answer) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/faq/create-faq/${categoryId}`,
      {
        storeId,
        question,
        answer,
        categoryId,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create FAQ");
  }
};
