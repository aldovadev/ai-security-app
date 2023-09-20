# Stage 1: Build
FROM node:latest as build

# Set working directory in the container
WORKDIR /usr/src/app
RUN npm install
RUN npm run build

# Stage 2: Run
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built Angular application to the Nginx root directory
COPY --from=build /usr/src/app/dist/ai-security-app /usr/share/nginx/html

# Expose port 80 for incoming connections
EXPOSE 80
