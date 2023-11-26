const express = require('express')
const app = express()
const config = {
  host: 'db-mysql',
  user: 'root',
  database: 'node-db'
};

const mysql = require('mysql');
const db = mysql.createConnection(config);

async function getNames() {
  const sql = `SELECT name FROM people`;

  return new Promise((resolve, reject) => {
    db.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        const names = results.map(result => result.name);
        resolve(names);
      }
    });
  });
}

async function insertName(name) {
  const sql = `INSERT INTO people(name) values('${name}')`;

  return new Promise((resolve, reject) => {
    db.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

app.get('/', async (req, res) => {

  if (req.query.name !== undefined) {
    await insertName(req.query.name);
  }

  const names = await getNames();

  res.send(`
  <html>
    <h1> Full Cycle Rocks </h1>
      <ul>
        ${names?.map(name => `<li>${name}</li>`).join('')}
      </ul>
  </html>
  `)
})

app.listen(3000, () => console.log('Nodejs listening on port 8080!'))
