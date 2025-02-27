# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./backend .

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