#BUILD APP STAGE USING NODE
FROM node:18.18 as build
WORKDIR /app
COPY ./package*.json ./

RUN npm install

COPY ./ ./
RUN npm run build

#RUN APP STAGE USING NGINX

FROM nginx:1.23.0-alpine
EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ai-security-app /usr/share/nginx/html
