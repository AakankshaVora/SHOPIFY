import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Page,
  Layout,
  Card,
  Text,
  DataTable,
  Button,
  Modal,
  TextField,
  Select,
} from "@shopify/polaris";
import { fetchFaqsByCategory, deleteFAQById, updateFAQById } from "../../api/index.js";

const FAQ = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalActive, setModalActive] = useState(false); // Correct
  const [newFaq, setNewFaq] = useState({
    question: "",
    answerType: "text",
    answer: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      fetchFaqsByCategory(categoryId)
        .then((data) => {
          setFaqs(data || []);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch FAQs.");
          setLoading(false);
        });
    }
  }, [categoryId]);

  const toggleModal = useCallback(() => {
    if (modalActive) {
      setNewFaq({ question: "", answerType: "text", answer: "" });
      setIsEditing(false);
      setEditingId(null);
    }
    setModalActive(!modalActive);
  }, [modalActive]);

  const handleInputChange = (field) => (value) => {
    setNewFaq({ ...newFaq, [field]: value });
  };

  const handleEditFaq = (faqId) => {
    const selectedFaq = faqs.find((faq) => faq._id === faqId);
    if (selectedFaq) {
      setNewFaq({
        question: selectedFaq.question || "",
        answerType: selectedFaq.answerType || "text",
        answer: selectedFaq.answer || "",
      });
      setIsEditing(true);
      setEditingId(faqId);
      setModalActive(true);
    }
  };

  const handleSaveFaq = async () => {
  try {
    if (isEditing && editingId) {
      const updatedFaq = await updateFAQById(editingId, newFaq);
      
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) =>
          faq._id === editingId ? { ...faq, ...newFaq } : faq
        )
      );
    }
    toggleModal();
  } catch (error) {
    alert(error.message);
  }
};


  const handleDeleteFaq = async (faqId) => {
    try {
      await deleteFAQById(faqId);
      setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== faqId));
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating) => {
    const starCount = parseInt(rating, 10) || 0;
    return "★".repeat(starCount) + "☆".repeat(5 - starCount);
  };

  const rows = filteredFaqs.map((faq) => [
    faq.question,
    <Text as="span">{faq.answer}</Text>,
    renderStars(faq.rating),
    <div style={{ display: "flex", gap: "8px" }}>
      <Button onClick={() => handleEditFaq(faq._id)} size="slim">
        Edit
      </Button>
      <Button destructive onClick={() => handleDeleteFaq(faq._id)} size="slim">
        Delete
      </Button>
    </div>,
  ]);

  return (
    <Page title={`FAQs for ${categoryId || "Category"}`}>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="h2" variant="headingLg">
              Category ID: {categoryId || "N/A"}
            </Text>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card sectioned>
          <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <TextField
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
                placeholder="Search FAQs"
                autoComplete="off"
              />
            </div>

            {loading ? (
              <Text>Loading FAQs...</Text>
            ) : error ? (
              <Text>{error}</Text>
            ) : faqs.length === 0 ? (
              <Text>No FAQs available for this category.</Text>
            ) : (
              <DataTable
                columnContentTypes={["text", "text","text", "text"]}
                headings={["Question", "Answer","Rating", "Actions"]}
                rows={rows}
              />
            )}
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Button primary onClick={toggleModal}>
            Add FAQ
          </Button>
        </Layout.Section>

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
              placeholder="Enter the question"
              value={newFaq.question}
              onChange={handleInputChange("question")}
              autoComplete="off"
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
                placeholder="Enter the answer"
                value={newFaq.answer}
                onChange={handleInputChange("answer")}
                autoComplete="off"
                multiline
              />
            )}
            {(newFaq.answerType === "image" || newFaq.answerType === "video") && (
              <TextField
                type="file"
                label={`Upload ${newFaq.answerType}`}
                onChange={handleInputChange("answer")}
                accept={newFaq.answerType === "image" ? "image/*" : "video/*"}
              />
            )}
          </Modal.Section>
        </Modal>
      </Layout>
    </Page>
  );
};

export default FAQ;
