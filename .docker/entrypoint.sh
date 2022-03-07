#!/bin/bash

sudo npm install npm -g
npm install
npm run typeorm migration:run
npm run dev
