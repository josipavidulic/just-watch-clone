# Just Watch Clone - README

## Introduction

This is a guide to help you run the Just Watch Clone application locally on your machine. You can either run it directly on your local environment or use Docker for containerized deployment.

## Prerequisites

Ensure you have the following installed on your machine:

- Git
- Node.js and npm (for local setup)
- Docker and Docker Compose (for Docker setup)

## Running the Application Locally

### Step 1: Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone git@github.com:josipavidulic/just-watch-clone.git
```

### Step 2: Navigate to the Prject Directory

Change to the cloned respository directory:

```bash
cd just-watch-clone
```

### Step 3: Install Dependencies

Install the necessary dependencies:

```bash
npm install
```

### Step 4: Run the Application in Development

Run the application by running:

```bash
npm run dev
```

### Step 5: Access the Application

Open your web browser and go to:

```bash
http://localhost:3000/

```

### Step 6: Stop the Application

To stop the application, you can simply press Ctrl + C in the terminal where the application is running.

## Running the Application with Docker

### Step 1: Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone git@github.com:josipavidulic/just-watch-clone.git
```

### Step 2: Navigate to the Prject Directory

Change to the cloned respository directory:

```bash
cd just-watch-clone
```

### Step 3: Build the Docker Image

Build the Docker image by running:

```bash
docker build -t just-watch-clone .
```

### Step 4: Deploy the Application

Deploy the application using Docker Compose:

```bash
docker compose up -d
```

### Step 5: Access the Application

Open your web browser and go to:

```bash
http://localhost:3000/
```

### Step 6: Stop the Container

To stop the Docker container, run:

```bash
docker compose stop
```
