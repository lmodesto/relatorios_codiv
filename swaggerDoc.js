const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const option = {  

    swaggerDefinition:{  explorer: true,
        info:{
            title: 'API Relatórios CODIV',
            version: '1.0.0',
            description: 'Responsável por todos os relatórios da CODIV',
        },
        basePath: '/api/v1/codiv/relatorios/',
        securityDefinitions: {
            auth: {
                type: "basic"
            }
        },
        security: [
            { auth: [] }
        ]
    },
    apis: ['./rotas/codiv.js'],


};

const specs = swaggerJsdoc(option);

module.exports = (app) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
}