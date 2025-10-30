const express = require('express');
const mysql = require('mysql2')

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'app_db'
}

const pool = mysql.createPool(config).promise()
const create_table = `
  CREATE TABLE IF NOT EXISTS people(
    id int auto_increment primary key,
    name varchar(255) not null
  )
`
pool.query(create_table)
  .then(() => console.log('tabela OK para uso'))
  .catch(err => console.error(err));

const app = express()

app.get('/', async (req, res) => {

  const insert_into = `INSERT INTO people (name)
  VALUES ('Fulano');
  `

  await pool.query(insert_into)

  const [rows] = await pool.query("select name from people")
  
  const names = rows.map(p => `<li>${p.name}</li>`).join('')

  const html = `<h1>Full Cycle Rocks!</h1><ul>${names}</ul>` 

  res.send(html)

})


app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});