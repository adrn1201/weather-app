# Use the official Node.js image as a base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install tsx globally
RUN npm install -g tsx

# Copy the rest of your application code to the container
COPY . .

# Expose the port your application runs on (optional if needed)
EXPOSE 3000

# Command to run your application using tsx
CMD ["tsx", "index.ts"]