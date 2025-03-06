import React from "react";
import { Page, Layout, Card, Button, Text } from "@shopify/polaris";

const CustomerDashboard = () => {
  // Sample stats data
  const stats = {
    totalCustomers: 120,
    activeSubscriptions: 85,
    pendingTickets: 5,
    appUsageHours: 340,
  };

  // Sample customer data. In a real-world scenario, you might fetch this data from an API.
  const customers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      subscription: "Premium",
      lastLogin: "2025-01-20",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      subscription: "Standard",
      lastLogin: "2025-01-18",
      status: "Active",
    },
    {
      id: 3,
      name: "Charlie Davis",
      email: "charlie@example.com",
      subscription: "Trial",
      lastLogin: "2025-01-15",
      status: "Inactive",
    },
    // Add more customer objects as needed
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "RGBA(235,235,235,1)",
        padding: "20px",
      }}
    >
      <Page title="Customer Data Dashboard" subtitle="Overview of Your App Users">
        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <Button
            primary
            onClick={() => (window.location.href = "/manage-account")}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Manage Account
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
                Welcome to the Customer Dashboard
              </Text>
              <p
                style={{
                  margin: "10px 0",
                  fontSize: "14px",
                  lineHeight: "1.8",
                }}
              >
                Here you can get a quick overview of your application's users, their subscription plans, and recent activity.
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
                  { title: "Total Customers", value: stats.totalCustomers },
                  { title: "Active Subscriptions", value: stats.activeSubscriptions },
                  { title: "Pending Tickets", value: stats.pendingTickets },
                  { title: "App Usage Hours", value: stats.appUsageHours },
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
                    <div style={{ fontSize: "24px", marginTop: "15px" }}>{stat.value}</div>
                  </Card>
                ))}
              </div>
            </Card>
          </Layout.Section>

          {/* Customers Data Section */}
          <Layout.Section>
            <Card title="Customer Details" sectioned>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                {customers.map((customer) => (
                  <Card
                    sectioned
                    key={customer.id}
                    style={{
                      backgroundColor: "RGBA(48,48,48,1)",
                      color: "white",
                      borderRadius: "8px",
                    }}
                  >
                    <Text as="h3" variant="headingMd" style={{ marginBottom: "10px" }}>
                      {customer.name}
                    </Text>
                    <p>Email: {customer.email}</p>
                    <p>Subscription: {customer.subscription}</p>
                    <p>Last Login: {customer.lastLogin}</p>
                    <p>Status: {customer.status}</p>
                    <Button
                      fullWidth
                      primary
                      onClick={() => window.location.href = `/customer/${customer.id}`}
                      style={{ marginTop: "10px" }}
                    >
                      View Profile
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </Layout.Section>

          {/* Engagement Tips Section */}
          <Layout.Section>
            <Card title="Engagement Tips" sectioned>
              <Text variant="headingMd" style={{ marginBottom: "10px" }}>
                Tips for engaging with your users:
              </Text>
              <ul>
                <li>Monitor active subscriptions to target the right users.</li>
                <li>Reach out to customers with pending support tickets.</li>
                <li>Offer promotions to re-engage inactive users.</li>
                <li>Analyze app usage trends to inform feature updates.</li>
              </ul>
            </Card>
          </Layout.Section>

          {/* Additional Resources Section */}
          <Layout.Section>
            <Card title="Additional Resources" sectioned>
              <Text variant="headingMd" style={{ marginBottom: "10px" }}>
                Learn more about customer engagement:
              </Text>
              <ul>
                <li>Customer Engagement Strategies</li>
                <li>Usage Analytics Reports</li>
                <li>Support Management Tips</li>
                <li>Feature Request Reviews</li>
              </ul>
              <Button primary fullWidth onClick={() => window.location.href = "/resources"}>
                Learn More
              </Button>
            </Card>
          </Layout.Section>
          
        </Layout>
      </Page>
    </div>
  );
};

export default CustomerDashboard;
