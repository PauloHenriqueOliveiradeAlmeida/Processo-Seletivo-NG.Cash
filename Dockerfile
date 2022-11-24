FROM node:slim
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
RUN npx prisma init
RUN npx prisma db pull
RUN npx prisma generate
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
