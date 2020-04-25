const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect(
    'mongodb://localhost:27017/node', { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('Conexão com o  MongoDB Realizada.') }
)