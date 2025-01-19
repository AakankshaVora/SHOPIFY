import { json } from "@remix-run/node";

export async function loader() {
  return json({ message: "Serving static Home page from Vite frontend" });
}

export default function FAQ() {
  return (
    <iframe
      src={`http://localhost:5173`} // Replace with your Vite build's Home page path
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
      title="Home Page"
    />
  );
}