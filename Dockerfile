FROM node:18.15.0

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV URI=mongodb+srv://natours_user_yudi:test123@cluster0.rpgyo.mongodb.net/natours?retryWrites=true&w=majority
ENV PORT=5000
ENV NODE_ENV='production'

EXPOSE 5000

CMD ["npm" , "start"]