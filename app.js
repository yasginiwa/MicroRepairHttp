var express = require('express');
var bodyParser = require('body-parser');
var multiParty = require('multiparty');
var DBUtil = require('./module/DBUtil');
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
app.use(express.static('audios'));


/**
 * get方式路由
 */
app.get('/record', function (req, res) {
    var sqlParams = 'deviceId';
    var sqlValue = '123123123';
    DBUtil.query(sqlParams, sqlValue, function (error, results) {
       if (error) console.log('查询失败' + error);
       res.send(results[0]);
    });
});

/**
 * post方式路由
 */
app.post('/record.do', function (req, res) {
    var sqlParams = [req.body.deviceId, req.body.cate, req.body.name, req.body.reason, req.body.result, req.body.audioDesc, req.body.date, req.body.engineer];
    DBUtil.add(sqlParams, function (error, result) {
        if (error) res.send('{result : failed}');
        res.send('{result : success}');
    });
});

/**
 * post上传路由
 */
app.post('/upload', function (req, res) {
    var form = new multiParty.Form();
    form.dictionary = 'audio';
    form.parser(req, function (error, field, files) {
        console.log(files);
    });
});

app.listen(3002, '192.168.5.214');