var express = require('express');
var bodyParser = require('body-parser');
var multiParty = require('multiparty');
var DBUtil = require('./module/DBUtil');
var jwt = require('jsonwebtoken');

const secretKey = 'hg';

/**
 * 实例化express
 * @express express对象
 */
var app = express();


/**
 * 设置中间件  编码模式
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * 设置audio为静态文件夹
 */
app.use('/audios', express.static('audios'));

/**
 * 接口验证中间件
 */
app.use(function (req, res, next) {
    if (req.url !== '/login' && req.url !== '/upload') {
        var token = req.body.token;
        jwt.verify(token, secretKey, function (error, decode) {
            if (error) {
                res.json({
                    status: 403,
                    msg: 'Token Invalid',
                    result: []
                });
            } else {
                next();
            }
        })
    } else {
        next();
    }
});


/**
 * post登录路由
 */
app.post('/login', function (req, res) {
    var user = req.body.user;
    DBUtil.query('t_authUsers', 'user', user, function (error, results) {
        if (results.length) {
            var token = jwt.sign({user: user}, secretKey, {'expiresIn': '365 days'});
            res.json({
                status: 1,
                msg: 'Authorized OK',
                token: token
            })
        } else {
            res.json({
                status: 0,
                msg: 'Authorized Failed'
            })
        }
    })
});


/**
 * get方式路由
 */
app.get('/record', function (req, res) {
    var table = 't_repair';
    var sqlParams = 'deviceId';
    var sqlValue = 'm110503121';
    DBUtil.query(table, sqlParams, sqlValue, function (error, results) {
        if (error) res.json({        // 失败时返回
            status: 0,
            msg: 'failed',
            results: []
        });

        // 成功时返回
        res.json({
            status: 1,
            msg: 'ok',
            result: results
        });
    });
});

/**
 * post方式路由
 */
app.post('/record.do', function (req, res) {
    var sqlParams = [req.body.deviceId, req.body.cate, req.body.name, req.body.reason, req.body.result, req.body.audioDesc, req.body.date, req.body.engineer];
    DBUtil.add(sqlParams, function (error, result) {
        if (error) res.json({   // 失败时返回
            status: 0,
            msg: 'failed',
            results: []
        });

        //  成功时返回
        res.json({
            status: 1,
            msg: 'ok',
            result: result
        });
    });
});

/**
 * post上传路由
 */
app.post('/upload', function (req, res) {
    var form = new multiParty.Form();
    form.uploadDir = 'audios';
    form.keepExtensions = true;
    form.parse(req, function (error, fields, files) {
        if (error) res.json({
            status: 0,
            msg: 'Upload Failed'
        });
        if (files != null) {
            res.json({
                status: 1,
                msg: 'ok',
                audioUrl: 'http://192.168.10.100:3002/' + files.audio[0].path
            })
        } else {
            res.json({
                status: 0,
                msg: 'Audio Null',
                audioUrl: null
            })
        }
    });
});

app.post('/devicerecord', function (req, res) {
    var table = 't_repair';
    var sqlParams = 'deviceId';
    var sqlValue = req.body.scanCode;
    DBUtil.query(table, sqlParams, sqlValue, function (error, results) {
        if (error) res.json({   //  查询失败返回
            status: 0,
            msg: 'Query Failed',
            results: []
        });

        res.json({  //  查询成功
            status: 1,
            msg: 'ok',
            result: results
        })
    })
});

app.post('/userrecord', function (req, res) {
    var table = 't_repair';
    var sqlParams = 'engineer';
    var sqlValue = req.body.engineer;
    DBUtil.query(table, sqlParams, sqlValue, function (error, results) {
        if (error) res.json({   //  查询失败返回
            status: 0,
            msg: 'Query Failed',
            results: []
        });

        res.json({  // 查询成功返回
            status: 1,
            msg: 'ok',
            result: results
        })
    })
});

app.listen(3002, '192.168.10.100');