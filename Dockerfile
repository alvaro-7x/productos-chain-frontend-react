# Etapa de construccion
FROM node:14-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Etapa despliegue
FROM nginx:alpine
copy nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html/
EXPOSE 8081
#CMD ["nginx", "-g", "daemon off;"]
