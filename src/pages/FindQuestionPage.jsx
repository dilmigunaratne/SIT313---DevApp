// src/pages/FindQuestion.jsx
import React, { useState } from "react";
import {
  Card,
  Input,
  Dropdown,
  Button,
  Form,
  TextArea,
} from "semantic-ui-react";

const tagOptions = [
  { key: "react", text: "React", value: "React" },
  { key: "js", text: "JavaScript", value: "JavaScript" },
  { key: "css", text: "CSS", value: "CSS" },
  { key: "html", text: "HTML", value: "HTML" },
];

export default function FindQuestion() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How to center a div?",
      description: "I am struggling to center a div in CSS. Any suggestions?",
      tag: "CSS",
      date: "2025-09-01",
      expanded: false,
    },
    {
      id: 2,
      title: "React state not updating",
      description: "Why does my state update but not re-render?",
      tag: "React",
      date: "2025-09-10",
      expanded: false,
    },
  ]);

  const [filters, setFilters] = useState({ text: "", tag: "", date: "" });
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    tag: "",
  });

  // --- Handlers ---
  const toggleExpand = (id) =>
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, expanded: !q.expanded } : q
      )
    );

  const deleteQuestion = (id) =>
    setQuestions((prev) => prev.filter((q) => q.id !== id));

  const addQuestion = () => {
    if (!newQuestion.title || !newQuestion.description || !newQuestion.tag)
      return;

    const newQ = {
      id: Date.now(),
      title: newQuestion.title,
      description: newQuestion.description,
      tag: newQuestion.tag,
      date: new Date().toISOString().split("T")[0],
      expanded: false,
    };
    setQuestions((prev) => [newQ, ...prev]);
    setNewQuestion({ title: "", description: "", tag: "" });
  };

  // --- Filter logic ---
  const filtered = questions.filter((q) => {
    const textOk = q.title
      .toLowerCase()
      .includes(filters.text.toLowerCase());
    const tagOk = filters.tag ? q.tag === filters.tag : true;
    const dateOk = filters.date ? q.date === filters.date : true;
    return textOk && tagOk && dateOk;
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Got a Question? Ask Us</h1>

      {/* --- Filters --- */}
      <div style={{ marginBottom: "1rem" }}>
        <Input
          icon="search"
          placeholder="Search by title..."
          value={filters.text}
          onChange={(e) =>
            setFilters((f) => ({ ...f, text: e.target.value }))
          }
          style={{ marginRight: "1rem" }}
        />
        <Dropdown
          placeholder="Filter by tag"
          selection
          clearable
          options={tagOptions}
          value={filters.tag}
          onChange={(e, { value }) =>
            setFilters((f) => ({ ...f, tag: value }))
          }
          style={{ marginRight: "1rem" }}
        />
        <Input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters((f) => ({ ...f, date: e.target.value }))
          }
        />
      </div>

      {/* --- Add new question --- */}
      <Card fluid style={{ padding: "1rem", marginBottom: "2rem" }}>
        <h3>Add New Question</h3>
        <Form>
          <Form.Input
            label="Title"
            value={newQuestion.title}
            onChange={(e) =>
              setNewQuestion((q) => ({ ...q, title: e.target.value }))
            }
          />
          <Form.Field
            control={TextArea}
            label="Description"
            value={newQuestion.description}
            onChange={(e) =>
              setNewQuestion((q) => ({ ...q, description: e.target.value }))
            }
          />
          <Form.Select
            label="Tag"
            options={tagOptions}
            value={newQuestion.tag}
            placeholder="Select Tag"
            onChange={(e, { value }) =>
              setNewQuestion((q) => ({ ...q, tag: value }))
            }
          />
          <Button
            primary
            type="button"
            onClick={addQuestion}
            style={{ marginTop: "0.5rem" }}
          >
            Add Question
          </Button>
        </Form>
      </Card>

      {/* --- List of questions --- */}
      <Card.Group>
        {filtered.map((q) => (
          <Card key={q.id} fluid>
            <Card.Content onClick={() => toggleExpand(q.id)}>
              <Card.Header>{q.title}</Card.Header>
              <Card.Meta>
                {q.tag} &nbsp;|&nbsp; {q.date}
              </Card.Meta>
              <Card.Description>
                {q.expanded ? q.description : q.description.slice(0, 50) + "..."}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                size="tiny"
                negative
                onClick={() => deleteQuestion(q.id)}
              >
                Delete
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
