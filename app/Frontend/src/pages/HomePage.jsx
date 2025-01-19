// src/pages/HomePage.jsx
import React from "react";
import { Page, Layout, Card, Button, Text } from "@shopify/polaris";

const HomePage = () => {
  return (
    <Page title="FAQ Generator Dashboard" subtitle="Manage Your Store's FAQs">
      <Layout>
        {/* Welcome Section */}
        <Layout.Section>
          <Card sectioned>
            <Text as="h2" variant="headingLg">
              Welcome to the FAQ Manager
            </Text>
            <div>
              <p>
                This dashboard helps you manage your categories, FAQs, and
                customer ratings efficiently.
              </p>
              <p>Use the options below to get started.</p>
            </div>
          </Card>
        </Layout.Section>

        {/* Cards Section */}
        <Layout.Section>
          <div style={{ display: "flex", gap: "16px", justifyContent: "space-between" }}>
            {/* Card 1: Category Management */}
            <Card title="Category Management" sectioned>
              <div>
                <p>Organize your FAQs into categories for easier navigation.</p>
              </div>
              <Button
                primary
                fullWidth
                onClick={() => (window.location.href = "/categories")}
              >
                Manage Categories
              </Button>
            </Card>

            {/* Card 2: FAQ Management */}
            <Card title="FAQ Management" sectioned>
              <div>
                <p>Create, edit, and delete FAQs to assist your customers.</p>
              </div>
              <Button
                primary
                fullWidth
                onClick={() => (window.location.href = "/faqs")}
              >
                Manage FAQs
              </Button>
            </Card>

            {/* Card 3: View Ratings */}
            <Card title="View Ratings" sectioned>
              <div>
                <p>Check customer feedback and ratings for your FAQs.</p>
              </div>
              <Button
                primary
                fullWidth
                onClick={() => (window.location.href = "/ratings")}
              >
                View Ratings
              </Button>
            </Card>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default HomePage;