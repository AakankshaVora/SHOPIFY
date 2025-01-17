import { useState } from "react";
import { Page, Card, TextField, Button } from "@shopify/polaris";

export default function Index() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Question:", question);
    console.log("Answer:", answer);
  };

  return (
    <Page title="Create FAQ">
      <Card sectioned>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Question"
            placeholder="Enter your question"
            value={question}
            onChange={(value) => setQuestion(value)}
            autoComplete="off"
            multiline
          />
          <TextField
            label="Answer"
            placeholder="Enter your answer"
            value={answer}
            onChange={(value) => setAnswer(value)}
            autoComplete="off"
            multiline
          />
          <Button submit primary>
            Submit
          </Button>
        </form>
      </Card>
    </Page>
  );
}
