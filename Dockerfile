###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:lts-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node


###################
# BUILD FOR PRODUCTION
###################

FROM node:lts-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies including 'devDependencies'
RUN npm ci

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy Prisma schema file from the correct location and generate Prisma client
COPY src/database/schema.prisma ./prisma/
RUN prisma generate --schema=./prisma/schema.prisma

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Remove 'devDependencies' after building
RUN npm ci --only=production && npm cache clean --force

# Stage 2: Setup the production environment
FROM node:lts-alpine AS production

# Create app directory
WORKDIR /usr/src/app

# Copy built node modules and build directory from the build stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Set environment to production
ENV NODE_ENV=production

# Run the application using non-root user for better security
USER node

# Start the server
CMD ["node", "dist/main.js"]
