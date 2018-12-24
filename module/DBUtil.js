var mysql = require('mysql');

var pool = mysql.createPool({
    host : '192.168.10.100',
    database : 'hgdb',
    user : 'root',
    password : 'yasginiwa'
});

/**
 * 查询
 */
exports.query = function (table, sqlParams, sqlValue, callback) {
    pool.getConnection(function (error, connection) {
        if (error) console.log('数据库连接失败' + error);
        var sql = 'select * from' + ' ' + table + ' ' + 'where' + ' ' + sqlParams + '=' + '\'' + sqlValue + '\'';
        connection.query(sql, function (queryError, results) {
            callback(queryError, results);
        });
        connection.release();
    })
};

/**
 * 插入
 */
exports.add = function (sqlParams, callback) {
    pool.getConnection(function (error, connection) {
        if (error) console.log('数据库连接失败' + error);
        var sql = 'insert into t_repair (deviceId, cate, name, reason, result, audioDesc, date, engineer) values(?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(sql, sqlParams, function (insertError, result) {
            callback(insertError, result);
        });
        connection.release();
    })
};

/**
 * 更新
 */
exports.update = function (sqlParams, callback) {
    pool.getConnection(function (error, connection) {
        if (error) console.log('数据库连接失败' + error);
        var sql = 'update t_repair set ? = ? where ? = ?';
        connection.query(sql, sqlParams, function (updateError, result) {
            callback(updateError, result);
        });
        connection.release();
    })
};

/**
 * 删除
 */
exports.delete = function (sqlParams, sqlValue, callback) {
    pool.getConnection(function (error, connection) {
        if (error) console.log('数据库连接失败' + error);
        var sql = 'delete from t_repair where ' + sqlParams + '=' + '\'' + sqlValue + '\'';
        connection.query(sql, sqlParams, function (deleteError, result) {
            callback(deleteError, result);
        });
        connection.release();
    })
};