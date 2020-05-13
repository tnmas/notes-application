const mongoose = require('mongoose');
const uri = 'mongodb://localhost/noteTakingApp';

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, function(){});

