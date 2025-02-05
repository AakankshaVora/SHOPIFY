import React, { useState } from "react";
import {
  Modal,
  TextField,
  Select,
  Button,
  Page,
  Layout,
  Card,
  DataTable,
  Text,
} from "@shopify/polaris";

const FAQPage = () => {
  const [categories, setCategories] = useState([
    "Electronics",
    "Home Appliances",
    "Furniture",
    "Clothing",
    "Beauty",
  ]);

  const [faqs, setFaqs] = useState({
    Electronics: [
      {
        question: "What is the battery life of the phone?",
        answerType: "text",
        answer: "The phone has a battery life of up to 10 hours.",
      },
      {
        question: "Does this laptop have a touchscreen?",
        answerType: "text",
        answer: "Yes, this laptop comes with a touchscreen.",
      },
    ],
    "Home Appliances": [
      {
        question: "How do I install the air conditioner?",
        answerType: "text",
        answer: "Follow the manual instructions for installation.",
      },
      {
        question: "What is the warranty period for the washing machine?",
        answerType: "text",
        answer: "The washing machine comes with a 2-year warranty.",
      },
    ],
    Furniture: [
      {
        question: "Is the sofa easy to assemble?",
        answerType: "text",
        answer: "Yes, the sofa is easy to assemble with the included manual.",
      },
    ],
    Clothing: [
      {
        question: "What material is the jacket made of?",
        answerType: "text",
        answer: "The jacket is made of 100% polyester.",
      },
    ],
    Beauty: [
      {
        question: "Is this product suitable for sensitive skin?",
        answerType: "text",
        answer:
          "Yes, the product is dermatologically tested and suitable for sensitive skin.",
      },
    ],
  });

  const [searchQuery, setSearchQuery] = useState(""); // Define searchQuery state
  const [modalActive, setModalActive] = useState(false);
  const [newFaq, setNewFaq] = useState({
    category: "",
    question: "",
    answerType: "text",
    answer: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const toggleModal = () => {
    setModalActive(!modalActive);
    if (!modalActive) {
      // Reset modal for adding a new FAQ
      setNewFaq({ category: "", question: "", answerType: "text", answer: "" });
      setIsEditing(false);
      setEditingCategory(null);
      setEditingIndex(null);
    }
  };

  const handleInputChange = (field) => (value) => {
    setNewFaq({ ...newFaq, [field]: value });
  };

  const handleSaveFaq = () => {
    if (isEditing) {
      // Edit existing FAQ
      const updatedFaqs = { ...faqs };
      updatedFaqs[editingCategory][editingIndex] = newFaq;
      setFaqs(updatedFaqs);
    } else {
      // Add new FAQ
      const updatedFaqs = { ...faqs };
      updatedFaqs[newFaq.category] = [
        ...(updatedFaqs[newFaq.category] || []),
        newFaq,
      ];
      setFaqs(updatedFaqs);
    }

    // Close modal after saving
    toggleModal();
  };

  const handleEditFaq = (category, index) => {
    setNewFaq(faqs[category][index]);
    setIsEditing(true);
    setEditingCategory(category);
    setEditingIndex(index);
    toggleModal();
  };

  const handleDeleteFaq = (category, index) => {
    const updatedFaqs = { ...faqs };
    updatedFaqs[category].splice(index, 1);
    setFaqs(updatedFaqs);
  };

  const rows = (category) => {
    return (
      faqs[category]
        ?.filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase())) // Apply search filter
        .map((faq, index) => [
          faq.question,
          faq.answerType === "text" ? (
            faq.answer
          ) : faq.answerType === "image" ? (
            <img src={faq.answer} alt="FAQ" style={{ width: "100px" }} />
          ) : (
            <video src={faq.answer} controls style={{ width: "100px" }} />
          ),
          <div style={{ display: "flex", gap: "8px" }}>
            <Button onClick={() => handleEditFaq(category, index)} size="slim">
              Edit
            </Button>
            <Button
              destructive
              onClick={() => handleDeleteFaq(category, index)}
              size="slim"
            >
              Delete
            </Button>
          </div>,
        ]) || []
    );
  };

  return (
    <Page title="Category Wise FAQs">
      {/* Search Field (Only once at the top) */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "row",
          gap: "10px",
          marginBottom: "16px",
          justifyContent: "flex-end",
          marginTop: "20px",
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
          placeholder="Search FAQ by question"
          autoComplete="off"
          style={{ width: "400px" }} // Adjust the width for the search field
        />
      </div>

      <Layout>
        {categories.map((category) => (
          <Layout.Section key={category} style={{ marginBottom: "30px" }}>
            <Card sectioned>
              <Layout>
                <Layout.Section>
                  <Text as="h2" variant="headingLg">
                    {category}
                  </Text>
                </Layout.Section>
              </Layout>

              <DataTable
                columnContentTypes={["text", "text", "text"]}
                headings={["Question", "Answer", "Actions"]}
                rows={rows(category)}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <Button
                  primary
                  onClick={() => {
                    setNewFaq({ ...newFaq, category }); // Set category when Add FAQ button is clicked
                    toggleModal();
                  }}
                >
                  Add FAQ
                </Button>
              </div>
            </Card>
          </Layout.Section>
        ))}
      </Layout>

      {/* Add/Edit FAQ Modal */}
      <Modal
        open={modalActive}
        onClose={toggleModal}
        title={isEditing ? "Edit FAQ" : "Add FAQ"}
        primaryAction={{
          content: isEditing ? "Save Changes" : "Add FAQ",
          onAction: handleSaveFaq,
        }}
        secondaryActions={[{ content: "Cancel", onAction: toggleModal }]}
      >
        <Modal.Section>
          <TextField
            label="Question"
            value={newFaq.question}
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
            onChange={handleInputChange("answerType")}
            value={newFaq.answerType}
          />

          {newFaq.answerType === "text" && (
            <TextField
              label="Answer"
              value={newFaq.answer}
              onChange={handleInputChange("answer")}
              autoComplete="off"
              multiline
              placeholder="Enter answer"
            />
          )}

          {(newFaq.answerType === "image" || newFaq.answerType === "video") && (
            <TextField
              type="file"
              label={`Upload ${newFaq.answerType}`}
              onChange={handleInputChange("answer")}
              accept={newFaq.answerType === "image" ? "image/" : "video/"}
            />
          )}
        </Modal.Section>
      </Modal>
    </Page>
  );
};

export default FAQPage;
