var mysql = require("mysql");

var pool;
exports.connect = function(cb) {
    pool = mysql.createPool({
        host: 'your host',
        user: 'your user',
        password: 'your password',
        database: 'database name'
    });
    createTables();
    cb();
}

exports.get = function() {
    return pool;
}

var createTables = function() {
    pool.query('CREATE TABLE IF NOT EXISTS node_users (id INT(11) NOT NULL AUTO_INCREMENT,' +
                'user VARCHAR(50) NOT NULL UNIQUE,' +
                'password VARCHAR(100) NOT NULL,' +
                'name VARCHAR(100) NOT NULL DEFAULT "",' +
                'role VARCHAR(50) DEFAULT "user",' +
                'PRIMARY KEY(id))',
    function(err, result) {
        if(err) {
            console.log(err);
        }else{
            console.log('node_users table OK');
        }
    });
}
