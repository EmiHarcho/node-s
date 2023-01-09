const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3000

const server = http.createServer((req, res) => {
    console.log('Server request')
    res.setHeader('Content-Type', 'text/html') // вспомогательные данные
    // res.write('<h1>Hello world</h1>') //write - записываем ответ / передаем основные данные 
    // res.end() // end - сообщает о том что все нужные данные были добавлены в ответ

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`) 
    let basePath = ''

    switch(req.url) {
        case '/' : 
            basePath = createPath('index')
            break   
            
        case '/about-us' : 
            res.statusCode = 301
            res.setHeader('Location', '/contacts')
            res.end()
            break

        case '/contacts' : 
            basePath = createPath('contacts')
            break

        default: 
            basePath = createPath('error')
            res.statusCode = 404 // 404 ощибка на клиентской части
            break
    }
    fs.readFile(basePath, (err, data) => {
        if(err){
            console.log(err) 
            res.statusCode = 500 // 404 ощибка на клиентской части
            res.end()
        }
        else{
            res.write(data)
            res.end()
        }
    })
})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log('lintening port', PORT)
})
