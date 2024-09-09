#!/bin/sh

# Run prisma migrations
npx prisma migrate deploy
npm run db:seed

# Start the server
node server.js