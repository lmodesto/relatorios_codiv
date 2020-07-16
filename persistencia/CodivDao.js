function CodivDao(connection) {
    this._connection = connection;
}
const SELECT = " SELECT "
const FROM = " FROM "

const RELATORIO_PROCESSOS_PENDENTES_CITACAO = SELECT.concat(" NUMERO_PROCESSO_CNJ,DATE_FORMAT(DATA_DISTRIBUICAO, '%d/%m/%Y') as DATA_DISTRIBUICAO,SERVENTIA,COMARCA,CODIGO_PROCESSO_ANTIGO ")
                                .concat(FROM)
                                .concat(" CODIV_relatorio_processos_pendentes_citacao ");

const PROCESSOS_SEM_ANDAMENTO = SELECT.concat(" NUMERO_PROCESSO_CNJ,      CODIGO_PROCESSO_ANTIGO,      COMARCA,      SERVENTIA,      DATE_FORMAT(DATA_DISTRIBUICAO, '%d/%m/%Y') as DATA_DISTRIBUICAO ")
                                .concat(FROM)
                                .concat(" CODIV_processos_sem_andamento ");

const DATA_IMPLAMTACAO_SERVENTIA_ECARTA = SELECT.concat(" DATE_FORMAT(DATA_HABITACAO, '%d/%m/%Y') as DATA_HABITACAO,COMARCA, DATE_FORMAT(INICIO_IMPLANTACAO, '%d/%m/%Y') as INICIO_IMPLANTACAO,SERVENTIA")
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

const QTD_PROCESSOS_ELETRONICOS_RELACAO_ACERVO_GERAL = SELECT.concat('DATE_FORMAT(DATA_ATUALIZACAO, "%d/%m/%Y") as DATA_ATUALIZACAO,')
                                .concat('INTERVALO_GRAFICO,')
                                .concat('QUANTIDADE_2019,')
                                .concat('QUANTIDADE_DATA_ATUALIZACAO,')
                                .concat('ANO')
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

const PROCESSOS_DIGITALIZADOS_MENSAL = SELECT.concat(" TOTAL_PROCESSOS_DIGITALIZADOS_MENSAL, ")
                                .concat("INTERVALO_GRAFICO, ")
                                .concat('DATE_FORMAT(DATA_ATUALIZACAO, "%d/%m/%Y") as DATA_ATUALIZACAO')
                                .concat(FROM)
                                .concat(" CODIV_total_processos_digitalizados_mensal ");

const SENTENCIADOS = SELECT.concat(" CODIGO_PROCESSO,SITUACAO_PROCESSO,VALOR_CAUSA,CODIGO_CLASSE,NOME_CLASSE ")
.concat(" ,CODIGO_ASSUNTO,NOME_ASSUNTO,NOME_COMPETENCIA,CODIGO_COMPETENCIA,NOME_COMARCA ")
.concat(" ,CODIGO_COMARCA,NOME_SERVENTIA,CODIGO_SERVENTIA,DATE_FORMAT(DATA_PRIMEIRA_DIST_PROCESSO, '%d/%m/%Y') AS DATA_PRIMEIRA_DIST_PROCESSO ")
.concat(" ,CODIGO_AND,NOME_AND,CODIGO_TIPO_ATO_AND,NOME_TIPO_ATO_AND,CODIGO_ATO_JUIZ_AND,DESCRICAO_ATO_JUIZ_AND ")
.concat(" ,DATE_FORMAT(DATA_INICIO_AND, '%d/%m/%Y') AS DATA_INICIO_AND,DATE_FORMAT(DATA_RETORNO_AND, '%d/%m/%Y') AS DATA_RETORNO_AND ")
.concat(" ,AND_ENCERRADO_S_N,PROCESSO_SETENCIADO_S_N,LOCALIZACAO_PROCESSO ")
.concat(" ,PROCESSO_ELETRONICO_S_N ")
                           .concat(FROM)
                           .concat(" CODIV_sentenciados_cancelados_pagos");

const MAIORES_DEVEDORES = SELECT.concat(" CERTIDAO_REAL ")
                                .concat("CERTIDAO_REAL,CONTRIBUINTE, ")
                                .concat("CNPJ_RAIZ_REAL,NUMERO_PROCESSO_JUDICIAL, ")
                                .concat("COMARCA,CLASSIFICACAO_RATING,SALDO_ATUAL,REGIONAL, SERVENTIA, DATE_FORMAT(DATA_ENVIO, '%d/%m/%Y') as DATA_ENVIO  ")
                                .concat(FROM)
                                .concat(" CODIV_maiores_devedores");

