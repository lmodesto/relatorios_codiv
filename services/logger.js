var winston = require("winston");

var logger = winston.createLogger({
    transporte:[
        new winston.transports.File({
            level:"info",
            filename:"logs/relatorio_codiv.log",
            maxsize:100000,
            maxFiles:10
        })
    ]
});

//logger.log("aaa");
logger.log("info","bbb");
logger.info("ccc");
