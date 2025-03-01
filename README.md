# megurumi

## Frontend

### Build and Run

1. Build the Docker image for the frontend:

   ```sh
   docker build --build-arg BACKEND_URL=http://localhost:8000 -t megurumi-frontend ./frontend
   ```

2. Run the Docker container for the frontend:
   ```sh
   docker run -p 8080:8080 megurumi-frontend
   ```

## Backend

### Build and Run

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

## Notes

- Ensure that the `BACKEND_URL` in the frontend build command points to the correct backend URL.
- Replace `your_mysql_host`, `your_mysql_port`, `your_mysql_user`, `your_mysql_password`, and `your_mysql_database` with your actual MySQL configuration.
- The frontend will be accessible at `http://localhost:8080` and the backend at `http://localhost:8000`.
