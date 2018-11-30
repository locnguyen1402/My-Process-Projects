const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const soap = require('soap');

// connect to Mongoose database
const idolDB = require('./db');

// define my IdolService for wsdl
const idolservice = {
    Idol_Service: {
        Idol_Port: {
            sayHello: (args) => {
                return {
                    greeting: `Welcome ${args.name} to my webservice`
                };
            },
            load: (args, cb) => {
                idolDB.find(args, (err, res) => {
                    if (err)
                        throw err;
                    else
                        cb(res);
                });
            },

            create: (idol) => {
                new idolDB(idol).save((err) => {
                    if (err) throw err;
                    console.log('saved idol' + idol);
                });
            },

            delete: (idolName) => {
                idolDB.deleteOne(idolName, (err) => {
                    if (err) throw err;
                    console.log('deleted' + res);
                });
            },

            edit: (data) => {
                //console.log(data.byName);
                //console.log(data.newAttribute);
                idolDB.findOneAndUpdate(data.byName, {
                    $set: data.newAttribute
                }, {
                    upsert: false
                }, (err, data) => {
                    if(err){
                        console.log('invalid name');
                        throw err;
                    };
                    console.log(data);
                });
            }
        }
    }
};

// read wsdl file
const xml = require('fs').readFileSync('./IdolService.wsdl', 'utf8');

app.use(bodyParser.raw({
    type: () => {
        return true;
    },
    limit: '5mb'
}));

// static files
app.use('/public', express.static('public'));

// define routes
app.get('/gui', (req, res) => {
    console.log(`request was made: ${req.url}`);
    res.sendFile(__dirname + '/gui.html');
});

app.get('/readme', (req, res) => {
    console.log(`request was made: ${req.url}`);
    const path = __dirname + '/readme.md';
    res.sendFile(path);
});


// using socket to make connection with Client
io.on('connection', (socket) => {
    console.log('a user connected');
    soap.createClient('http://localhost:6969/wsdl?wsdl', (err, client) => {

        // using my IdolService
        client.sayHello({
            name: "HoangAnh"
        }, (err, result) => {
            let obj = {
                result: result,
                describe: client.describe(),
                lastRequest: client.lastRequest,
                lastResponse: client.lastResponse,
            };
            // đã gửi thành công nhưng chưa chuyển thành XML đc
            io.emit('hello', obj);
        });

        client.load({}, (err, result) => {;
            io.emit('load', result.body);
        });


        socket.on('new-idol', (res) => {
            console.log(res);
            client.create({
                name: res.name,
                phone: res.phone,
                description: res.description,
                img: res.img
            }, (err, result) => {
                console.log(client.describe());
            });
        });

        socket.on('delete', (res) => {
            console.log(res);
            client.delete(res, (err, result) => {
                console.log(client.describe());
            });
        });

        socket.on('edit', (res) => {
            client.edit(res, (err, result) => {
                console.log(client.describe());
            });
        });
    });
});


http.listen(6969, () => {
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    console.log(`click http://localhost:6969/wsdl?wsdl to see`);
    console.log(`click http://localhost:6969/gui to see`);
    console.log(`click http://localhost:6969/readme to see`);

    // bind SOAP with WebServer
    soap.listen(app, '/wsdl', idolservice, xml);
});