# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /app

# Ensure you're copying package*.json from the correct folder (adjust path if necessary)
COPY package*.json ./

RUN npm install

# Copy the full source code
COPY ./frontend .

# Run build (ensure the build output goes to /dist)
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the custom nginx.conf into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built frontend files into the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 for Nginx
EXPOSE 8080

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]