#!/bin/bash

tmux new-session -d -s server
tmux send-keys -t server "cd server && npm install && npm start" C-m

tmux new-session -d -s client
tmux send-keys -t client "cd client && npm install && ng serve" C-m