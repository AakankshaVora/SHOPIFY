// import React, { useEffect, useState, useCallback, useContext } from "react";
// import { useSearchParams } from "react-router-dom";
// import {
//   Page,
//   Layout,
//   Card,
//   Text,
//   DataTable,
//   Button,
//   Modal,
//   TextField,
//   Select,
// } from "@shopify/polaris";
// import {
//   fetchFaqsByCategory,
//   deleteFAQById,
//   updateFAQById,
// } from "../../api/index.js";
// import { LanguageContext } from "../context/LanguageContext.jsx";

// const FAQ = () => {
//   const [searchParams] = useSearchParams();
//   const categoryId = searchParams.get("category");

//   const [faqs, setFaqs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [modalActive, setModalActive] = useState(false); // Correct
//   const [newFaq, setNewFaq] = useState({
//     question: "",
//     answer: "",
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { selectedLanguage } = useContext(LanguageContext);

//   useEffect(() => {
//     if (categoryId) {
//       setLoading(true);
//       fetchFaqsByCategory(categoryId, selectedLanguage)
//         .then((data) => {
//           setFaqs(data || []);
//           setLoading(false);
//         })
//         .catch(() => {
//           setError("Failed to fetch FAQs.");
//           setLoading(false);
//         });
//     }
//   }, [categoryId]);

//   const toggleModal = useCallback(() => {
//     if (modalActive) {
//       setNewFaq({ question: "", answer: "" });
//       setIsEditing(false);
//       setEditingId(null);
//     }
//     setModalActive(!modalActive);
//   }, [modalActive]);

//   const handleInputChange = (field) => (value) => {
//     setNewFaq({ ...newFaq, [field]: value });
//   };

//   const handleEditFaq = (faqId) => {
//     const selectedFaq = faqs.find((faq) => faq._id === faqId);
//     if (selectedFaq) {
//       setNewFaq({
//         question: selectedFaq.question || "",
//         answer: selectedFaq.answer || "",
//       });
//       setIsEditing(true);
//       setEditingId(faqId);
//       setModalActive(true);
//     }
//   };

//   const handleSaveFaq = async () => {
//     try {
//       if (isEditing && editingId) {
//         await updateFAQById(editingId, {
//           question: newFaq.question,
//           answer: newFaq.answer,
//         });
//         setFaqs((prevFaqs) =>
//           prevFaqs.map((faq) =>
//             faq._id === editingId ? { ...faq, ...newFaq } : faq,
//           ),
//         );
//       } else {
//         // Here you can call your addFAQ function
//         const response = await addFAQ(
//           categoryId,
//           newFaq.question,
//           newFaq.answer,
//         );
//         setFaqs((prevFaqs) => [...prevFaqs, response.data.data]); // Adjust depending on your API response
//       }
//       toggleModal();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleDeleteFaq = async (faqId) => {
//     try {
//       await deleteFAQById(faqId);
//       setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== faqId));
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const filteredFaqs = faqs.filter(
//     (faq) =>
//       faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   const renderStars = (rating) => {
//     const starCount = parseInt(rating, 10) || 0;
//     return "★".repeat(starCount) + "☆".repeat(5 - starCount);
//   };

//   const rows = filteredFaqs.map((faq) => [
//     faq.question,
//     <Text as="span">{faq.answer}</Text>,
//     renderStars(faq.rating),
//     <div style={{ display: "flex", gap: "8px" }}>
//       <Button onClick={() => handleEditFaq(faq._id)} size="slim">
//         Edit
//       </Button>
//       <Button destructive onClick={() => handleDeleteFaq(faq._id)} size="slim">
//         Delete
//       </Button>
//     </div>,
//   ]);

//   return (
//     <Page title={`FAQs for ${categoryId || "Category"}`}>
//       <Layout>
//         <Layout.Section>
//           <Card sectioned>
//             <Text as="h2" variant="headingLg">
//               Category ID: {categoryId || "N/A"}
//             </Text>
//           </Card>
//         </Layout.Section>

//         <Layout.Section>
//           <Card sectioned>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 gap: "10px",
//                 marginBottom: "10px",
//               }}
//             >
//               <TextField
//                 value={searchQuery}
//                 onChange={(value) => setSearchQuery(value)}
//                 placeholder="Search FAQs"
//                 autoComplete="off"
//               />
//             </div>

//             {loading ? (
//               <Text>Loading FAQs...</Text>
//             ) : error ? (
//               <Text>{error}</Text>
//             ) : faqs.length === 0 ? (
//               <Text>No FAQs available for this category.</Text>
//             ) : (
//               <DataTable
//                 columnContentTypes={["text", "text", "text", "text"]}
//                 headings={["Question", "Answer", "Rating", "Actions"]}
//                 rows={rows}
//               />
//             )}
//           </Card>
//         </Layout.Section>

//         <Layout.Section>
//           <Button primary onClick={toggleModal}>
//             Add FAQ
//           </Button>
//         </Layout.Section>

//         <Modal
//           open={modalActive}
//           onClose={toggleModal}
//           title={isEditing ? "Edit FAQ" : "Add FAQ"}
//           primaryAction={{
//             content: isEditing ? "Save Changes" : "Add FAQ",
//             onAction: handleSaveFaq,
//           }}
//           secondaryActions={[{ content: "Cancel", onAction: toggleModal }]}
//         >
//           <Modal.Section>
//             <TextField
//               label="Question"
//               placeholder="Enter the question"
//               value={newFaq.question}
//               onChange={handleInputChange("question")}
//               autoComplete="off"
//             />
//             <TextField
//               label="Answer"
//               placeholder="Enter the answer"
//               value={newFaq.answer}
//               onChange={handleInputChange("answer")}
//               autoComplete="off"
//               multiline
//             />
//           </Modal.Section>
//         </Modal>
//       </Layout>
//     </Page>
//   );
// };

// export default FAQ;


import React, { useEffect, useState, useCallback, useContext } from "react";
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
} from "@shopify/polaris";
import {
  fetchFaqsByCategory,
  deleteFAQById,
  updateFAQById,
  addFAQ,
} from "../../api/index.js";
import { LanguageContext } from "../context/LanguageContext.jsx";

const FAQ = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedLanguage } = useContext(LanguageContext);
  

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      fetchFaqsByCategory(categoryId, selectedLanguage)
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
      setNewFaq({ question: "", answer: "" });
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
        await updateFAQById(editingId, {
          question: newFaq.question,
          answer: newFaq.answer,
        });
        setFaqs((prevFaqs) =>
          prevFaqs.map((faq) =>
            faq._id === editingId ? { ...faq, ...newFaq } : faq,
          ),
        );
      } else {
        const response = await addFAQ(faqs[0].storeId, newFaq.question, newFaq.answer);
        setFaqs((prevFaqs) => [...prevFaqs, response.data]);
      }
      toggleModal();
    } catch (error) {
      alert(error.message || "An error occurred while saving FAQ.");
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

  const normalizedSearchQuery = (searchQuery).toLowerCase();

  const filteredFaqs = faqs.filter((faq) =>
    (faq?.question || "").toLowerCase().includes(normalizedSearchQuery) ||
    (faq?.answer || "").toLowerCase().includes(normalizedSearchQuery)
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
                columnContentTypes={["text", "text", "text", "text"]}
                headings={["Question", "Answer", "Rating", "Actions"]}
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
            <TextField
              label="Answer"
              placeholder="Enter the answer"
              value={newFaq.answer}
              onChange={handleInputChange("answer")}
              autoComplete="off"
              multiline
            />
          </Modal.Section>
        </Modal>
      </Layout>
    </Page>
  );
};

export default FAQ;
