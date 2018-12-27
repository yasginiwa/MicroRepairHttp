var mysql = require('mysql');

var pool = mysql.createPool({
    host : '192.168.0.172',
    database : 'hgdb',
    user : 'root',
    password : 'yasginiwa'
});

/**
 * 普通查询
 */
exports.query = function (table, sqlParams, sqlValue, callback) {
    pool.getConnection(function (error, connection) {
        if (error) console.log('query数据库连接失败' + error);
        var sql = 'select * from ' + table + ' where ' + sqlParams + ' = ?';
        var param = [sqlValue];
        connection.query(sql, param, function(queryError, results) {
            callback(queryError, results);
        });
        connection.release();
    })
};

/**
 * 分页查询
 */
exports.pagingQuery = function(table, sqlParams, sqlValue, page, callback) {
    pool.getConnection(function (error, connection) {
        if (error) console.log('pagingQuery数据库连接失败' + error);
        const sql = 'select * from ' + table + ' where ' + sqlParams + ' = ? order by r_id desc limit ' + page * 20 + ',20';
        const param = [sqlValue];
        connection.query(sql, param, function (queryError, results) {
            callback(queryError, results);
        });
        connection.release();
    })
}

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