import { Modal, TextField, Toast, Frame } from "@shopify/polaris";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function EmailModal() {
  const [showPopup, setShowPopup] = useState(true);
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    if (email) {
      console.log("Submitted Email:", email);
      setShowPopup(false);
      setShowToast(true);

      // Wait 2 seconds before redirecting
      setTimeout(() => {
        setShowToast(false);
        setRedirect(true);
      }, 2000);
    }
  };

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <Frame>
      {showPopup && (
        <Modal open={showPopup} onClose={() => setShowPopup(false)}>
          <Modal.Section>
            <div style={modalStyles.container}>
              <h2>
                <b>We Need Your Email to Continue</b>
              </h2>
              <p style={modalStyles.text}>
                Enter your email to receive updates and manage your FAQs more effectively.
              </p>
              <div style={modalStyles.inputContainer}>
                <TextField
                  label="Email Address"
                  value={email}
                  onChange={(value) => setEmail(value)}
                  autoComplete="email"
                />
                <button style={modalStyles.button} onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </Modal.Section>
        </Modal>
      )}

      {/* Green Toast Message */}
      {showToast && (
        <Toast content="Email updated successfully!" onDismiss={() => setShowToast(false)}
        />
      )}
    </Frame>
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
