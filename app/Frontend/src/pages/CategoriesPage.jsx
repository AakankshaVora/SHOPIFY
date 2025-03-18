import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Layout,
  Card,
  Button,
  DataTable,
  TextField,
  Modal,
  Text,
  Toast,
  Frame,
} from "@shopify/polaris";
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getFaqCountByCategory,
} from "../../api/index.js"; // Import API functions

const CategoriesPage = () => {
  const navigate = useNavigate();

  const storeId = "offline_test-learning-app.myshopify.com"; // Replace with actual store ID

  // States
  const [categories, setCategories] = useState([]); // List of categories
  const [loading, setLoading] = useState(true); // Loading indicator
  const [modalActive, setModalActive] = useState(false); // Modal visibility
  const [newCategory, setNewCategory] = useState({ name: "", description: "" }); // Category form data
  const [isEditing, setIsEditing] = useState(false); // Edit mode indicator
  const [editingIndex, setEditingIndex] = useState(null); // Index of the category being edited
  const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering categories
  const [toastMessage, setToastMessage] = useState(null); // Toast message
  const [toastActive, setToastActive] = useState(false); // Toast visibility
  const [deleteConfirmActive, setDeleteConfirmActive] = useState(false); // Delete confirmation modal visibility
  const [deleteIndex, setDeleteIndex] = useState(null); // Index of the category to delete
  const [totalFaqsCount, setTotalFaqsCount] = useState(0);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategoriesWithFaqCount = async () => {
      try {
        setLoading(true);
  
        const categories = await fetchAllCategories(storeId);
        if (!Array.isArray(categories)) {
          console.error("Invalid categories data:", categories);
          setLoading(false);
          return;
        }
  
        const categoriesWithFaqCount = await Promise.all(
          categories.map(async (category) => {
            try {
              const totalFaqs = await getFaqCountByCategory(category._id);
              return { ...category, totalFaqs };
            } catch (error) {
              console.error(`Error fetching FAQ count for category ${category._id}:`, error);
              return { ...category, totalFaqs: 0 };
            }
          })
        );
  
        setCategories(categoriesWithFaqCount);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategoriesWithFaqCount();
  }, [categories.length]); 

  // Toggle modal visibility
  const toggleModal = useCallback(() => {
    if (!modalActive) {
      if (!isEditing) {
        setNewCategory({ name: "", description: "" }); // Reset form only if adding new category
      }
    } else {
      setIsEditing(false); // Reset edit mode on modal close
      setEditingIndex(null);
      setNewCategory({ name: "", description: "" }); // Ensure it's cleared only when closing the modal
    }
    setModalActive(!modalActive);
  }, [modalActive, isEditing]);

  // Handle form input changes
  const handleInputChange = (field) => (value) => {
    setNewCategory({ ...newCategory, [field]: value });
  };

  // Save a new or edited category
  const handleSaveCategory = () => {
    if (!newCategory.name.trim()) {
      setToastMessage("Category name cannot be empty!");
      setToastActive(true);
      return;
    }

    if (isEditing) {
      const categoryId = categories[editingIndex]._id; // Assuming `_id` is the unique identifier
      updateCategory(categoryId, newCategory)
        .then((updatedCategory) => {
          const updatedCategories = [...categories];
          updatedCategories[editingIndex] = updatedCategory; // Update the category in the local state
          setCategories(updatedCategories);
          setToastMessage("Category updated successfully!");
          setToastActive(true);
          toggleModal(); // Close modal
        })
        .catch((error) => {
          console.error("Failed to update category:", error);
        });
    } else {
      createCategory(storeId, newCategory)
        .then((createdCategory) => {
          setCategories((prevCategories) => [
            createdCategory,
            ...prevCategories,
          ]); // Ensure latest state
          setToastMessage("Category created successfully!");
          setToastActive(true);
          toggleModal(); // Close modal
        })
        .catch((error) => {
          console.error("Failed to create category:", error);
        });
    }
  };

  // Edit a category
  const handleEditCategory = (index) => {
    const categoryToEdit = categories[index];
    setNewCategory({
      name: categoryToEdit.categoryName, // Ensure correct property mapping
      description: categoryToEdit.description,
    });
    setIsEditing(true);
    setEditingIndex(index);
    setModalActive(true); // Open modal after setting states
  };

  // Delete a category
  const handleDeleteCategory = () => {
    const categoryId = categories[deleteIndex]._id; // Assuming `_id` is the unique identifier
    deleteCategory(categoryId)
      .then(() => {
        setCategories(categories.filter((_, i) => i !== deleteIndex)); // Remove category from local state
        setToastMessage("Category deleted successfully!");
        setToastActive(true);
      })
      .catch((error) => {
        console.error("Failed to delete category:", error);
      });
    setDeleteConfirmActive(false); // Close confirmation modal
  };

  // Navigate to the FAQ page of a category
  const handleCategoryClick = (categoryName) => {
    navigate(`/faq?category=${encodeURIComponent(categoryName)}`);
  };

  // Filter categories based on the search query
  const filteredCategories = categories.filter((category, index) => {
    if (!category) {
      console.warn(
        `Category at index ${index} is null or undefined:`,
        category,
      );
      return false;
    }

    if (!category.categoryName || !category.description) {
      console.warn(`Category at index ${index} is missing fields:`, category);
      return false;
    }

    return (
      category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Create rows for DataTable
  const rows = filteredCategories.map((category, index) => [
    <Button plain onClick={() => handleCategoryClick(category._id)}>
      {category.categoryName || "N/A"}
    </Button>,
    category.description || "N/A",
    category.totalFaqs || 0, // Display total FAQs (add to category data if applicable)
    new Date(category.createdAt).toLocaleDateString() || "N/A", // Format date
    <div style={{ display: "flex", gap: "8px" }}>
      <Button onClick={() => handleEditCategory(index)} size="slim">
        Edit
      </Button>
      <Button
        destructive
        onClick={() => {
          setDeleteIndex(index);
          setDeleteConfirmActive(true);
        }}
        size="slim"
      >
        Delete
      </Button>
    </div>,
  ]);

  // Render loading state
  if (loading) {
    return <Page title="Categories">Loading...</Page>;
  }

  return (
    <Frame>
      <Page title="Categories" subtitle="Manage your store's FAQ categories">
        <Layout>
          {/* Category Summary */}
          <Layout.Section>
            <Card sectioned>
              <Text as="h2" variant="headingLg">
                Total Categories: {filteredCategories.length}
              </Text>
            </Card>
          </Layout.Section>

          {/* Table Section with Search Bar */}
          <Layout.Section>
            <Card sectioned>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "16px",
                  gap: "10px",
                }}
              >
                <label
                  htmlFor="searchField"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Search:
                </label>
                <TextField
                  id="searchField"
                  value={searchQuery}
                  onChange={(value) => setSearchQuery(value)}
                  placeholder="Search Category"
                  autoComplete="off"
                />
              </div>

              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text"]}
                headings={[
                  "Category Name",
                  "Description",
                  "Total FAQs",
                  "Created At",
                  "Actions",
                ]}
                rows={rows}
              />
            </Card>
          </Layout.Section>

          {/* Add Category Button */}
          <Layout.Section>
            <Button primary onClick={toggleModal}>
              Add Category
            </Button>
          </Layout.Section>

          {/* Add/Edit Category Modal */}
          <Modal
            open={modalActive}
            onClose={toggleModal}
            title={isEditing ? "Edit Category" : "Add Category"}
            primaryAction={{
              content: isEditing ? "Save Changes" : "Add Category",
              onAction: handleSaveCategory,
            }}
            secondaryActions={[{ content: "Cancel", onAction: toggleModal }]}
          >
            <Modal.Section>
              <TextField
                label="Category Name"
                value={newCategory.name}
                onChange={handleInputChange("name")}
                autoComplete="off"
                placeholder="Enter category name"
              />
              <TextField
                label="Description"
                value={newCategory.description}
                onChange={handleInputChange("description")}
                autoComplete="off"
                multiline
                placeholder="Enter category description"
              />
            </Modal.Section>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal
            open={deleteConfirmActive}
            onClose={() => setDeleteConfirmActive(false)}
            title="Confirm Deletion"
            primaryAction={{
              content: "Delete",
              onAction: handleDeleteCategory,
              destructive: true,
            }}
            secondaryActions={[
              {
                content: "Cancel",
                onAction: () => setDeleteConfirmActive(false),
              },
            ]}
          >
            <Modal.Section>
              <Text>Are you sure you want to delete this category?</Text>
            </Modal.Section>
          </Modal>
        </Layout>
      </Page>

      {/* Toast Notification */}
      {toastActive && (
        <Toast content={toastMessage} onDismiss={() => setToastActive(false)} />
      )}
    </Frame>
  );
};

export default CategoriesPage;
