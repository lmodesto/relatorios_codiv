module.exports = function(app){
  app.get('/api/codiv', function(req, res){
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('codiv.');
  });
 } 