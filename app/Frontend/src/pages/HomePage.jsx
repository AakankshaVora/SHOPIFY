import React from "react";
import { Page, Layout, Card, Button, Text } from "@shopify/polaris";

const HomePage = () => {
  const stats = {
    totalCategories: 5,
    totalFAQs: 20,
    averageRating: 4.5,
    faqViews: 350,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "RGBA(235,235,235,1)",
        padding: "20px",
      }}
    >
      <Page title="FAQ Generator Dashboard" subtitle="Manage Your Store's FAQs">
        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <Button primary onClick={() => (window.location.href = "/change-email")} style={{ backgroundColor: "black", color: "white" }}>
            Change Business Email
          </Button>
        </div>

        <Layout>
          {/* Welcome Section */}
          <Layout.Section>
            <Card
              sectioned
              style={{
                backgroundColor: "RGBA(48,48,48,1)",
                color: "white",
                borderRadius: "8px",
              }}
            >
              <Text as="h2" variant="headingLg" style={{ color: "white" }}>
                Welcome to the FAQ Manager
              </Text>
              <p
                style={{
                  margin: "10px 0",
                  fontSize: "14px",
                  lineHeight: "1.8",
                }}
              >
                This dashboard helps you manage your categories, FAQs, and customer ratings efficiently.
              </p>
            </Card>
          </Layout.Section>

          {/* Stats Section */}
          <Layout.Section>
            <Card title="Dashboard Stats" sectioned>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "20px",
                }}
              >
                {[ 
                  { title: "Total Categories", value: stats.totalCategories },
                  { title: "Total FAQs", value: stats.totalFAQs },
                  { title: "Average Rating", value: `${stats.averageRating} / 5` },
                  { title: "FAQ Views", value: stats.faqViews },
                ].map((stat, index) => (
                  <Card
                    sectioned
                    key={index}
                    style={{
                      backgroundColor: "RGBA(48,48,48,1)",
                      color: "RGBA(235,235,235,1)",
                      borderRadius: "8px",
                      textAlign: "center",
                      paddingBottom: "20px",
                    }}
                  >
                    <Text
                      as="h3"
                      variant="headingMd"
                      style={{
                        color: "RGBA(235,235,235,1)",
                        marginBottom: "10px",
                      }}
                    >
                      {stat.title}
                    </Text>
                    <div style={{ fontSize: "24px", marginTop: "15px" }}></div>
                    <Button
                      fullWidth
                      primary
                      style={{
                        height: "50px",
                        fontSize: "20px",
                        marginTop: "20px",
                      }}
                    >
                      {stat.value}
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </Layout.Section>

          {/* Navigation Section */}
          <Layout.Section>
            <Card title="Manage Your FAQs" sectioned>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "20px",
                }}
              >
                <Card
                  title="Category Management"
                  sectioned
                  style={{
                    backgroundColor: "RGBA(48,48,48,1)",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ marginBottom: "10px" }}>
                    Organize your FAQs into categories for easier navigation.
                  </p>
                  <Button
                    primary
                    fullWidth
                    onClick={() => (window.location.href = "/categories")}
                  >
                    Manage Categories
                  </Button>
                </Card>

                <Card
                  title="FAQ Management"
                  sectioned
                  style={{
                    backgroundColor: "RGBA(48,48,48,1)",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ marginBottom: "10px" }}>
                    Create, edit, and delete FAQs to assist your customers.
                  </p>
                  <Button
                    primary
                    fullWidth
                    onClick={() => (window.location.href = "/faqs")}
                  >
                    Manage FAQs
                  </Button>
                </Card>
              </div>
            </Card>
          </Layout.Section>

          {/* How You Can Manage FAQs Section */}
          <Layout.Section>
            <Card title="How You Can Manage Your FAQs" sectioned>
              <Text variant="headingMd" style={{ marginBottom: "10px" }}>
                Here's how you can manage your FAQs effectively:
              </Text>
              <ul>
                <li>Organize FAQs by categories for a cleaner, more intuitive FAQ page.</li>
                <li>Edit and update answers quickly to ensure customers always have the latest info.</li>
                <li>Track views and ratings to identify which FAQs are most helpful to your customers.</li>
                <li>Create new FAQs easily with pre-designed templates.</li>
              </ul>
            </Card>
          </Layout.Section>

          {/* How We Can Manage Your Store Section */}
          <Layout.Section>
            <Card title="How We Can Manage Your Store" sectioned>
              <Text variant="headingMd" style={{ marginBottom: "10px" }}>
                We help streamline your store management by:
              </Text>
              <ul>
                <li>Organizing and updating your store's FAQ section for better customer experience.</li>
                <li>Improving search and categorization for faster customer support resolution.</li>
                <li>Providing analytics to monitor FAQ engagement and uncover customer needs.</li>
                <li>Enhancing customer satisfaction with easy-to-find solutions and FAQs.</li>
              </ul>
            </Card>
          </Layout.Section>
          
        </Layout>
      </Page>
    </div>
  );
};

export default HomePage;
