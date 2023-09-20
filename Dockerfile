#BUILD APP STAGE USING NODE

FROM node:18.18 as build
WORKDIR /app
COPY ./package*.json ./

RUN npm ci

COPY ./ ./
RUN npm run build

#RUN APP STAGE USING NGINX

FROM nginx:latest
EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ngcloudrundemo /usr/share/nginx/html
