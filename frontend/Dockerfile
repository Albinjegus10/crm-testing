FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve

COPY start.sh .
RUN chmod +x start.sh

CMD ["./start.sh"]
