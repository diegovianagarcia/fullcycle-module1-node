const  express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)
connection.connect()
connection.query('drop table if exists people')
connection.query('create table people(id int not null auto_increment, name char(255), primary key(id))')

app.get('/', (req, res) => {
    connection.query(`INSERT INTO people(name) values ('Wesley')`)    
    message = `<h1>Full Cycle Rocks!</h1>
        - Lista de nomes cadastrados em nosso banco de dados: </br>`
    connection.query('select name from people', (err, result, fields) => {
        if (err) throw err;
        result.forEach(row => message += row.name + '</br>')
        res.send(message)
    })
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
