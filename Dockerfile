FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install git, openssh, and vim
RUN apk add --no-cache git openssh vim

# Copy package.json files before install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Expose port for Next.js dev server
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]

