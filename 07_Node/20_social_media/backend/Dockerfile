# Use official Node 20 image
FROM node:20

# Upgrade npm to version 10
RUN npm install -g npm@10

# Set working directory
WORKDIR /app

# Copy your project files
COPY . .

# Install dependencies
RUN npm install

# Expose your app's port (if you're using something like Express)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
