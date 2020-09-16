FROM node:12.18.3-alpine3.9
RUN npm install -g create-react-app \
                   create-react-native-app \
                   react-native-cli

WORKDIR /app