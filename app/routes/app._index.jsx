import { Modal, TextField } from "@shopify/polaris";
import { useState } from "react";
import { authenticate } from "../shopify.server";
import { useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";
import { MasterDB } from "../Backend/src/models/MasterDB.model.js";
import connectDB from "./database/connect.js";

export const loader = async ({ request }) => {
  try {
    const { admin, session } = await authenticate.admin(request);
    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("✅ Session Found:", session);
    return json({ success: true });
  } catch (error) {
    console.error("❌ Loader Error:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};


export const action = async ({ request }) => {
  await connectDB(); // Ensure DB is connected

  try {
    const { session } = await authenticate.admin(request);
    const formData = await request.formData();
    const email = formData.get("email");

    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!email) {
      return json({ error: "Email is required" }, { status: 400 });
    }

    let store = await MasterDB.findOne({ shopifyDomain: session.shop });

    if (!store) {
      store = new MasterDB({
        storeName: session.shop.split(".")[0],
        shopifyDomain: session.shop,
        storeId: session.id,
        email,
        installedAt: new Date(),
        isActive: true,
        plan: "free",
      });
    } else {
      store.email = email;
    }

    await store.save();
    return json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return json({ error: "Database operation failed" }, { status: 500 });
  }
};


export default function Index() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const fetcher = useFetcher();

  return (
    showPopup && (
      <Modal open={showPopup} onClose={() => setShowPopup(false)}>
        <Modal.Section>
          <div style={modalStyles.container}>
            <h2>
              <b>We Need Your Email to Continue</b>
            </h2>
            <p style={modalStyles.text}>
              Enter your email to receive updates and manage your FAQs more
              effectively.
            </p>
            <div style={modalStyles.inputContainer}>
              <TextField
                label="Email Address"
                value={email}
                onChange={(value) => setEmail(value)}
                autoComplete="email"
              />
              <button
                style={modalStyles.button}
                onClick={() => {
                  if (email) {
                    fetcher.submit({ email }, { method: "post" });
                    setShowPopup(false);
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal.Section>
      </Modal>
    )
  );
}

const modalStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
    gap: "15px",
  },
  text: {
    fontSize: "16px",
    color: "#333",
    maxWidth: "400px",
    lineHeight: "1.6",
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "18px",
    backgroundColor: "#000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
};
