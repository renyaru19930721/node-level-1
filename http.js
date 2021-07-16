const http = require("http");
const fs = require("fs");
const template = require("art-template");
const url = require("url");
let comments = [{
        name: '只能告诉你',
        message: '今天天气不错',
        dateTime: '2021-07-15'
    },
    {
        name: '只能告诉你',
        message: '今天天气不错',
        dateTime: '2021-07-15'
    },
    {
        name: '只能告诉你',
        message: '今天天气不错',
        dateTime: '2021-07-15'
    },
    {
        name: '只能告诉你',
        message: '今天天气不错',
        dateTime: '2021-07-15'
    }
]
http.createServer(function (req, res) {
        // var url = req.url
        var parseObj = url.parse(req.url, true)
        var pathName = parseObj.pathname
        if (pathName === '/') {
            fs.readFile('./view/index.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found')
                }
                let htmlStr = template.render(data.toString(), {
                    comments: comments
                })
                res.end(htmlStr)

            })
        } else if (pathName == '/post') {
            fs.readFile('./view/post.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found')
                }
                res.end(data)
            })
        } else if (pathName == '/pinglun') {
            // res.end(JSON.stringify(parseObj.query))
            var comment = parseObj.query
            comment.dateTime = '2021-01-05'
            comments.push(comment)
            res.statusCode = 302
            res.setHeader('Location','/')
            res.end()
            console.log('收到品滚');
            // fs.readFile('./view/post.html', function (err, data) {
            //     if (err) {
            //         return res.end('404 Not Found')
            //     }
            //     res.end(data)
        } else if (pathName.indexOf('/public/') === 0) {
            fs.readFile('.' + pathName, function (err, data) {
                if (err) {
                    return res.end('404 Not Found')
                }
                res.end(data)

            })
        } else {
            fs.readFile('./view/404.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found')
                }
                res.end(data)

            })
        }

    })
    .listen(3000, function () {
        console.log('running');

    })