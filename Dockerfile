FROM python:3.11-slim

# Install Node.js and build tools
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy the entire repository
COPY . /app/

# Navigate to the react app folder
WORKDIR /app/react-prep-wizard

# Install dependencies and build the Vite frontend
RUN npm install
RUN npm run build

# Install Python backend dependencies
RUN pip install -r requirements.txt

# Expose port (Koyeb defaults to 8000)
ENV PORT=8000
EXPOSE $PORT

# Start the Python server
CMD ["python3", "server.py"]
