# Parentül

Parentül is a mobile-optimized application designed to provide real-time parenting advice, primarily targeting foster and adoptive parents, as well as parents in need of additional support. The app utilizes generative AI to offer evidence-based recommendations and employs a choose-your-own-adventure style to engage users.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

## Features

1. **AI-Powered Chat Interface**: 
   - Real-time interaction with an AI assistant trained on parenting advice
   - Natural language processing for understanding user queries
   - Evidence-based recommendations tailored to specific parenting challenges

2. **User Authentication**: 
   - Secure login and registration system
   - Google OAuth integration for easy sign-up and login

3. **User Profile Management**:
   - Ability to create and edit family profiles
   - Add and manage information about children

4. **Customized Advice**:
   - Tailored recommendations based on the age and specific needs of each child
   - Separate advice tracks for parents of children with and without diagnosed neurological disorders or trauma-related behaviors

5. **Chat History and Feedback**:
   - Logging of chat interactions for future reference
   - Ability to review past conversations
   - Option to provide feedback on the helpfulness of advice

6. **Mobile-Optimized Design**:
   - Responsive interface for seamless use on various devices
   - Optimized for mobile use with touch-friendly controls

7. **Follow-up System**:
   - Scheduled follow-ups to check on the effectiveness of provided advice
   - Option for email, SMS, or in-app notifications

## Technologies Used

- Frontend:
  - React
  - Redux
  - Redux-Saga
  - Axios
  - Socket.io-client
- Backend:
  - Node.js
  - Express
  - PostgreSQL
  - Socket.io
  - Natural (NLP library)
  - Twillio

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/parentul.git
   cd parentul
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory
   - Add the following variables:
     ```
     DATABASE_URL=postgresql://username:password@localhost:5432/parentul
   
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     ```

4. Start the backend server:
   ```
   npm run server
   ```

5. Start the frontend development server:
   ```
   npm run client
   ```

6. Visit in browers `localhost:5173`

### Database Setup

1. Create a new PostgreSQL database titled `parentul`


2. Run the database setup queries in `database.sql`
   

This will create all the necessary tables and populate the `faq` table with initial data covering various parenting topics such as Temper Tantrums, Lying, Meltdowns, Not Listening, Stealing, Arguing, Bedtime, Disobedience, Hitting/Aggression, and Screaming. The FAQ entries are tailored for both children with and without developmental diagnoses.

## Database Schema

The Parentul application uses the following main tables:

1. `users`: Stores user account information
   - `id` (Primary Key)
   - `email`
   - `password_hash`
   - `first_name`
   - `last_name`
   - `has_diag_in_family` (Boolean)
   - `google_id`
   - `profile_pic_url`
   - `created_at`
   - `updated_at`

2. `children`: Stores information about children
   - `id` (Primary Key)
   - `user_id` (Foreign Key to users)
   - `name`
   - `dob`

3. `conversations`: Tracks chat sessions
   - `id` (Primary Key)
   - `user_id` (Foreign Key to users)
   - `start_time`
   - `end_time`

4. `messages`: Stores individual messages within conversations
   - `id` (Primary Key)
   - `conversation_id` (Foreign Key to conversations)
   - `sender_type`
   - `content`
   - `timestamp`

5. `ai_responses`: Stores details about AI responses
   - `id` (Primary Key)
   - `message_id` (Foreign Key to messages)
   - `response_type`
   - `confidence_score`
   - `processing_time`
   - `created_at`

6. `user_feedback`: Stores user feedback on conversations
   - `id` (Primary Key)
   - `conversation_id` (Foreign Key to conversations)
   - `user_id` (Foreign Key to users)
   - `rating` (Boolean)
   - `created_at`
   - `updated_at`

7. `follow_ups`: Manages follow-up questions
   - `id` (Primary Key)
   - `user_id` (Foreign Key to users)
   - `conversation_id` (Foreign Key to conversations)
   - `question_text`
   - `is_asked` (Boolean)
   - `created_at`
   - `updated_at`

8. `user_preferences`: Stores user-specific settings
   - `user_id` (Primary Key, Foreign Key to users)
   - `notifications_email` (Boolean)
   - `notifications_sms` (Boolean)
   - `phone_number`
   - `notifications_push` (Boolean)
   - `notifications_freq`
   - `updated_at`

9. `faq`: Stores frequently asked questions and answers
   - `id` (Primary Key)
   - `category`
   - `has_developmental_diagnosis` (Boolean)
   - `question`
   - `answer`

## Project Structure

overview of the project's folder structure

## API Documentation

Endpoints and their descriptions

