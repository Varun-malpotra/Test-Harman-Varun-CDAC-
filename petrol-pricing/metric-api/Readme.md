## About

This app triggers alternate true/false event to simulate Lid opened/closed. Route available:

-   http://localhost:8080/triggerRouter POST Request { fuelLid, city } To trigger manually price calculation


## Starting the app

- Run `npm install`
- Copy .env.example to .env
- Run `npm run broker`to get the broker service running
- Run `npm run dev` to get the app running
- You can access the app running on http://localhost:8080

## Features
- Uses `evodove` as message broker
- Uses `memory-cache` for caching 
- Uses `koa` for creating server
- Uses `jest` as testing framework
- Uses `typescript` to ease the development
