import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Layout,
  Card,
  Button,
  DataTable,
  TextField,
  Modal,
  Checkbox,
  Badge,
  Text,
} from "@shopify/polaris";

const CategoriesPage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    {
      name: "Home Appliances",
      description: "Appliances for daily household use",
      createdAt: "2025-01-01",
      isActive: true,
    },
    {
      name: "Electronics",
      description: "Electronic gadgets and devices",
      createdAt: "2025-01-15",
      isActive: false,
    },
  ]);

  const [modalActive, setModalActive] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    createdAt: "",
    isActive: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const toggleModal = useCallback(() => {
    if (modalActive) {
      setNewCategory({
        name: "",
        description: "",
        createdAt: "",
        isActive: false,
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
      updatedCategories[editingIndex] = newCategory;
      setCategories(updatedCategories);
    } else {
      setCategories([...categories, newCategory]);
    }

    setNewCategory({
      name: "",
      description: "",
      createdAt: "",
      isActive: false,
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
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const rows = filteredCategories.map((category, index) => [
    <Button plain onClick={() => handleCategoryClick(category.name)}>
      {category.name || "N/A"}
    </Button>,
    category.description || "N/A",
    category.createdAt || "N/A",
    <Badge status={category.isActive ? "success" : "warning"}>
      {category.isActive ? "Active" : "Inactive"}
    </Badge>,
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

            <DataTable
              columnContentTypes={["text", "text", "text", "text", "text"]}
              headings={[
                "Category Name",
                "Description",
                "Created At",
                "Is Active",
                "Actions",
              ]}
              rows={rows}
            />
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
            <TextField
              label="Created At"
              value={newCategory.createdAt}
              onChange={handleInputChange("createdAt")}
              type="date"
            />
            <div style={{ marginTop: "12px" }}>
              <Checkbox
                label="Is Active"
                checked={newCategory.isActive}
                onChange={handleInputChange("isActive")}
              />
            </div>
          </Modal.Section>
        </Modal>
      </Layout>
    </Page>
  );
};

export default CategoriesPage;
