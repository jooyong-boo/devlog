#!/bin/sh

# Run prisma migrations
npx prisma migrate deploy
npx prisma db seed

# Start the server
node server.js