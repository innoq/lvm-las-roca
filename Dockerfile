FROM hypriot/rpi-node

COPY . /home/app

# install dependencies
WORKDIR /home/app
RUN npm install

# compile assets
RUN npm run compile

# start app
CMD ["npm", "run", "server"]
