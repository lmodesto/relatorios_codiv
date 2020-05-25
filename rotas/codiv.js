const auth = require('../config/basic/conf')
const basicAuth = require('express-basic-auth');


module.exports = function(app){

  
  app.get('/api/v1/codiv', function(req, res){
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('codiv.');
  });

  /**
  * @swagger
  * /paralisados:
  *   get:
  *    description: API de paralisados
  *    responses:
  *      '200':
  *        description: A successful response
  */
  app.get('/api/v1/codiv/relatorios/paralisados', function(req, res){
//basicAuth( { authorizer: auth } )
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 100;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page ;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;
    
    const startIndex = (page -1) * limit;
    const endIndex = page * limit;

    //  const  filtro = " LIMIT " +startIndex+","+endIndex;
    const  filtro = " LIMIT " +startIndex+","+limit;

    console.log("Filtro :"+filtro)

    const table = "CODIV_paralisados";

    codivDAO.paralisados(filtro,function(erro, resultado){
  
      var proximaPagina = parseInt(page) + parseInt(1);
      var fim = proximaPagina == page;

      var response = {
        pagina: page,
        total_de_paginas: 3,
        registros: resultado.length,
        total_de_registros: 1,
         paralisados: resultado,
     //    if(fim){
            links: [
              {
                href:"http://134.122.5.186:3000/api/v1/codiv/relatorios/paralisados?page="+proximaPagina+"&limit="+limit,
                rel:"next",
                method:"GET"
              }                
            ]
   //       }        
      }
            //  console.log(response);

    codivDAO.totalRegistros(table,function(erro, resultadoCount){
      
      response.total_de_paginas = Math.round(resultadoCount[0].totalRegistros/limit);
      response.total_de_registros = resultadoCount[0].totalRegistros;
      
      res.status(200).json(response);
    });

    return;
   });
      
    });





      /**
  * @swagger
  * /maiores_devedores:
  *   get:
  *    description: API de maiores_devedores
  *    responses:
  *      '200':
  *        description: A successful response
  */
  app.get('/api/codiv/maiores_devedores', function(req, res){
    var connection = app.persistencia.connectionFactory();
    var codivDAO = new app.persistencia.CodivDao(connection);

    const pageDefault = 1;
    const limitDefault = 10;

    const page = isNaN(req.query.page) ? pageDefault : req.query.page ;
    const limit = isNaN(req.query.limit) ? limitDefault : req.query.limit;
    
    const startIndex = (page -1) * limit;
    const endIndex = page * limit;

    const  filtro = " LIMIT " +startIndex+","+limit;

    console.log("Filtro :"+filtro)

    const table = "CODIV_maiores_devedores";

    codivDAO.paralisados(filtro,function(erro, resultado){
  
      var proximaPagina = parseInt(page) + parseInt(1);
      var fim = proximaPagina == page;

      console.log(resultado.length);
      var response = {
        pagina: page,
        total_de_paginas: 3,
        registros: resultado.length,
        total_de_registros: 1,
        maiores_devedores: resultado,
      //     if(fim){
            links: [
              {
                href:"http://134.122.5.186/api/v1/codiv/relatorios/maiores_devedores?page="+proximaPagina+"&limit="+limit,
                rel:"next",
                method:"GET"
              }                
            ]
    //    }        
      }
            //  console.log(response);

    codivDAO.totalRegistros(table,function(erro, resultadoCount){
      
      response.total_de_paginas = Math.round(resultadoCount[0].totalRegistros/limit);
      response.total_de_registros = resultadoCount[0].totalRegistros;
      
      res.status(200).json(response);
    });

    return;
   });
      
    });






  app.delete('/codiv/pagamentos/pagamento/:id', function(req, res){
    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CANCELADO';

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function(erro){
        if (erro){
          res.status(500).send(erro);
          return;
        }
        console.log('pagamento cancelado');
        res.status(204).send(pagamento);
    });
  });

  app.put('/codiv/pagamentos/pagamento/:id', function(req, res){

    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CONFIRMADO';

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function(erro){
        if (erro){
          res.status(500).send(erro);
          return;
        }
        console.log('pagamento criado');
        res.send(pagamento);
    });

  });

  app.post('/codiv/pagamentos/pagamento', function(req, res){

    req.assert("pagamento.forma_de_pagamento",
        "Forma de pagamento eh obrigatorio").notEmpty();
    req.assert("pagamento.valor",
      "Valor eh obrigatorio e deve ser um decimal")
        .notEmpty().isFloat();

    var erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    var pagamento = req.body["pagamento"];
    console.log('processando uma requisicao de um novo pagamento');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date;

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.salva(pagamento, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } else {
      pagamento.id = resultado.insertId;
      console.log('pagamento criado');

      if (pagamento.forma_de_pagamento == 'cartao'){
        var cartao = req.body["cartao"];
        console.log(cartao);

        var clienteCartoes = new app.servicos.clienteCartoes();

        clienteCartoes.autoriza(cartao,
            function(exception, request, response, retorno){
              if(exception){
                console.log(exception);
                res.status(400).send(exception);
                return;
              }
              console.log(retorno);

              res.location('/pagamentos/pagamento/' +
                    pagamento.id);

              var response = {
                dados_do_pagamanto: pagamento,
                cartao: retorno,
                links: [
                  {
                    href:"http://localhost:3000/pagamentos/pagamento/"
                            + pagamento.id,
                    rel:"confirmar",
                    method:"PUT"
                  },
                  {
                    href:"http://localhost:3000/pagamentos/pagamento/"
                            + pagamento.id,
                    rel:"cancelar",
                    method:"DELETE"
                  }
                ]
              }

              res.status(201).json(response);
              return;
        });


      } else {
        res.location('/pagamentos/pagamento/' +
              pagamento.id);

        var response = {
          dados_do_pagamanto: pagamento,
          links: [
            {
              href:"http://localhost:3000/pagamentos/pagamento/"
                      + pagamento.id,
              rel:"confirmar",
              method:"PUT"
            },
            {
              href:"http://localhost:3000/pagamentos/pagamento/"
                      + pagamento.id,
              rel:"cancelar",
              method:"DELETE"
            }
          ]
        }

        res.status(201).json(response);
      }
    }
      });

  });
}
