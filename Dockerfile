FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies (we'll override this later)
RUN npm install -g create-next-app

# Default command: bash shell for dev use
CMD [ "sh" ]
