const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
 
const logger = createLogger({
    format: combine(
        label({ label: 'rótulo!' }),
        timestamp(),
        prettyPrint()
      ),
    transports: [
        new transports.Console(),
        new transports.File({
   //         filename: './logs/relatorio_codiv.log'
            filename: 'relatorio_codiv.log'
     
          })
    ],
})

module.exports = logger;