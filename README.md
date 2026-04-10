# AcelAcademy

## Introduction

**AcelAcademy** is an interactive educational platform designed to help students master complex subjects. Powered by the Gemini AI, our tutor, **Acel**, moves away from providing "easy answers." Instead, it guides users through logical inquiry, analogies, and incremental hints, fostering deeper conceptual understanding and independent problem-solving.

---

## Key Features

- **Socratic AI Tutor**: Integrated with the Google Gemini 2.0 Flash engine, the system acts as a persistent mentor that challenges students to think critically rather than spoon-feeding solutions.
- **Rich Material Rendering**: Native support for **Markdown** and **LaTeX**, ensuring that complex mathematical expressions like $\frac{d}{dx}x^n = nx^{n-1}$ are rendered with professional-grade clarity.
- **Smart Selection Chat**: A highlight-to-ask feature allows students to select specific, confusing text within a module to trigger a contextualized AI discussion.
- **Adaptive AI Quiz Generator**: A "Challenge Me" feature that generates dynamic quizzes based on the current module's content to verify the user's comprehension.

---

## Tech Stack

### **Backend**

- **Framework**: [NestJS](https://nestjs.com/) (Node.js) — _Chosen for its robust, modular architecture._
- **ORM**: [Prisma](https://www.prisma.io/) — _Ensuring type-safe database interactions._
- **Database**: MySQL — _Scalable relational data storage._
- **AI Engine**: [Google Gemini AI SDK](https://ai.google.dev/) — _Cutting-edge Large Language Model integration._
- **Authentication**: JWT (JSON Web Token) with Passport.js.

### **Frontend**

- **Library**: [React.js](https://reactjs.org/) with [Vite](https://vitejs.dev/) — _Fast, modern component-based development._
- **Markdown Support**: ReactMarkdown, RemarkMath, and RehypeKatex.

---

## Project Structure

```text
ureeka-project/
├── backend/            # NestJS API, Prisma Schema, & AI Logic
├── frontend/           # React App & UI Components
└── README.md           # Documentation
```

---

## Installation & Setup

### **1. Prerequisites**

- Node.js (v18.x or higher)
- MySQL Instance
- Gemini API Key (Obtain from [Google AI Studio](https://aistudio.google.com/))

### **2. Backend Setup**

```bash
cd backend
npm install
npx prisma generate
# Create a .env file with:
# DATABASE_URL, JWT_SECRET, GEMINI_API_KEY, PORT (see env.example)
npm run start:dev
```

### **3. Frontend Setup**

```bash
cd frontend
npm install
# Create a .env file with:
# VITE_API_URL="http://localhost:3000"
npm run dev
```

---

## The Socratic Logic

The core intelligence of AcelAcademy lies in its **Context-Injection** layer. Every user query is bundled with the specific module content and passed through a specialized "Socratic System Prompt" that enforces three non-negotiable rules:

1.  **Never provide direct answers.**
2.  **Use analogies** to simplify abstract concepts.
3.  **Always reply with LaTeX** for mathematical symbols to maintain educational standards.

---

## Deployment

This project is deployment-ready:

- **Frontend & Backend**: Hosted on [Railway](https://acel-academy.up.railway.app/).
- **Database**: Hosted on [TiDB](https://www.pingcap.com/).

---

## Contribution

This project was developed to revolutionize how students engage with hard concept subjects. Feedback, bug reports, and pull requests are welcome as we strive to make education more interactive and accessible.

---
