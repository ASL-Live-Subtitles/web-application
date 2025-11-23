# ASL Pipeline UI

A static web interface for the ASL (American Sign Language) pipeline that converts glosses and letters into sentences with sentiment analysis.

## Overview

This initial version of frontend application provides a user-friendly interface to interact with the ASL pipeline backend. Users can input ASL glosses, letters, and context to receive generated sentences with sentiment analysis.

## Features

- **Input Form**: Text inputs for ASL glosses, letters, and context
- **Real-time Processing**: Connects to backend ASL pipeline
- **Sentiment Analysis**: Displays both the generated sentence and its sentiment
- **Responsive Design**: Clean, mobile-friendly interface

## Development

### Prerequisites

- Node.js 18+
- npm

### Installation & Build

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Frontend Deployment (Google Cloud Storage)

#### 1. Build the Project
```bash
# Install dependencies (if not already done)
npm install

# Build for production - compiles TypeScript to JavaScript
npm run build
```

#### 2. Deploy to Cloud Storage
```bash
# Create a storage bucket
gsutil mb gs://signtalk

# Upload all built files to the bucket
gsutil -m cp -r dist/* gs://signtalk/

# Configure website hosting
gsutil web set -m index.html -e index.html gs://signtalk

# Set public access permissions
gsutil iam ch allUsers:objectViewer gs://signtalk
```

### Backend Deployment (Google Cloud Run)

#### Why HTTPS is Mandatory

- Frontend hosted on `https://storage.googleapis.com` requires backend to also use HTTPS
- Browsers block HTTP requests from HTTPS pages (mixed content policy)
- CORS preflight requests fail over HTTP from HTTPS origins
- Essential for production-grade application security

#### CORS Configuration (FastAPI)

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4173",
        "http://localhost:5173", 
        "https://storage.googleapis.com",
        "https://storage.googleapis.com/signtalk",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=3600,
)
@app.options("/{rest_of_path:path}")

async def preflight_handler(rest_of_path: str):
    return {"message": "ok"}
```

<img width="858" height="613" alt="Screenshot 2025-11-23 at 5 37 34 PM" src="https://github.com/user-attachments/assets/0f00574f-b0ce-4e3c-9a75-4a6e01ce8953" />
