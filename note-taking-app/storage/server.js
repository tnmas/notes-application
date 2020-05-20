const PROTO_PATH = __dirname + '/proto/note.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const db = require("../services/db");
const dbService = require("../services/noteStoreMongoDB");
const _ = require('lodash');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const noteProto = grpc.loadPackageDefinition(packageDefinition);


const server = new grpc.Server();


server.addService(noteProto.NoteService.service, {
    getAll(call, callback) {
        dbService.all(call.request.sortBy, call.request.hideFinishedForRender, function (err, docs) {
            callback(err, docs);
        });
    },

    getOne(call, callback) {
        dbService.get(call.request.id, callback);
    },

    insert(call, callback) {
        dbService.add(call.request, callback);
    },

    update(call, callback) {
        dbService.set(call.request.id, call.request, callback);
    }
});

server.bind("0.0.0.0:50050", grpc.ServerCredentials.createInsecure());
server.start();
console.log("Server running on 50050");


