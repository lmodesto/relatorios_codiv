function CodivDao(connection) {
    this._connection = connection;
}

CodivDao.prototype.maioresDevedores = function(filtro, callback) {
    this._connection.query("SELECT  CERTIDAO_REAL,CONTRIBUINTE,CNPJ_RAIZ_REAL,NUMERO_PROCESSO_JUDICIAL,COMARCA,CLASSIFICACAO_RATING,SALDO_ATUAL,REGIONAL                 FROM CODIV_maiores_devedores " +filtro,callback);
}

CodivDao.prototype.paralisados = function(filtro, callback) {
    this._connection.query(process.env.CODIV_PARALISADOS + filtro,callback);
}

CodivDao.prototype.totalRegistros = function(table, callback) {
    this._connection.query("select count(*) as totalRegistros from " + table ,callback);
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
