const auth = require('../config/basic/conf')
const basicAuth = require('express-basic-auth');
const logger = require('../config/winston')
const constants = require('../config/constants')

module.exports = function (app) {

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
    var log = constants.LOG_PARALISADOS + req.id;
    logger.info(log)
    app.controllers.Paralisados.paralisados(app, req, res,log);
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
    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Maiores Devedores".concat(" - ID_Maiores_Devedores: "+req.id))
    app.controllers.MaioresDevedores.maioresDevedores(app, req, res);
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
    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Sentenciados".concat(" - ID_Sentenciados: "+req.id))
    app.controllers.Sentenciados.sentenciados(app, req, res);
  });

  /**
    * @swagger
    * /processos-digitalizados-mensal:
    *   get:
    *    description: API de Processos Digitalizados Mensal
    *    responses:
    *      '200':
    *        description: A successful response
    */
  app.get('/api/v1/codiv/relatorios/processos-digitalizados-mensal', function (req, res) {
    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Processos Digitalizados Mensal".concat(" - ID_processos-digitalizados-mensal: "+req.id))
    app.controllers.ProcessosDigitalizadosMensal.processosDigitalizadosMensal(app, req, res);
  });

  /**
  * @swagger
  * /data-implantacao-serventia-ecarta:
  *   get:
  *    description: API de Data Implementação Serventia Ecarta
  *    responses:
  *      '200':
  *        description: A successful response
  */
  app.get('/api/v1/codiv/relatorios/data-implantacao-serventia-ecarta', function (req, res) {
    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Data Implementação Serventia Ecarta".concat(" - ID_data-implantacao-serventia-ecarta: "+req.id))
    app.controllers.DataImplantacaoServentiaEcarta.dataImplantacaoServentiaEcarta(app, req, res);

  });

  /**
  * @swagger
  * /ecartas-emitidos-serventia:
  *   get:
  *    description: API de  Ecartas Emitidos Serventia
  *    responses:
  *      '200':
  *        description: A successful response
  */
  app.get('/api/v1/codiv/relatorios/ecartas-emitidos-serventia', function (req, res) {
    //basicAuth( { authorizer: auth } ) 
    
    logger.info("Relatório Ecartas Emitidos Serventia".concat(" - ID_ecartas-emitidos-serventia: "+req.id))
    app.controllers.EcartasEmitidosServentia.ecartasEmitidosServentia(app,req,res);
  });

  /**
    * @swagger
    * /ecartas-emitidos-total:
    *   get:
    *    description: API de Ecartas Emitidos Total
    *    responses:
    *      '200':
    *        description: A successful response
    */
  app.get('/api/v1/codiv/relatorios/ecartas-emitidos-total', function (req, res) {
    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Ecartas Emitidos Total".concat(" - ID_ecartas-emitidos-total: "+req.id))
    app.controllers.EcartasEmitidosTotal.ecartasEmitidosTotal(app, req, res);

  });

  /**
    * @swagger
    * /meta-por-serventia:
    *   get:
    *    description: API de Meta Por Serventia
    *    responses:
    *      '200':
    *        description: A successful response
    */
  app.get('/api/v1/codiv/relatorios/meta-por-serventia', function (req, res) {
    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Meta Por Serventia".concat(" - ID_meta-por-serventia: "+req.id))
    app.controllers.MetaPorServentia.metaPorServentia(app, req, res);
  });

  /**
  * @swagger
  * /meta-trimestral-reducao-acervo-geral:
  *   get:
  *    description: API de Meta Trimestral Redução de Acervo Geral
  *    responses:
  *      '200':
  *        description: A successful response
  */
  app.get('/api/v1/codiv/relatorios/meta-trimestral-reducao-acervo-geral', function (req, res) {
    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Meta Trimestral Redução de Acervo Geral".concat(" - ID_meta-trimestral-reducao-acervo-geral: "+req.id))
    app.controllers.MetaTrimestralReducaoAcervoGeral.metaTrimestralReducaoAcervoGeral(app, req, res);
  });

  /**
* @swagger
* /quantidade-processos-eletronicos-relacao-acervo-geral:
*   get:
*    description: API de Quatidade de Processos Eletrônicos Relação do Acervo Geral
*    responses:
*      '200':
*        description: A successful response
*/
  app.get('/api/v1/codiv/relatorios/quantidade-processos-eletronicos-relacao-acervo-geral', function (req, res) {

    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Quatidade de Processos Eletrônicos Relação do Acervo Geral".concat(" - ID_quantidade-processos-eletronicos-relacao-acervo-geral: "+req.id))
    app.controllers.QuantidadeProcessosEletronicosRelacaoAcervoGeral.quantidadeProcessosEletronicosRelacaoAcervoGeral(app, req, res);
  });

  /**
    * @swagger
    * /ranking-por-serventia:
    *   get:
    *    description: API de Ranking Por Serventia
    *    responses:
    *      '200':
    *        description: A successful response
    */
  app.get('/api/v1/codiv/relatorios/ranking-por-serventia', function (req, res) {
    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Ranking Por Serventia".concat(" - ID_ranking-por-serventia: "+req.id))
    app.controllers.RankingPorServentia.rankingPorServentia(app, req, res);

  });

  /**
   * @swagger
   * /ecarta-por-resultado:
   *   get:
   *    description: API de Ecarta Por Resultado
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.get('/api/v1/codiv/relatorios/ecarta-por-resultado', function (req, res) {
    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Ecarta Por Resultado".concat(" - ID_ecarta-por-resultado: "+req.id))
    app.controllers.EcartaPorResultado.ecartaPorResultado(app, req, res);
  });

  /**
    * @swagger
    * /processos-sem-andamento:
    *   get:
    *    description: API de Processos Sem Andamento
    *    responses:
    *      '200':
    *        description: A successful response
    */
  app.get('/api/v1/codiv/relatorios/processos-sem-andamento', function (req, res) {
    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Processos Sem Andamento".concat(" - ID_processos-sem-andamento: "+req.id))
    app.controllers.ProcessosSemAndamento.processosSemAndamento(app, req, res);
  });

  /**
   * @swagger
   * /relatorio-processos-pendentes-citacao:
   *   get:
   *    description: API de Processos pendentes Citação
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.get('/api/v1/codiv/relatorios/relatorio-processos-pendentes-citacao', function (req, res) {
     //basicAuth( { authorizer: auth } )
    logger.info("Relatório Processos pendentes Citação".concat(" - ID_processos-pendentes-citacao: "+req.id))
    app.controllers.ProcessosPendentesCitacao.processosPendentesCitacao(app, req, res);
  });

    /**
   * @swagger
   * /relatorio-processos-pendentes-citacao:
   *   get:
   *    description: API de Processos pendentes Citação
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.get('/api/v1/codiv/relatorios/processos-pendentes-citacao', function (req, res) {
    //basicAuth( { authorizer: auth } )
    logger.info("Relatório Processos pendentes Citação".concat(" - ID_processos-pendentes-citacao: "+req.id))
    app.controllers.ProcessosPendentesCitacao.processosPendentesCitacao(app, req, res);
  });

}
