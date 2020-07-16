const logger = require('../config/winston')

module.exports.maioresDevedores = (app, req, res) => {
    logger.info("Conectando Banco de dados".concat(" - ID_Maiores_Devedores: "+req.id))
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    const table = "CODIV_maiores_devedores";
    logger.info("Filtro Maiores Devedores: " + filtro .concat(" - ID_Maiores_Devedores: "+req.id))
    logger.info("Tabela: " + table .concat(" - ID_Maiores_Devedores: "+req.id))

    codivDAO.maioresDevedores(filtro, function (erro, resultado) {
        if (erro) {
            res.status(500).send(erro);
            return;
        }
        var proximaPagina = parseInt(page) + parseInt(1);
        //      var resultado_tamanho = isNaN(resultado.length) ? resultado.length : 0;
        var resultado_tamanho = limit;
        var response = {
            pagina: page,
            total_de_paginas: 0,
            //          registros: resultado_tamanho,
            total_de_registros: 0,
            maiores_devedores: resultado,
            links: [
                {
                    href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/maiores-devedores?page=" + proximaPagina + "&limit=" + limit,
                    rel: "next",
                    method: "GET"
                }
            ]
        }
        codivDAO.totalRegistros(table, function (erro, resultadoCount) {
            if (erro) {
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