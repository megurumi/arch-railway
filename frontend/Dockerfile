# Stage 0: Define arguments
ARG VITE_BACKEND_URL

# Stage 1: Build the application
FROM node:18 AS build

# Set environment variable for the build stage
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

COPY . .

# Run the build command
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Use a custom Nginx config (important for Vue routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend files into the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 for Nginx
EXPOSE 8080

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
