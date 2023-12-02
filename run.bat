@echo off

rem install deps and run dev-server
npm ci --frozen-lockfile --no-audit && npm start
