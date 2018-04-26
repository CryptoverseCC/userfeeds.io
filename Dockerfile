FROM node

RUN git config --global user.email "servant@userfeeds.io"
RUN git config --global user.name "Userfeeds Servant"

RUN npm i -g yarn

RUN mkdir /module
ADD . /module

WORKDIR /module

RUN yarn
RUN npm run build
RUN cp static/* dist -r