const CODIV_paralisados = SELECT.concat('   COD_COMARCA, DESC_COMARCA, COD_SERVENTIA ,    ')
                           .concat('		DESC_SERVENTIA, COD_COMP_DW, DESC_COMP, COD_CNJ, COD_TIP_AND, DESC_DEST ,                           ')
                           .concat('		DATE_FORMAT(DT_INIC, "%d/%m/%Y") AS DT_INIC,  DESC_AND , COD_DEST, COD_DEST,                            ')
                           .concat('		TIMESTAMPDIFF(DAY,DT_INIC,CURDATE()) AS QTN_DIAS    ,  IF( TIMESTAMPDIFF(DAY,DT_INIC,CURDATE())  > 2000,"Mais de 2000 dias","Menos de 2000 dias") AS PERIODO_TEMPO                        ')
                           .concat(FROM)
                           .concat(" CODIV_paralisados");

const TOTAL_REGISTROS = SELECT.concat(" count(*) as totalRegistros from ");




CodivDao.prototype.ecartaPorResultado = function(filtro, callback) {
    try {
        this._connection.query( ECARTA_POR_RESULDADO + filtro,callback);
    } finally {
        this._connection.end;
    }
}

CodivDao.prototype.reducaoQndProcessosFisicos = function(filtro, callback) {
    try{
        this._connection.query( REDUCAO_QTD_PROCESSOS_FISICOS + filtro,callback);
    } finally {
        this._connection.end;
    }
}

CodivDao.prototype.relatorioprocessosPendentesCitacao = function(filtro, callback) {
    try{ 
        this._connection.query( RELATORIO_PROCESSOS_PENDENTES_CITACAO + filtro,callback);
    } finally {
        this._connection.end;
    }
}

CodivDao.prototype.rankingPorServentia = function(filtro, callback) {
    try{    
        this._connection.query( RANKING_POR_SERVENTIA + filtro,callback);
    } finally {
        this._connection.end;
    }


}

CodivDao.prototype.quantidadeProcessosEletronicosRelacaoAcervoGeral = function(filtro, callback) {
    try{
        this._connection.query( QTD_PROCESSOS_ELETRONICOS_RELACAO_ACERVO_GERAL     + filtro,callback);
    } finally {
        this._connection.end;
    }

}
CodivDao.prototype.metaTrimestralReducaoAcervoGeral = function(filtro, callback) {
    try{
        this._connection.query( META_TRIMESTRAL_REDUCAO_ACERVO_GERAL + filtro,callback);
    } finally {
        this._connection.end;
    }

}

CodivDao.prototype.metaPorServentia = function(filtro, callback) {
    try{
        this._connection.query( META_POR_SERVENTIA + filtro,callback);
    } finally {
        this._connection.end;
    }

}


CodivDao.prototype.processosSemAndamento = function(filtro, callback) {
    try{
        this._connection.query( PROCESSOS_SEM_ANDAMENTO + filtro,callback);
    } finally {
        this._connection.end;
    }

}

CodivDao.prototype.ecartasEmitidosTotal = function(filtro, callback) {
    try{
        this._connection.query( ECARTAS_EMITIDOS_TOTAL + filtro,callback);
    } finally {
        this._connection.end;
    }

}

CodivDao.prototype.ecaryasEmitidosServentia = function(filtro, callback) {
    
    try{ 
        this._connection.query( ECARTAS_EMITIDOS_SERVENTIA + filtro,callback);
    } finally {
        this._connection.end;
    }

}

CodivDao.prototype.dataImplantacaoServentiaEcarta = function(filtro, callback) {
    try{
        this._connection.query( DATA_IMPLAMTACAO_SERVENTIA_ECARTA + filtro,callback);
    } finally {
        this._connection.end;
    }

}

CodivDao.prototype.processosDigitalizadosMensal = function(filtro, callback) {
    try{
        this._connection.query( PROCESSOS_DIGITALIZADOS_MENSAL + filtro,callback);
    } finally {
        this._connection.end;
    }

}

CodivDao.prototype.sentenciados = function(filtro, callback) {
    try{
        this._connection.query( SENTENCIADOS + filtro,callback);
    } finally {
        this._connection.end;
    }

}

CodivDao.prototype.maioresDevedores = function(filtro, callback) {
    try {
        this._connection.query(MAIORES_DEVEDORES +filtro,callback);
    } finally {
        this._connection.end;
    }
}

CodivDao.prototype.paralisados = function(filtro, callback) {
    try{
        this._connection.query(CODIV_paralisados + filtro,callback);
    } finally {
        this._connection.end;
    }

}

CodivDao.prototype.totalRegistros = function(table, callback) {
    try{
        this._connection.query(TOTAL_REGISTROS + table ,callback);
    } finally {
        this._connection.end;
    }
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
