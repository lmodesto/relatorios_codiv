function CodivDao(connection) {
    this._connection = connection;
}
const SELECT = " SELECT "
const FROM = " FROM "


const RELATORIO_PROCESSOS_PENDENTES_CITACAO = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_relatorio_processos_pendentes_citacao ");

const PROCESSOS_SEM_ANDAMENTO = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_processos_sem_andamento ");

const DATA_IMPLAMTACAO_SERVENTIA_ECARTA = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_data_implantacao_serventia_ecarta ");
								
const ECARTAS_EMITIDOS_SERVENTIA = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_ecartas_emitidos_serventia ");			
								
const ECARTAS_EMITIDOS_TOTAL = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_ecartas_emitidos_total ");				

const META_POR_SERVENTIA = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_meta_por_serventia ");	
								
const META_TRIMESTRAL_REDUCAO_ACERVO_GERAL = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_meta_trimestral_reducao_acervo_geral ");		

const QTD_PROCESSOS_ELETRONICOS_RELACAO_ACERVO_GERAL = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_quantidade_processos_eletronicos_relacao_acervo_geral ");

const RANKING_POR_SERVENTIA = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_ranking_por_serventia ");
								
const REDUCAO_QTD_PROCESSOS_FISICOS = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_reducao_quantidade_processos_fisicos ");
								
const ECARTA_POR_RESULDADO = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_ecarta_por_resultado ");	

const PROCESSOS_DIGITALIZADOS_MENSAL = SELECT.concat(" * ")
                                .concat(FROM)
                                .concat(" CODIV_total_processos_digitalizados_mensal ");

const SENTENCIADOS = SELECT.concat(" * ")
                           .concat(FROM)
                           .concat(" CODIV_sentenciados_cancelados_pagos");

const MAIORES_DEVEDORES = SELECT.concat(" CERTIDAO_REAL ")
                                .concat("CERTIDAO_REAL,CONTRIBUINTE, ")
                                .concat("CNPJ_RAIZ_REAL,NUMERO_PROCESSO_JUDICIAL, ")
                                .concat("COMARCA,CLASSIFICACAO_RATING,SALDO_ATUAL,REGIONAL, SERVENTIA, DATA_ENVIO  ")
                                .concat(FROM)
                                .concat(" CODIV_maiores_devedores");

const CODIV_paralisados = SELECT.concat(" * ")
                           .concat(FROM)
                           .concat(" CODIV_paralisados");

const TOTAL_REGISTROS = SELECT.concat(" count(*) as totalRegistros from ");




CodivDao.prototype.ecartaPorResultado = function(filtro, callback) {
    this._connection.query( ECARTA_POR_RESULDADO + filtro,callback);
}

CodivDao.prototype.reducaoQndProcessosFisicos = function(filtro, callback) {
    this._connection.query( REDUCAO_QTD_PROCESSOS_FISICOS + filtro,callback);
}

CodivDao.prototype.relatorioprocessosPendentesCitacao = function(filtro, callback) {
    this._connection.query( RELATORIO_PROCESSOS_PENDENTES_CITACAO + filtro,callback);
}

CodivDao.prototype.rankingPorServentia = function(filtro, callback) {
    this._connection.query( RANKING_POR_SERVENTIA + filtro,callback);
}

CodivDao.prototype.quantidadeProcessosEletronicosRelacaoAcervoGeral = function(filtro, callback) {
    this._connection.query( QTD_PROCESSOS_ELETRONICOS_RELACAO_ACERVO_GERAL     + filtro,callback);
}
CodivDao.prototype.metaTrimestralReducaoAcervoGeral = function(filtro, callback) {
    this._connection.query( META_TRIMESTRAL_REDUCAO_ACERVO_GERAL + filtro,callback);
}

CodivDao.prototype.metaPorServentia = function(filtro, callback) {
    this._connection.query( META_POR_SERVENTIA + filtro,callback);
}

CodivDao.prototype.processosSemAndamento = function(filtro, callback) {
    this._connection.query( PROCESSOS_SEM_ANDAMENTO + filtro,callback);
}

CodivDao.prototype.ecartasEmitidosTotal = function(filtro, callback) {
    this._connection.query( ECARTAS_EMITIDOS_TOTAL + filtro,callback);
}

CodivDao.prototype.ecaryasEmitidosServentia = function(filtro, callback) {
    this._connection.query( ECARTAS_EMITIDOS_SERVENTIA + filtro,callback);
}

CodivDao.prototype.dataImplantacaoServentiaEcarta = function(filtro, callback) {
    this._connection.query( DATA_IMPLAMTACAO_SERVENTIA_ECARTA + filtro,callback);
}

CodivDao.prototype.processosDigitalizadosMensal = function(filtro, callback) {
    this._connection.query( PROCESSOS_DIGITALIZADOS_MENSAL + filtro,callback);
}

CodivDao.prototype.sentenciados = function(filtro, callback) {
    this._connection.query( SENTENCIADOS + filtro,callback);
}

CodivDao.prototype.maioresDevedores = function(filtro, callback) {
    this._connection.query(MAIORES_DEVEDORES +filtro,callback);
}

CodivDao.prototype.paralisados = function(filtro, callback) {
    this._connection.query(CODIV_paralisados + filtro,callback);
}

CodivDao.prototype.totalRegistros = function(table, callback) {
    this._connection.query(TOTAL_REGISTROS + table ,callback);
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
