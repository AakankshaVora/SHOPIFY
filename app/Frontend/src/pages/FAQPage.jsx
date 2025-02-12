import React, { useState, useCallback } from "react";
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
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const FAQPage = () => {
  const [categories, setCategories] = useState([
    {
      name: "Home Appliances",
      faqs: [
        {
          question: "How to clean a refrigerator?",
          answerType: "text",
          answer:
            "You can clean a refrigerator with a damp cloth and mild soap.",
          rating: 4.5,
        },
        {
          question: "How to use a microwave oven?",
          answerType: "text",
          answer: "Refer to the user manual for detailed instructions.",
          rating: 3.8,
        },
      ],
    },
    {
      name: "Electronics",
      faqs: [
        {
          question: "What is the warranty period for this product?",
          answerType: "text",
          answer: "The warranty period is one year from the date of purchase.",
          rating: 4.7,
        },
      ],
    },
  ]);

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

  const handleAddOrEditFAQ = () => {
    const updatedCategories = [...categories];
    const faqs = updatedCategories[currentCategoryIndex].faqs;

    if (isEditing) {
      faqs[editingIndex] = { ...faqs[editingIndex], ...newFAQ };
    } else {
      faqs.push({ ...newFAQ, rating: 0 }); // Default static rating
    }

    setCategories(updatedCategories);
    toggleModal();
  };

  const handleEditFAQ = (categoryIndex, faqIndex) => {
    setCurrentCategoryIndex(categoryIndex);
    setNewFAQ(categories[categoryIndex].faqs[faqIndex]);
    setIsEditing(true);
    setEditingIndex(faqIndex);
    toggleModal();
  };

  const handleDeleteFAQ = (categoryIndex, faqIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].faqs.splice(faqIndex, 1);
    setCategories(updatedCategories);
  };

  const handleOpenAddModal = (categoryIndex) => {
    setCurrentCategoryIndex(categoryIndex);
    toggleModal();
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Array(filledStars)
          .fill(0)
          .map((_, index) => (
            <AiFillStar
              key={index}
              style={{ color: "#FFD700", marginRight: "2px" }}
            />
          ))}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <AiOutlineStar
              key={index}
              style={{ color: "#FFD700", marginRight: "2px" }}
            />
          ))}
      </div>
    );
  };

  const filteredFAQs = (faqs) => {
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

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
        {/* <Layout.Section>
          <h3>Search:</h3>
          <TextField
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            placeholder="Search by question or answer"
            autoComplete="off"
          />
        </Layout.Section> */}

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
                    {category.name}
                  </h2>
                </Layout.Section>
              </Layout>
              <DataTable
                columnContentTypes={["text", "text", "numeric", "text"]}
                headings={["Question", "Answer", "Rating", "Actions"]}
                rows={filteredFAQs(category.faqs).map((faq, faqIndex) => [
                  faq.question,
                  faq.answerType === "text"
                    ? faq.answer
                    : faq.file
                      ? faq.file.name
                      : "No file uploaded",
                  faq.rating.toFixed(1),
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
            <div style={{ marginTop: "12px" }}>
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
            </div>
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
            {(newFAQ.answerType === "image" ||
              newFAQ.answerType === "video") && (
              <div style={{ marginTop: "12px" }}>
                <label
                  style={{
                    fontWeight: "bold",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Upload {newFAQ.answerType === "image" ? "Image" : "Video"}:
                </label>
                <input
                  type="file"
                  accept={newFAQ.answerType === "image" ? "image/*" : "video/*"}
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
              </div>
            )}
          </Modal.Section>
        </Modal>
      </Layout>
    </Page>
  );
};

export default FAQPage;
