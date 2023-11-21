###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine3.17 AS build

RUN npm install --global pnpm@8

WORKDIR /usr/src/app


# If there are no changes detected on the lock file
# the "pnpm fetch" and "pnpm install" would not be executed
COPY --chown=node:node package.json .
COPY --chown=node:node pnpm-lock.yaml .
RUN pnpm fetch
RUN pnpm install -r --offline --ignore-pnpmfile

COPY --chown=node:node tsconfig* .
COPY --chown=node:node src/ src/

RUN pnpm build
RUN pnpm prune --config.ignore-scripts=true --config.ignore-dep-scripts=true

USER node

###################
# PRODUCTION
###################

FROM node:20-alpine3.17 AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

