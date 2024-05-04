#!/bin/sh
# entrypoint.sh

echo "Running Prisma Migrations..."
npx prisma migrate dev --schema=./src/database/schema.prisma

echo "Starting the application..."
exec "$@"