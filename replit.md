# WebInsight Scanner Application

## Overview

This repository contains a full-stack web application called "WebInsight Scanner" that provides website analysis, including SEO insights and security assessments. The application is built with a React frontend and an Express backend, using Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Technology**: React with TypeScript
- **UI Framework**: Custom UI components built with Radix UI primitives and styled with Tailwind CSS
- **Styling**: Tailwind CSS with a custom theme system that supports both light and dark modes
- **State Management**: React Query for data fetching and local state management
- **Routing**: Wouter for lightweight routing

The frontend follows a component-based architecture, with reusable UI components organized using the ShadCN UI component system. Pages are composed of these components, with data fetching handled by React Query.

### Backend Architecture

- **Technology**: Express.js with TypeScript
- **API Layer**: RESTful API endpoints prefixed with `/api`
- **Storage**: Drizzle ORM with a database layer abstraction
- **Authentication**: Not fully implemented yet, but structure is in place

The backend follows a layered architecture:
1. Express routes layer (server/routes.ts)
2. Storage layer with database abstraction (server/storage.ts)
3. Schema definitions shared between frontend and backend (shared/schema.ts)

### Data Storage

- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured but not yet connected)
- **Schema**: Users table defined in shared/schema.ts

### Data Flow

1. User submits a URL to scan through the frontend
2. The frontend sends an API request to the backend
3. The backend processes the request, interacting with external APIs for website analysis
4. Results are returned to the frontend for display
5. Users can download or share reports based on the analysis

## Key Components

### Frontend Components

1. **UI Components**: Extensive collection of UI components based on Radix UI primitives
2. **Scan Form**: Handles URL submission and validation
3. **Results Panel**: Displays scan results with different tabs for SEO, security, etc.
4. **Scanning Process**: Shows scanning progress with animated indicators
5. **Report Generator**: Creates downloadable reports from scan results

### Backend Components

1. **Express Server**: Handles HTTP requests and responses
2. **Storage Interface**: Abstracts database operations
3. **Routes**: API endpoints for handling various requests
4. **Schema**: Shared database schema definitions

## External Dependencies

### Frontend Dependencies

- **@radix-ui/***: UI primitive components
- **@tanstack/react-query**: Data fetching and cache management
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight router for React
- **class-variance-authority & clsx**: Utility for conditional class names
- **react-day-picker**: Date picker component

### Backend Dependencies

- **drizzle-orm**: ORM for database operations
- **drizzle-zod**: Schema validation for Drizzle
- **express**: Web framework for Node.js
- **@neondatabase/serverless**: PostgreSQL connector for serverless environments

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

1. **Development**: `npm run dev` - Starts both the frontend dev server and backend
2. **Build**: `npm run build` - Bundles both the frontend and backend for production
3. **Production**: `npm run start` - Runs the production build

Database migrations can be applied with `npm run db:push`.

## Getting Started

1. Ensure PostgreSQL is provisioned in your Replit
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Access the application at the provided URL

## Current Implementation Status

The repository contains a partially implemented application with:

- Complete UI components and frontend structure
- Basic backend structure with Express routes
- Database schema definitions with Drizzle ORM
- Storage interface with in-memory implementation (ready for database integration)

## Next Steps

1. Implement the backend API endpoints for scanning websites
2. Connect the PostgreSQL database with Drizzle ORM
3. Implement authentication for users
4. Add more detailed analysis features for websites
5. Implement saving and retrieving scan history