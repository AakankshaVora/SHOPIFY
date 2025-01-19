// src/pages/CategoriesPage.jsx
import React, { useState, useCallback } from "react";
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
  // Sample data for categories
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

  const toggleModal = useCallback(() => {
    // When closing the modal, reset the form values
    if (modalActive) {
      setNewCategory({ name: "", description: "", createdAt: "", isActive: false });
      setIsEditing(false);
      setEditingIndex(null);
    }
    setModalActive(!modalActive);
  }, [modalActive]);

  // Handle input changes for the modal form
  const handleInputChange = (field) => (value) => {
    setNewCategory({ ...newCategory, [field]: value });
  };

  // Add or update category
  const handleSaveCategory = () => {
    if (isEditing) {
      // Update existing category
      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = newCategory;
      setCategories(updatedCategories);
    } else {
      // Add new category
      setCategories([...categories, newCategory]);
    }

    // Reset modal state
    setNewCategory({ name: "", description: "", createdAt: "", isActive: false });
    setIsEditing(false);
    setEditingIndex(null);
    toggleModal();
  };

  // Open modal for editing an existing category
  const handleEditCategory = (index) => {
    setNewCategory(categories[index]);
    setIsEditing(true);
    setEditingIndex(index);
    toggleModal();
  };

  // Delete a category
  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  // Toggle isActive status
  const toggleIsActive = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].isActive = !updatedCategories[index].isActive;
    setCategories(updatedCategories);
  };

  // Table rows data
  const rows = categories.map((category, index) => [
    category.name || "N/A", // Display "N/A" if no name is set
    category.description || "N/A", // Display "N/A" if no description is set
    category.createdAt || "N/A", // Display "N/A" if no date is set
    <Badge status={category.isActive ? "success" : "warning"}>
      {category.isActive ? "Active" : "Inactive"}
    </Badge>,
    <div style={{ display: "flex", gap: "8px" }}>
      <Button onClick={() => handleEditCategory(index)} size="slim">
        Edit
      </Button>
      <Button destructive onClick={() => handleDeleteCategory(index)} size="slim">
        Delete
      </Button>
    </div>,
  ]);

  return (
    <Page title="Categories" subtitle="Manage your store's FAQ categories">
      <Layout>
        {/* Total Categories Summary */}
        <Layout.Section>
          <Card sectioned>
            <Text as="h2" variant="headingLg">
              Total Categories: {categories.length}
            </Text>
          </Card>
        </Layout.Section>

        {/* Categories Table */}
        <Layout.Section>
          <Card sectioned>
            <DataTable
              columnContentTypes={["text", "text", "text", "text", "text"]}
              headings={["Category Name", "Description", "Created At", "Is Active", "Actions"]}
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

        {/* Add/Edit Modal */}
        <Modal
          open={modalActive}
          onClose={toggleModal}
          title={isEditing ? "Edit Category" : "Add Category"}
          primaryAction={{
            content: isEditing ? "Save Changes" : "Add Category",
            onAction: handleSaveCategory,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: toggleModal,
            },
          ]}
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
            <Checkbox
              label="Is Active"
              checked={newCategory.isActive}
              onChange={handleInputChange("isActive")}
            />
          </Modal.Section>
        </Modal>
      </Layout>
    </Page>
  );
};

export default CategoriesPage;
