codiv.prototype.maiores_devedores = function(filtro, callback) {
  this._connection.query('select * from CODIV_maiores_devedores'+filtro,callback);
}

CodivDao.prototype.paralisados = function(filtro, callback) {
  this._connection.query('select * from CODIV_paralisados'+filtro,callback);
}

CodivDao.prototype.totalRegistros = function(table, callback) {
  this._connection.query('select count(*) as totalRegistros from '+table ,callback);
}






CodivDao.prototype.salva = function(pagamento,callback) {
  this._connection.query('INSERT INTO pagamentos_payfast SET ?', pagamento, callback);
}

CodivDao.prototype.atualiza = function(pagamento,callback) {
  this._connection.query('UPDATE pagamentos_payfast SET status = ? where id = ?', [pagamento.status, pagamento.id], callback);
}


CodivDao.prototype.buscaPorId = function (id,callback) {
  this._connection.query("select * from pagamentos_payfast where id = ?",[id],callback);
}

module.exports = function(){
  return CodivDao;
};



//module.exports = function(app){
 // app.get('/api/codiv', function(req, res){
 //   console.log('Recebida requisicao de teste na porta 3000.')
 //   res.send('codiv.');
 // });


//}


