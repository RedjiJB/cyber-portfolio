# Multi-stage Dockerfile for React Portfolio Development
FROM node:18-alpine as development

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps to handle react-snapshot compatibility
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose ports for React dev server and API
EXPOSE 3000 5000

# Default command for development
CMD ["npm", "run", "dev"]

# Production build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM nginx:alpine as production

# Copy built app to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]