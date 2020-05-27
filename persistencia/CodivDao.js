function CodivDao(connection) {
    this._connection = connection;
}

CodivDao.prototype.maioresDevedores = function(filtro, callback) {
    this._connection.query(process.env.CODIV_MAIORES_DEVEDORES +filtro,callback);
}

CodivDao.prototype.paralisados = function(filtro, callback) {
    this._connection.query(process.env.CODIV_PARALISADOS + filtro,callback);
}

CodivDao.prototype.totalRegistros = function(table, callback) {
    this._connection.query(process.env.TOTAL_REGISTROS + table ,callback);
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
