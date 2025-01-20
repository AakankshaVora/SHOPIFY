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
                  color: "RGBA()",
                }}
              >
                This dashboard helps you manage your categories, FAQs, and
                customer ratings efficiently. Use the options below to get started.
              </p>
            </Card>
          </Layout.Section>

          {/* Stats Section */}
          <Layout.Section>
            <Card title="Dashboard Stats" sectioned>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
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
                      style={{ color: "RGBA(235,235,235,1)", marginBottom: "10px" }}
                    >
                      {stat.title}
                    </Text>
                    <Button
                      fullWidth
                      primary
                      style={{
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
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
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  height: "auto",
                }}
              >
                <Card
                  title="Category Management"
                  sectioned
                  style={{
                    backgroundColor: "RGBA(48,48,48,1)",
                    color: "RGBA(235,235,235,1)",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      marginBottom: "10px",
                      color: "RGBA(48,48,48,1)",
                    }}
                  >
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
                    color: "RGBA(235,235,235,1)",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      marginBottom: "10px",
                      color: "RGBA(48,48,48,1)",
                    }}
                  >
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
        </Layout>
      </Page>
    </div>
  );
};

export default HomePage;


