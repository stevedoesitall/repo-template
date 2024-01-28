#!/bin/bash

APP_TO_START=${APP_TO_START:-"backend"}

if [ "$APP_TO_START" == "frontend" ]; then
  echo "Starting frontend..."
  npm run start:frontend
elif [ "$APP_TO_START" == "backend" ]; then
  echo "Starting backend..."
  npm run start:backend
elif [ "$APP_TO_START" == "databse" ]; then
  echo "Running database migration"
fi