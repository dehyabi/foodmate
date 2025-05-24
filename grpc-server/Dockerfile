FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install @grpc/grpc-js @grpc/proto-loader

COPY . .

EXPOSE 50051

CMD ["node", "server.js"]

