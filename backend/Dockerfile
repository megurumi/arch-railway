# Stage 1: Build the application
FROM node:18 AS build

ARG MYSQL_HOST
ARG MYSQL_PORT
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG MYSQL_DATABASE
ARG NODE_ENV
ARG BACKEND_PORT

WORKDIR /app

ENV MYSQL_HOST=$MYSQL_HOST
ENV MYSQL_PORT=$MYSQL_PORT
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV BACKEND_PORT=$BACKEND_PORT
ENV NODE_ENV=$NODE_ENV

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run the application (production-ready)
FROM node:18

WORKDIR /app

COPY --from=build /app /app

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE $BACKEND_PORT

# Run the compiled JavaScript application
CMD ["node", "dist/app.js"]