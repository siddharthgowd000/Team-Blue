# RELIEF: AI/ML Medical Diagnosis System

![RELIEF Logo](path-to-your-logo.png)

RELIEF is an AI/ML-powered medical diagnosis system capable of detecting brain tumors, lung cancer, and breast cancer. It generates prescriptions automatically and allows users to schedule appointments with doctors, chat, and make video call conferences. It also saves users' history and previous consultations.

## Features

- **Medical Diagnosis**: Detect brain tumors, lung cancer, and breast cancer using AI/ML.
- **Prescription Generation**: Automatically generates prescriptions based on diagnosis.
- **Appointments**: Schedule appointments with doctors based on availability, time, date, and nearby locations.
- **Communication**: Chat and video call functionality with doctors.
- **User History**: Saves users' history and previous consultations.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Socket.io
- **Backend**: Node.js, Flask, Socket.io, Cloudflared, ML, Python
- **Machine Learning**: Trained model with 8000 images from datasets collected from Kaggle and other resources.

## Installation

To get started with the RELIEF project, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Python

### Step-by-Step Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/relief.git
   cd relief
2. **Install frontend dependencies:**

```bash
npm install
3.  **Start the React frontend:**

```bash
npm start
4.  **Navigate to the backend directory and install Python dependencies:**

```bash
cd backend
pip install -r requirements.txt
5.  **Run the backend server:**

```bash

flask run

