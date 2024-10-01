# Gemini Quizzify Frontend

**Gemini Quizzify Frontend** is a web application that provides users with the ability to take quizzes based on six different question types. It supports **Multiple Choice**, **True/False**, **Open/Ended**, **Relate Concepts**, **Fill in the Blank**, and **Math** questions. The frontend is designed using modern technologies, ensuring a responsive and user-friendly experience. This project is built using **NextJS** with **ShadCN**, and integrates several libraries for data fetching, form validation, and user notifications.

Developed by **Wilfredo Aaron Sosa Ramos**, this frontend project interacts with the **Gemini Quizzify API** to generate dynamic quizzes and is deployed on **Vercel**.

## Table of Contents

- [1. Features](#1-features)
- [2. Supported Question Types](#2-supported-question-types)
- [3. Technologies Used](#3-technologies-used)
- [4. Multimodal Capabilities](#4-multimodal-capabilities)
- [5. Environment Variables](#5-environment-variables)
- [6. Installation Guide](#6-installation-guide)
- [7. How to Use](#7-how-to-use)

---

## 1. Features

**Gemini Quizzify Frontend** offers a wide array of features for delivering quizzes in an intuitive and engaging way:

- **Six Question Types**: Supports Multiple Choice, True/False, Open/Ended, Relate Concepts, Fill in the Blank, and Math questions.
- **Integration with API**: Seamlessly fetches quizzes from the **Gemini Quizzify API** via **axios** and displays them to the user in real-time.
- **Multimodal Support**: Capable of rendering quizzes based on data from more than 16 file types, such as PDFs, Word documents, Excel sheets, images, and YouTube videos.
- **Form Validation**: Utilizes **zod** and **react-hook-form** for form handling and input validation.
- **Responsive Design**: Built with **ShadCN** and **TailwindCSS** for a clean, responsive UI that works well on any device.
- **User Notifications**: Provides real-time feedback to users with **react-toastify**, including success and error notifications.

---

## 2. Supported Question Types

The **Gemini Quizzify Frontend** supports the following six question types, ensuring a comprehensive quiz experience:

- **Multiple Choice**: Presents multiple options, where users must select one correct answer.
- **True/False**: Allows users to decide if a statement is true or false.
- **Open/Ended**: Provides an open text field where users can submit their answer.
- **Relate Concepts**: Allows users to match concepts or items from two lists, showing their understanding of relationships.
- **Fill in the Blank**: Users must complete a sentence or paragraph by filling in the missing words.
- **Math**: Presents mathematical questions where users must solve problems or complete equations.

Each question type is dynamically rendered, ensuring that the user experience is seamless across different quiz formats.

---

## 3. Technologies Used

This frontend project leverages modern web development technologies to ensure performance, scalability, and maintainability. Below are the core technologies used:

- **NextJS**: A React framework for server-side rendering and static site generation, providing fast performance and SEO optimization.
- **ShadCN**: A design system that integrates with **TailwindCSS**, providing reusable and scalable UI components.
- **axios**: A promise-based HTTP client used to handle communication with the **Gemini Quizzify API**.
- **react-markdown**: Used to render Markdown-based content in the application, enhancing the display of text-based quizzes.
- **zod**: A schema-based validation library used with **react-hook-form** for validating user input in quizzes.
- **react-hook-form**: Simplifies form management in React and integrates with **@hookform/resolvers** for easy validation.
- **react-toastify**: Provides customizable notifications for real-time user feedback during quiz submission or error handling.

---

## 4. Multimodal Capabilities

The **Gemini Quizzify Frontend** is designed to handle a wide range of file types, making it a truly multimodal platform. Supported file types include:

- **Text Files**: PDF, TXT, Word documents (DOCX), and Markdown (MD).
- **Spreadsheets**: Excel files (XLS, XLSX), Google Sheets.
- **Images**: PNG, JPG, JPEG, and other common image formats.
- **Video**: YouTube URLs and video files.

This allows the platform to pull quiz content from various sources, including documents, spreadsheets, images, and video materials, providing users with a rich, diverse quiz experience.

---

## 5. Environment Variables

This project uses a single environment variable for API interaction:

- **NEXT_PUBLIC_API_BASE_URL**: This is the base URL for the **Gemini Quizzify API**. It is used to make API requests from the frontend. Ensure this variable is set in your environment before running the project.

Example of the `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.geminiquizzify.com
```


---

## 6. Installation Guide

Follow the steps below to set up and run the **Gemini Quizzify Frontend** locally.

1. **Clone the repository**:
   - Download the repository to your local machine:
     ```
     git clone https://github.com/yourusername/GeminiQuizzifyFrontend.git
     ```

2. **Navigate to the project directory**:
   - Move into the cloned directory:
     ```
     cd GeminiQuizzifyFrontend
     ```

3. **Install dependencies**:
   - Install the required dependencies using npm or yarn:
     ```
     npm install
     ```

4. **Set up environment variables**:
   - Create a `.env.local` file in the root of the project and set the `NEXT_PUBLIC_API_BASE_URL` variable:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://api.geminiquizzify.com
     ```

5. **Run the development server**:
   - Start the NextJS development server:
     ```
     npm run dev
     ```

6. **Build for production**:
   - To build the application for production, use:
     ```
     npm run build
     ```

7. **Deployment**:
   - The project is deployed on **Vercel**. To deploy your own version, you can push the code to a repository connected with Vercel, or follow the Vercel deployment instructions on their platform.

---

## 7. How to Use

Once you’ve set up the project locally or accessed it through the live deployment, users can start interacting with the quizzes:

1. **Accessing Quizzes**: Users can navigate to different quiz categories and select a quiz to begin.
2. **Answer Submission**: Upon answering each question, the responses are validated using **zod** and **react-hook-form**. Upon submission, **axios** sends the answers to the backend API.
3. **Feedback**: After submitting, users receive feedback via **react-toastify** notifications, which display success or error messages depending on the API response.
4. **Multimodal Content**: Users can engage with quizzes that include content from various formats like PDFs, Word documents, images, and YouTube videos.
