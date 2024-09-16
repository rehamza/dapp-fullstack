# Use the official Node.js image
FROM node:22.5.1

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend app code
COPY . .

# Expose the backend port
EXPOSE 8000

# Start the backend server
CMD ["npm", "run", "dev"]
