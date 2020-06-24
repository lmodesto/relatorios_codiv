const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, printf } = format;


const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} :: ${label} :: ${level} :: ${message}`;
});

const logger = createLogger({
    format: combine(
        label({ label: 'API RELATÓRIO CODIV '}),
        timestamp(),
        myFormat
     //   prettyPrint()
      ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: './logs/relatorio_codiv.log'     
 //             filename: 'relatorio_codiv.log'
      })
    ],
})

module.exports = logger;