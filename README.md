# To-Do List Backend

This is the backend for the To-Do List application, providing API endpoints for managing tasks and columns. The project is built with Node.js and Express, and it connects to a MySQL database.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MySQL**: A relational database management system.
- **dotenv**: A module to load environment variables from a `.env` file.
- **cors**: A package to enable Cross-Origin Resource Sharing.
- **body-parser**: A middleware to parse incoming request bodies.

## Features

This project is created to provide APIs for the frontend repository available at https://github.com/kunanon1122/to-do-list-frontend.

- **API Endpoints**: This project provides the following API endpoints:

  - **Columns**:
    - `GET /api/column/columns`: Fetch all columns.
    - `POST /api/column/create-column`: Create a new column.
    - `DELETE /api/column/delete-column/:id`: Delete a column by ID.
  - **Cards**:
    - `GET /api/card/cards`: Fetch all cards.
    - `POST /api/card/create-card`: Create a new card.
    - `PUT /api/card/update-step-card`: Update the step of a card.
    - `DELETE /api/card/delete-card`: Delete a card.

- **Database Connection**: Connects to a MySQL database using environment variables for configuration.
- **Docker Support**: Includes a Dockerfile for containerization.
- **GitHub Actions**: CI/CD pipeline for deploying to Amazon ECS.

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/kunanon1122/to-do-list-backend.git
cd to-do-list-backend
npm install
```

Then, run the development server:

```bash
npm start
# or
yarn start
# or
node server.js
# or
nodemon server.js
```

The server will run on http://localhost:8085 by default.

## Contact

If you are impressed with this project and would like to contact me, please reach out at:

- **Email**: non.somkham@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/kunanon-somkham-571984198
- **GitHub**: https://github.com/kunanon1122

Thank you for considering my project. I look forward to collaborating with you!
