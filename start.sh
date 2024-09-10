#!/bin/sh

# Run prisma migrations
npx prisma migrate deploy

# Start the server
node server.js