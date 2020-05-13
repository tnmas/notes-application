const PROTO_PATH = __dirname + '/proto/note.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        arrays: true
});

const NoteService = grpc.loadPackageDefinition(packageDefinition).NoteService;

const client = new NoteService("localhost:50050", grpc.credentials.createInsecure());

module.exports = client;