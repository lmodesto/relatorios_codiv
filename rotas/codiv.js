const auth = require('../config/basic/conf')
const basicAuth = require('express-basic-auth');
const winston = require('winston');
const logger = require('winston')

module.exports = function (app) {

  app.get('/api/v1/codiv', function (req, res) {
    logger.info('servidor iniciado');
    res.send("codiv");
  });

  /**
  * @swagger
  * /paralisados:
  *   get:
  *    description: API de paralisados
  *    produces:
  *      - application/json
  *    parameters:
  *      - name: page
  *        description: Número da Página
  *        requerid: false
  *        type: integer
  *        default: 1
  *      - name: limit
  *        description: Quantidade de registro por página
  *        requerid: false
  *        type: integer
  *        default: 500
  *    responses:
  *      '200':
  *        description: A successful response
  */
  app.get('/api/v1/codiv/relatorios/paralisados', function (req, res) {
    //basicAuth( { authorizer: auth } )
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_paralisados";

    codivDAO.paralisados(filtro, function (erro, resultado) {
      if (erro) {
        res.status(500).send(erro);
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

  });





  /**
  * @swagger
  * /maiores-devedores:
  *   get:
  *    description: API de maiores_devedores
  *    responses:
  *      '200':
  *        description: A successful response
  */
  app.get('/api/v1/codiv/relatorios/maiores-devedores', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_maiores_devedores";

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

  });




  /**
  * @swagger
  * /sentenciados:
  *   get:
  *    description: API de sentenciados_cancelados_pagos
  *    responses:
  *      '200':
  *        description: A successful response
  */
  app.get('/api/v1/codiv/relatorios/sentenciados', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_sentenciados_cancelados_pagos";

    codivDAO.sentenciados(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        sentenciados: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/sentenciados?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });


      return;
    });

  });


  /**
    * @swagger
    * /processos-digitalizados-mensal:
    *   get:
    *    description: API de processos-digitalizados-mensal
    *    responses:
    *      '200':
    *        description: A successful response
    */
  app.get('/api/v1/codiv/relatorios/processos-digitalizados-mensal', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_TOTAL_PROCESSOS_DIGITALIZADOS_MENSAL";

    codivDAO.processosDigitalizadosMensal(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        sentenciados: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/processos-digitalizados-mensal?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });

      return;
    });
  });






  /**
  * @swagger
  * /data-implantacao-serventia-ecarta:
  *   get:
  *    description: API de data-implantacao-serventia-ecarta
  *    responses:
  *      '200':
  *        description: A successful response
  */
  app.get('/api/v1/codiv/relatorios/data-implantacao-serventia-ecarta', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_data_implantacao_serventia_ecarta";

    codivDAO.dataImplantacaoServentiaEcarta(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        data_implantacao_serventia_Ecarta: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/sentenciados?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });
      return;
    });

  });






  /**
  * @swagger
  * /ecartas-emitidos-serventia:
  *   get:
  *    description: API de ecartas-emitidos-serventia
  *    responses:
  *      '200':
  *        description: A successful response
  */
  app.get('/api/v1/codiv/relatorios/ecartas-emitidos-serventia', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_ecartas_emitidos_serventia";

    codivDAO.ecaryasEmitidosServentia(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        data_implantacao_serventia_Ecarta: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/sentenciados?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });
      return;
    });

  });





  /**
    * @swagger
    * /ecartas-emitidos-total:
    *   get:
    *    description: API de ecartas-emitidos-total
    *    responses:
    *      '200':
    *        description: A successful response
    */
  app.get('/api/v1/codiv/relatorios/ecartas-emitidos-total', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_ecartas_emitidos_total";

    codivDAO.ecartasEmitidosTotal(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        ecartas_emitidos_total: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/sentenciados?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });
      return;
    });

  });













  /**
    * @swagger
    * /meta-por-serventia:
    *   get:
    *    description: API de meta-por-serventia
    *    responses:
    *      '200':
    *        description: A successful response
    */
   app.get('/api/v1/codiv/relatorios/meta-por-serventia', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_meta_por_serventia";

    codivDAO.metaPorServentia(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        meta_por_serventia: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/sentenciados?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });
      return;
    });

  });




    /**
    * @swagger
    * /meta-trimestral-reducao-acervo-geral:
    *   get:
    *    description: API de meta-trimestral-reducao-acervo-geral
    *    responses:
    *      '200':
    *        description: A successful response
    */
   app.get('/api/v1/codiv/relatorios/meta-trimestral-reducao-acervo-geral', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_meta_trimestral_reducao_acervo_geral";

    codivDAO.metaTrimestralReducaoAcervoGeral(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        meta_trimestral_reducao_acervo_geral: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/sentenciados?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });
      return;
    });

  });




      /**
    * @swagger
    * /quantidade-processos-eletronicos-relacao-acervo-geral:
    *   get:
    *    description: API de quantidade_processos_eletronicos_relacao_acervo_geral
    *    responses:
    *      '200':
    *        description: A successful response
    */
   app.get('/api/v1/codiv/relatorios/quantidade-processos-eletronicos-relacao-acervo-geral', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_quantidade_processos_eletronicos_relacao_acervo_geral";

    codivDAO.quantidadeProcessosEletronicosRelacaoAcervoGeral(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        quantidade_processos_eletronicos_relacao_acervo_geral: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/sentenciados?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });
      return;
    });

  });



      /**
    * @swagger
    * /ranking-por-serventia:
    *   get:
    *    description: API de ranking-por-serventia
    *    responses:
    *      '200':
    *        description: A successful response
    */
   app.get('/api/v1/codiv/relatorios/ranking-por-serventia', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_ranking_por_serventia";

    codivDAO.rankingPorServentia(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        ranking_sor_serventia: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/sentenciados?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });
      return;
    });

  });



   /**
    * @swagger
    * /ecarta-por-resultado:
    *   get:
    *    description: API de ecarta-por-resultado
    *    responses:
    *      '200':
    *        description: A successful response
    */
   app.get('/api/v1/codiv/relatorios/ecarta-por-resultado', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_ecarta_por_resultado";

    codivDAO.ecartaPorResultado(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        ecarta_por_resultado: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/sentenciados?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });
      return;
    });

  });



   /**
    * @swagger
    * /processos-sem-andamento:
    *   get:
    *    description: API de processos-sem-andamento
    *    responses:
    *      '200':
    *        description: A successful response
    */
   app.get('/api/v1/codiv/relatorios/processos-sem-andamento', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_processos_sem_andamento";

    codivDAO.processosSemAndamento(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        processos_sem_andamento: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/sentenciados?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });
      return;
    });

  });

   /**
    * @swagger
    * /relatorio-processos-pendentes-citacao:
    *   get:
    *    description: API de relatorio-processos-pendentes-citacao
    *    responses:
    *      '200':
    *        description: A successful response
    */
   app.get('/api/v1/codiv/relatorios/relatorio-processos-pendentes-citacao', function (req, res) {
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 500;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filtro = " LIMIT " + startIndex + "," + limit;

    logger.info("Filtro :" + filtro)

    const table = "CODIV_relatorio_processos_pendentes_citacao";

    codivDAO.processosSemAndamento(filtro, function (erro, resultado) {
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
        //      registros: resultado_tamanho,
        total_de_registros: 0,
        processos_sem_andamento: resultado,
        links: [
          {
            href: "http://134.122.5.186:3000/api/v1/codiv/relatorios/sentenciados?page=" + proximaPagina + "&limit=" + limit,
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
        logger.info(res.status);
        res.status(200).json(response);
      });
      return;
    });

  });




}
