# Use the official Node.js 18 image as a base image
FROM node:18-alpine3.19

# Install pnpm and Nest CLI globally
RUN npm install -g pnpm @nestjs/cli

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the container
COPY package.json pnpm-lock.yaml ./
COPY .env_example ./.env
# Install the dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the application will run on
EXPOSE 3022

# Command to run the NestJS application in development mode
CMD ["pnpm", "run", "dev"]
