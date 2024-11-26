# 1. Start with the official Node.js image (latest version or as needed)
FROM node:18

# 2. Set the working directory inside the Docker container
WORKDIR /app

# 3. Copy package files to the container to install dependencies
COPY package*.json ./

# 4. Install application dependencies in Docker
RUN npm install

# 5. Copy the rest of the application files into the container
COPY . .

# 6. Expose the port that the app runs on (adjust if different)
EXPOSE 3000

# 7. Set the command to start the app
CMD ["npm", "start"]
