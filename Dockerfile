## Étape 1 : Build de l'application
#FROM node:18-alpine AS builder
#WORKDIR /app
#
#COPY package.json package-lock.json ./
#RUN npm install --frozen-lockfile
#
#COPY . .
#RUN npm run build
#
## Étape 2 : Exécution avec Node.js et serve
#FROM node:18-alpine
#WORKDIR /app
#
## Installer uniquement serve pour exécuter l'app
#RUN npm install -g serve
#
## Copier les fichiers compilés depuis l'étape builder
#COPY --from=builder /app/dist /app/dist
#
#EXPOSE 3001
#
#CMD ["serve", "-s", "dist", "-l", "3001"]

FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM busybox:1.35
RUN adduser -D static
USER static
WORKDIR /home/static
COPY --from=build-stage /app/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "3001"]