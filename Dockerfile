# Étape 1 : Build de l'application
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

# Étape 2 : Exécution avec Node.js et serve
FROM node:18-alpine
WORKDIR /app

# Installer uniquement serve pour exécuter l'app
RUN npm install -g serve

# Copier les fichiers compilés depuis l'étape builder
COPY --from=builder /app/dist /app/dist

EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001"]
