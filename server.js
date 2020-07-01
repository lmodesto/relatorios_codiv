var app = require('./config/custom-express')();
var logger = require('./config/winston')
const port = 3000;

app.listen(port, function(){
   logger.info('Servidor rodando na porta '+port);
   logger.info(process.env.USER)
});
