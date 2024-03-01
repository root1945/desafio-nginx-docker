const express = require('express')
const faker = require('faker')
const app = express()
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
}

const mysql = require('mysql')

const connection = mysql.createConnection(config)

const createTableQuery = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255))`

app.get('/', (req, res) => {
  const name = faker.name.findName()

  connection.query(createTableQuery)

  connection.query(`INSERT INTO people (nome) VALUES ('${name}')`)

  connection.query(`SELECT nome FROM people`, (error, results, fields) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${!!results?.length ? results.map(el => `<li>${el.nome}</li>`).join('') : ''}
      </ol>
    `)
  })
})

app.listen(port, () => {
  console.log('Listen On:', port);
})