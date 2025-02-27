# Stage 1: Build the application
FROM node:18 AS build

# Set environment variable for the build stage
ARG MYSQL_HOST
ENV MYSQL_HOST=$MYSQL_HOST
ARG MYSQL_PORT
ENV MYSQL_PORT=$MYSQL_PORT
ARG MYSQL_USER
ENV MYSQL_USER=$MYSQL_USER
ARG MYSQL_PASSWORD
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ARG MYSQL_DATABASE
ENV MYSQL_DATABASE=$MYSQL_DATABASE

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Ensure the TypeScript files are compiled
RUN npm run build

# Stage 2: Run the application (production-ready)
FROM node:18

WORKDIR /app

COPY --from=build /app /app

# Install only production dependencies
RUN npm install --omit=dev

# Expose backend port (8000)
EXPOSE 8000

# Run the compiled JavaScript application
CMD ["node", "dist/app.js"]