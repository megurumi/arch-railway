# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Ensure the TypeScript files are compiled
RUN npm run build

# Stage 2: Run the application
FROM node:18

WORKDIR /app

COPY --from=build /app /app

RUN npm install -g ts-node

CMD ["ts-node", "src/app.ts"]