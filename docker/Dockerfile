FROM node:latest as build-stage 
WORKDIR /app 
COPY package*.json /app/ 
RUN npm install 
COPY . . 
RUN npm run build

FROM nginx:alpine
COPY Nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=build-stage /app/build /usr/share/nginx/html 
CMD ["nginx", "-g", "daemon off;"]