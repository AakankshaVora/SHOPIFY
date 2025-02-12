import React, { useState, useCallback, useEffect } from "react";
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
  Spinner,
} from "@shopify/polaris";
import { getCategoriesByStore } from "../../api";

const CategoriesPage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // For API loading state
  const [modalActive, setModalActive] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const STORE_ID = "offline_test-learning-app.myshopify.com";

  console.log("Categories:", categories);
  

  // Fetch categories from the API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const fetchedCategories = await getCategoriesByStore(STORE_ID);
      setCategories(fetchedCategories); 
    } catch (error) {
      console.error("Failed to fetch categories:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleModal = useCallback(() => {
    if (modalActive) {
      setNewCategory({
        name: "",
        description: "",
      });
      setIsEditing(false);
      setEditingIndex(null);
    }
    setModalActive(!modalActive);
  }, [modalActive]);

  const handleInputChange = (field) => (value) => {
    setNewCategory({ ...newCategory, [field]: value });
  };

  const handleSaveCategory = () => {
    if (isEditing) {
      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = {
        ...categories[editingIndex],
        ...newCategory,
      };
      setCategories(updatedCategories);
    } else {
      setCategories([
        ...categories,
        { ...newCategory, createdAt: new Date().toISOString().split("T")[0] },
      ]);
    }

    setNewCategory({
      name: "",
      description: "",
    });
    setIsEditing(false);
    setEditingIndex(null);
    toggleModal();
  };

  const handleEditCategory = (index) => {
    setNewCategory(categories[index]);
    setIsEditing(true);
    setEditingIndex(index);
    toggleModal();
  };

  const handleDeleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/faq?category=${encodeURIComponent(categoryName)}`);
  };

  // Filtering categories based on the search query
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rows = filteredCategories.map((category, index) => [
    <Button plain onClick={() => handleCategoryClick(category.name)}>
      {category.name || "N/A"}
    </Button>,
    category.description || "N/A",
    category.totalFaqs || 0, // Display total FAQs
    category.createdAt || "N/A", // Display the createdAt value
    <div style={{ display: "flex", gap: "8px" }}>
      <Button onClick={() => handleEditCategory(index)} size="slim">
        Edit
      </Button>
      <Button
        destructive
        onClick={() => handleDeleteCategory(index)}
        size="slim"
      >
        Delete
      </Button>
    </div>,
  ]);

  return (
    <Page title="Categories" subtitle="Manage your store's FAQ categories">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="h2" variant="headingLg">
              Total Categories: {filteredCategories.length}
            </Text>
          </Card>
        </Layout.Section>

        {/* Table Section with Search Bar at Top Right */}
        <Layout.Section>
          <Card sectioned>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "row",
                gap: "10px",
                marginBottom: "16px",
                justifyContent: "flex-end",
              }}
            >
              <label
                htmlFor="searchField"
                style={{
                  marginBottom: "8px",
                  fontWeight: "bold",
                  fontSize: "16px",
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
                style={{ width: "400px" }} // Adjust the width for the search field
              />
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Spinner accessibilityLabel="Loading categories" />
              </div>
            ) : (
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
            )}
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Button primary onClick={toggleModal}>
            Add Category
          </Button>
        </Layout.Section>

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
      </Layout>
    </Page>
  );
};

export default CategoriesPage;
