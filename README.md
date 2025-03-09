# megurumi

## Infrastructure

We use Railway to build and deploy services. Each service is independent and will be exposed by Railway on PORT 8080.

For local development, you need to set different ports for frontend and backend services:

- 8080 for the frontend
- 8000 for the backend

## Frontend

### Build and Start

1. Build the Docker image for the frontend:

   ```sh
   docker build --build-arg BACKEND_URL=http://localhost:8000 -t megurumi-frontend ./frontend
   ```

2. Run the Docker container for the frontend:
   ```sh
   docker run -p 8080:8080 megurumi-frontend
   ```

### Development

For App:
- `cd frontend`
- `npm install`
- `npm run dev`

## Backend

### Build and Start

1. Build the Docker image for the backend:

   ```sh
   docker build --build-arg MYSQL_HOST=your_mysql_host \
                --build-arg MYSQL_PORT=your_mysql_port \
                --build-arg MYSQL_USER=your_mysql_user \
                --build-arg MYSQL_PASSWORD=your_mysql_password \
                --build-arg MYSQL_DATABASE=your_mysql_database \
                --build-arg NODE_ENV=production \
                --build-arg BACKEND_PORT=8000 \
                -t megurumi-backend ./backend
   ```

2. Run the Docker container for the backend:
   ```sh
   docker run -e BACKEND_PORT=8000 -p 8000:8000 megurumi-backend
   ```

### Development

Insure `.env` are given and follow `.env.example`

For Api: 
- `cd backend`
- `npm install`
- `npm run dev`

For DB:
- `docker-compose up -d`
- `npm run db`

## Notes

- Ensure that the `.env` in frontend and backend point to the correct local configuration.
- The frontend should be accessible at `http://localhost:8080` and the backend at `http://localhost:8000`.
