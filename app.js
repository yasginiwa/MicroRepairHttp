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
app.use('/audios', express.static('audios'));


/**
 * get方式路由
 */
app.get('/record', function (req, res) {
    var sqlParams = 'deviceId';
    var sqlValue = 'm110503121';
    DBUtil.query(sqlParams, sqlValue, function (error, results) {
       if (error) res.json({        // 失败时返回
           status : 0,
           msg : 'failed',
       });

       // 成功时返回
       res.json({
           status: 1,
           msg : 'ok',
           result : results
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
            status : 0,
            msg : 'failed'
        });

        //  成功时返回
        res.json({
            status : 1,
            msg : 'ok',
            result : result
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
            status : 0,
            msg : 'failed'
        });

        res.json({
            status : 1,
            msg : 'ok',
            audioUrl : 'http://127.0.0.1:3002/' + files.audio[0].path
        });
    });
});

app.listen(3002, '127.0.0.1');