FROM node:slim
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
RUN npx prisma init
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
