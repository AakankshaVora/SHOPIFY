import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  Page,
  Layout,
  Card,
  Button,
  DataTable,
  Modal,
  TextField,
  Select,
} from "@shopify/polaris";
import {
  getCategoriesWithFAQs,
  updateFAQByCategoryAndId,
  deleteFAQById,
} from "../../api/index.js";
import { LanguageContext } from "../context/LanguageContext.jsx";

const FAQPage = () => {
  const { selectedLanguage } = useContext(LanguageContext);

  const storeId = "offline_test-learning-app.myshopify.com";
  const [categories, setCategories] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);
  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answerType: "text",
    answer: "",
    file: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCategoriesWithFAQs(storeId, selectedLanguage)
      .then((response) => {
        if (response && response.success && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Invalid data format received:", response);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      })
  }, [storeId]);

  const toggleModal = useCallback(() => {
    if (modalActive) {
      setNewFAQ({ question: "", answerType: "text", answer: "", file: null });
      setIsEditing(false);
      setEditingIndex(null);
    }
    setModalActive(!modalActive);
  }, [modalActive]);

  const handleInputChange = (field) => (value) => {
    setNewFAQ({ ...newFAQ, [field]: value });
  };

  const handleFileUpload = (file) => {
    setNewFAQ((prev) => ({ ...prev, file }));
  };

  const handleAddOrEditFAQ = async () => {
    const updatedCategories = [...categories];
    const category = updatedCategories[currentCategoryIndex];
    const faqs = category.faqs;

    if (isEditing) {
      const faqId = faqs[editingIndex]._id; // Assuming each FAQ has a unique _id
      try {
        await updateFAQByCategoryAndId(category._id, faqId, newFAQ); // API call
        faqs[editingIndex] = { ...faqs[editingIndex], ...newFAQ };
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error updating FAQ:", error);
      }
    } else {
      faqs.push({ ...newFAQ, rating: 0 }); // Default static rating
      setCategories(updatedCategories);
    }

    toggleModal();
  };

  const handleEditFAQ = (categoryIndex, faqIndex) => {
    setCurrentCategoryIndex(categoryIndex);
    const selectedFAQ = categories[categoryIndex].faqs[faqIndex];

    setNewFAQ({
      question: selectedFAQ.question || "",
      answerType: selectedFAQ.answerType || "text",
      answer: selectedFAQ.answer || "",
      file: selectedFAQ.file || null,
    });

    setIsEditing(true);
    setEditingIndex(faqIndex);
    toggleModal();
  };

  const handleDeleteFAQ = async (categoryIndex, faqIndex) => {
    const faqId = categories[categoryIndex].faqs[faqIndex]._id;

    console.log("Deleting FAQ:", faqId);

    try {
      await deleteFAQById(faqId);
      const updatedCategories = [...categories];
      updatedCategories[categoryIndex].faqs.splice(faqIndex, 1);
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  const handleOpenAddModal = (categoryIndex) => {
    setCurrentCategoryIndex(categoryIndex);
    toggleModal();
  };

  const renderStars = (rating) => {
    const starCount = parseInt(rating, 10) || 0;
    return "★".repeat(starCount) + "☆".repeat(5 - starCount);
  };

  const filteredFAQs = (faqs) =>
    faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <Page title="FAQs" subtitle="Manage FAQs for each category">
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "row",
          gap: "10px",
          marginBottom: "16px",
          justifyContent: "flex-end",
          width: "100%",
          minWidth: "700px",
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
        <div style={{ flexGrow: 1, maxWidth: "200px" }}>
          <TextField
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            placeholder="Search by question or answer"
            autoComplete="off"
          />
        </div>
      </div>

      <Layout>
        {categories.map((category, categoryIndex) => (
          <Layout.Section key={categoryIndex}>
            <Card sectioned>
              <Layout>
                <Layout.Section>
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      marginBottom: "16px",
                      marginLeft: "10px",
                    }}
                  >
                    {category.categoryName}
                  </h2>
                </Layout.Section>
              </Layout>
              <DataTable
                columnContentTypes={["text", "text", "numeric", "text"]}
                headings={["Question", "Answer", "Rating", "Actions"]}
                rows={filteredFAQs(category.faqs).map((faq, faqIndex) => [
                  faq.question,
                  faq.answer,
                  renderStars(faq.rating),
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                      size="slim"
                      onClick={() => handleEditFAQ(categoryIndex, faqIndex)}
                    >
                      Edit
                    </Button>
                    <Button
                      destructive
                      size="slim"
                      onClick={() => handleDeleteFAQ(categoryIndex, faqIndex)}
                    >
                      Delete
                    </Button>
                  </div>,
                ])}
              />
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  primary
                  onClick={() => handleOpenAddModal(categoryIndex)}
                >
                  Add FAQ
                </Button>
              </div>
            </Card>
          </Layout.Section>
        ))}

        <Modal
          open={modalActive}
          onClose={toggleModal}
          title={isEditing ? "Edit FAQ" : "Add FAQ"}
          primaryAction={{
            content: isEditing ? "Save Changes" : "Add FAQ",
            onAction: handleAddOrEditFAQ,
          }}
          secondaryActions={[{ content: "Cancel", onAction: toggleModal }]}
        >
          <Modal.Section>
            <TextField
              label="Question"
              value={newFAQ.question}
              onChange={handleInputChange("question")}
              autoComplete="off"
              placeholder="Enter question"
            />
            <Select
              label="Answer Type"
              options={[
                { label: "Text", value: "text" },
                { label: "Image", value: "image" },
                { label: "Video", value: "video" },
              ]}
              value={newFAQ.answerType}
              onChange={handleInputChange("answerType")}
            />
            {newFAQ.answerType === "text" && (
              <TextField
                label="Answer"
                value={newFAQ.answer}
                onChange={handleInputChange("answer")}
                autoComplete="off"
                multiline
                placeholder="Enter text answer"
              />
            )}
          </Modal.Section>
        </Modal>
      </Layout>
    </Page>
  );
};

export default FAQPage;
