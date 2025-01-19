import React from "react";
import { Page, Layout, Card, Text } from "@shopify/polaris";

const RatingsPage = () => {
  const ratings = [
    { id: 1, question: "What is your return policy?", rating: 4.5 },
    { id: 2, question: "Do you ship internationally?", rating: 3.8 },
  ];

  return (
    <Page title="Ratings" subtitle="View Customer Feedback">
      <Layout>
        <Layout.Section>
          {ratings.map((item) => (
            <Card key={item.id} title={item.question} sectioned>
              <Text>Rating: {item.rating} / 5</Text>
            </Card>
          ))}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default RatingsPage;
