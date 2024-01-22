web: chmod +x start.sh && ./start.sh
release: sh -c 'if [ "$APP_TYPE" = "backend" ]; then cd backend && npm run migrate:prod; fi'
