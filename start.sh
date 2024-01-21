#!/bin/bash

APP_TO_START=${APP_TO_START:-"backend"}

if [ "$APP_TO_START" == "frontend" ]; then
  echo "Starting frontend..."
  npm run start:frontend
else
  echo "Starting backend..."
  npm run start:backend
fi