ARG NODE_VERSION=current

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
EXPOSE 3000

FROM base AS development
WORKDIR /usr/src/app
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

FROM base AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production
RUN npm run build
CMD ["npm", "run", "start"]
