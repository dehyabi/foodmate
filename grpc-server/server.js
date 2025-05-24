const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'proto', 'service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).foodmate;

const orders = [
  { id: '1', name: 'Pizza', price: 10.99 },
  { id: '2', name: 'Burger', price: 7.99 },
];

function getOrders(call, callback) {
  callback(null, { orders });
}

function main() {
  const server = new grpc.Server();
  server.addService(proto.FoodService.service, { GetOrders: getOrders });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on port 50051');
    server.start();
  });
}

main();

