#!/bin/sh
# entrypoint.sh

echo "Running Prisma Migrations..."
npx prisma migrate dev --schema=./src/database/schema.prisma
npm run start:dev
echo "Starting the application..."
exec "$@"