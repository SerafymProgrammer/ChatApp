FROM node:8

RUN mkdir -p /nest
ADD . /nest

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /nest

# optionally if you want to run npm global bin without specifying path
# ENV PATH=$PATH:/home/node/.npm-global/bin 

# Set the user to use when running this image
#USER node


RUN npm i
RUN npm i -g @nestjs/cli

# Bundle app source
COPY . .

EXPOSE 3000


CMD [ "npm", "start" ]