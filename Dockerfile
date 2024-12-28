# Use the official Node.js image as the base image
FROM node:22.12.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8085

# Start the application
CMD ["npm", "start"]