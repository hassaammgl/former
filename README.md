# Form Builder App

## Project Description

This is a feature-rich Form Builder application built with Next.js, Prisma, and shadcn/ui. It allows users to create and manage forms, with robust authentication and a comprehensive dashboard to view form submissions. The application leverages a modern web stack to provide a fast, secure, and intuitive user experience.

## Features

- **Authentication:** Secure user authentication using NextAuth.js (inferred from `src/app/api/auth/[...all]/route.ts` and `src/services/better-auth`).
- **Form Builder:** Drag-and-drop interface for creating custom forms with various field types.
- **Dashboard:** An administrative dashboard to manage created forms, view submissions, and analyze data.
- **Database Integration:** Powered by Prisma ORM for efficient and type-safe database interactions.
- **Responsive Design:** Built with shadcn/ui and Tailwind CSS for a modern, responsive, and accessible user interface.

## Technologies Used

- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Database:** PostgreSQL (or any other database supported by Prisma)
- **ORM:** Prisma
- **Package Manager:** Bun
- **Authentication:** Better-auth(inferred)

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v20 or higher)
- Bun (v1.0 or higher)
- Docker (for database setup with `docker-compose.yaml`)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/form-builder-app.git
    cd form-builder-app
    ```

2.  Install dependencies using Bun:

    ```bash
    bun install
    ```

### Environment Variables

Create a `.env` file in the root directory based on `.env.example` (if present, otherwise assume common Next.js/Prisma env vars) and fill in the required environment variables, including:

- `DATABASE_URL`: Connection string for your PostgreSQL database.
- `NEXTAUTH_SECRET`: A random string used to sign and encrypt JWTs. Generate one using `openssl rand -base64 32`.
- `NEXTAUTH_URL`: The URL of your application (e.g., `http://localhost:3000`).

### Database Setup

1.  Start the database using Docker Compose (assumes `docker-compose.yaml` is for a database):

    ```bash
    docker-compose up -d
    ```

2.  Run Prisma migrations to set up your database schema:

    ```bash
    bun prisma migrate dev
    ```

3.  (Optional) Seed the database with initial data:

    ```bash
    bun prisma db seed
    ```

### Running the Development Server

To start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── src/
│   ├── app/                # Next.js app directory (pages, layouts, API routes)
│   ├── components/         # Reusable UI components (shadcn/ui overrides and custom)
│   ├── constants/          # Application-wide constants
│   ├── generated/          # Generated code (e.g., Prisma client)
│   ├── hooks/              # Custom React hooks
│   ├── layout/             # Main application layout components
│   ├── lib/                # Utility functions
│   ├── services/           # Backend services (Auth, Prisma client)
│   └── types/              # TypeScript type definitions
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
└── ...                     # Other configuration files (.gitignore, package.json, etc.)
```

## License

This project is licensed under the MIT License. (Assumed, can be updated if specified otherwise).
