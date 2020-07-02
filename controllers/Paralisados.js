const logger = require('../config/winston')
const constants = require('../config/constants')

module.exports.paralisados = (app, req, res, log) => {
    logger.info("Conectando Banco de dados: ".concat(log))
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = constants.PAGE_DEFAULT;
    const limitDefault = constants.LIMIT_DEFAULT;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;
    const table = "CODIV_paralisados";

    logger.info("Filtro Paralisados: " + filtro .concat(log))
    logger.info("Tabela: " + table .concat(log))

    codivDAO.paralisados(filtro, function (erro, resultado) {
        if (erro) {
            res.status(500).send(erro);
            logger.error("codivDAO.paralisados: "+erro .concat(log))
            return;
        }
        var proximaPagina = parseInt(page) + parseInt(1);
        //        var resultado_tamanho = isNaN(resultado) ? resultado.length : 0;
        var resultado_tamanho = limit;
        var response = {
            pagina: page,
            //            total_de_paginas: 0,
            //            registros: resultado_tamanho,
            total_de_registros: 0,
            paralisados: resultado,
            links: [
                {
                    href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/paralisados?page=" + proximaPagina + "&limit=" + limit,
                    rel: "next",
                    method: "GET"
                }
            ]
        }
        codivDAO.totalRegistros(table, function (erro, resultadoCount) {
            logger.info("totalRegistros: ".concat(log))

            if (erro) {
                logger.error("totalRegistros ERROR: ".concat(log))
                res.status(500).send(erro);
                return;
            }

            if (isNaN(resultadoCount)) {
                response.total_de_paginas = Math.round(resultadoCount[0].totalRegistros / limit);
                response.total_de_registros = resultadoCount[0].totalRegistros;
            } else {
                response.total_de_paginas = 0;
                response.total_de_registros = 0;
            }

            // última página não precisa apresentar o link
            if (page >= response.total_de_paginas) {
                response.links = "[]";
            }
            // o numero de página maior que total de paguna zerar paginas e registros
            if (page > response.total_de_paginas) {
                response.total_de_registros = 0;
                response.total_de_paginas = 0;
            }

            res.status(200).json(response);
        });

        return;
    });

}