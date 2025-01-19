import React from "react";
import { Page, Layout, Card, Button, Text, Badge } from "@shopify/polaris";

const HomePage = () => {
  return (
    <Page title="FAQ Generator Dashboard" subtitle="Overview and Quick Actions">
      <Layout>
        {/* Welcome Section */}
        <Layout.Section>
          <Card sectioned>
            <Text as="h1" variant="headingLg">
              Welcome to the FAQ Manager
            </Text>
            <p>Here you can manage your categories, FAQs, and customer ratings.</p>
            <p>Use the quick actions below to navigate to specific sections.</p>
          </Card>
        </Layout.Section>

        {/* Categories Section */}
        <Layout.Section oneThird>
          <Card title="Categories" sectioned>
            <p>Manage your FAQ categories to keep things organized.</p>
            <Badge status="info">5 Categories</Badge>
            <Button
              primary
              fullWidth
              onClick={() => (window.location.href = "/categories")}
            >
              Manage Categories
            </Button>
          </Card>
        </Layout.Section>

        {/* FAQs Section */}
        <Layout.Section oneThird>
          <Card title="FAQs" sectioned>
            <p>View, edit, and create FAQs for your customers.</p>
            <Badge status="success">25 FAQs</Badge>
            <Button
              primary
              fullWidth
              onClick={() => (window.location.href = "/faqs")}
            >
              Manage FAQs
            </Button>
          </Card>
        </Layout.Section>

        {/* Ratings Section */}
        <Layout.Section oneThird>
          <Card title="Ratings" sectioned>
            <p>View customer feedback and ratings for your FAQs.</p>
            <Badge status="attention">12 Ratings</Badge>
            <Button
              primary
              fullWidth
              onClick={() => (window.location.href = "/ratings")}
            >
              View Ratings
            </Button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default HomePage;
