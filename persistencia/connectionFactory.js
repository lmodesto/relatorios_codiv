var mysql  = require('mysql');


function createDBConnection(){
  return mysql.createConnection({
//    host: 'localhost',
 //   user: 'root',
 //   password: 'root',
//  database: 'payfast'

host     : '209.97.142.8',
port     : 3333,
user     : 'mule',
password : 'vert1234',
database : 'muleestudo'
  });
}
//function createDBConnection(){
//		return mysql.createConnection({
//			host: 'localhost',
//			user: 'root',
//			password: '',
//			database: 'payfast'
//		});
//}

module.exports = function() {
	return createDBConnection;
}
