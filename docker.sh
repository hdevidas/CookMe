#!/bin/bash

sudo service mongod stop
sudo docker-compose build
sudo docker-compose up