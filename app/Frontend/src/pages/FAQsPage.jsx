import React, { useState } from "react";
import { Page, Layout, Card, Button, TextField, Text } from "@shopify/polaris";

const FAQsPage = () => {
  const [faqs, setFaqs] = useState([
    { id: 1, question: "What is your return policy?", answer: "30 days refund guarantee." },
    { id: 2, question: "Do you ship internationally?", answer: "Yes, we do." },
  ]);

  return (
    <Page title="FAQ Management" subtitle="Create, Edit, and Manage FAQs">
      <Layout>
        <Layout.Section>
          {faqs.map((faq) => (
            <Card key={faq.id} title={faq.question} sectioned>
              <Text>{faq.answer}</Text>
              <Button destructive onClick={() => alert("Delete Functionality Coming Soon!")}>
                Delete FAQ
              </Button>
            </Card>
          ))}
          <Card sectioned>
            <TextField label="Question" placeholder="Enter your FAQ question" />
            <TextField label="Answer" placeholder="Enter your FAQ answer" />
            <Button primary onClick={() => alert("Add FAQ Functionality Coming Soon!")}>
              Add FAQ
            </Button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default FAQsPage;
