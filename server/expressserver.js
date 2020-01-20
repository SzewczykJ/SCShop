const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "spaceshop"
});

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: "3308",
//   user: "user",
//   password: "pass",
//   database: "spaceshop"
// });

const Cryptr = require("cryptr");
const cryptr = new Cryptr("secretSpaceships");

app.get("/", (req, res) => {
  connection.query("SELECT * from customers", function(err, rows, fields) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    console.log(rows);
    res.send(JSON.stringify(rows));
  });
});

app.post("/api/register/", (req, res) => {
  const { nickname, species_id, planets_id, password } = req.body;
  const cryptedPass = cryptr.encrypt(password);
  connection.query(
    `insert into customers (Nickname, Species_Id, Planets_Id, Password) values ('${nickname}', '${species_id}', '${planets_id}','${cryptedPass}')`,
    function(err, rows, fields) {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      res.sendStatus(200).send({
        Message: true
      });
    }
  );
});

app.post("/api/auth/", (req, res) => {
  const { nickname, password } = req.body;

  connection.query(
    `SELECT c.Id, c.Nickname, c.Species_Id, c.Planets_Id, c.Password, s.Name as Species_Name from customers c join species s on c.Species_Id = s.Id where c.Nickname = '${nickname}'`,
    function(err, rows, fields) {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      if (rows[0] == undefined) {
        res.status(200).send({
          LoggedIn: false,
          Message: "Invalid credentials"
        });
        return;
      }

      if (cryptr.decrypt(rows[0].Password) == password) {
        connection.query(
          `SELECT * from sessions where customer_id = '${rows[0].Id}'`,
          function(sessionErr, sessionRows, sessionFields) {
            if (sessionErr) {
              res.sendStatus(500);
              throw sessionErr;
            }
            if (sessionRows.length == 0) {
              const currentDate = new Date();
              const nextWeekDate = new Date(
                currentDate.setDate(currentDate.getDate() + 7)
              )
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
              connection.query(
                `INSERT into sessions (Customer_Id, Species_Id, Datestamp) values ('${rows[0].Id}', '${rows[0].Species_Id}', '${nextWeekDate}')`,
                function(
                  insertSessionErr,
                  insertSessionRows,
                  insertSessionFields
                ) {
                  if (insertSessionErr) {
                    res.sendStatus(500);
                    throw sessionErr;
                  }
                  res.status(200).send({
                    LoggedIn: true,
                    Message: null,
                    Species: rows[0].Species_Name
                  });
                }
              );
            } else if (
              sessionRows.length == 1 &&
              sessionRows[0].Datestamp > new Date()
            ) {
              res.status(200).send({
                LoggedIn: true,
                Message: null,
                Species: rows[0].Species_Name
              });
            }
          }
        );
      } else {
        res.status(202).send({
          LoggedIn: false,
          Message: "Invalid credentials",
          Species: null
        });
      }
    }
  );
});

app.get("/api/isLoggedIn/", (req, res) => {
  connection.query(
    `select * from sessions where Customer_Id = '${req.query.customer_id}'`,
    function(err, rows, fields) {
      if (err) {
        res.status(500).send({
          status: "false"
        });
        throw err;
      }
      if (rows.length > 0) {
        if (rows[0].Datestamp > new Date()) {
          res.status(200).send({
            status: "true"
          });
        } else {
          connection.query(
            `delete from sessions where Customer_Id = '${req.query.customer_id}'`,
            function(deleteErr) {
              if (deleteErr) {
                res.sendStatus(500);
              }
              res.status(500).send({
                status: "false"
              });
            }
          );
        }
      } else {
        res.status(500).send({
          status: "false"
        });
      }
    }
  );
});

app.post("/api/logout/", (req, res) => {
  connection.query(
    `delete from sessions where Customer_Id = '${req.body.Customer_Id}'`,
    function(err) {
      if (err) {
        res.sendStatus(500);
      }
      res.status(200).send({
        success: "true"
      });
    }
  );
});

app.get("/api/dashboard/", (req, res) => {
  connection.query(
    `select * from sessions where Customer_Id = '${req.query.customer_id}'`,
    function(err, rows, fields) {
      if (err) {
        res.status(500).send({
          status: "false"
        });
        throw err;
      }
      console.log(rows[0]);
      if (rows.length > 0) {
        if (rows[0].Datestamp > new Date()) {
          res.status(200).send({
            message: `${rows[0].Species_Id}`
          });
        } else {
          connection.query(
            `delete from sessions where Customer_Id = '${req.query.customer_id}'`,
            function(deleteErr) {
              if (deleteErr) {
                res.sendStatus(500);
              }
              res.status(500).send({
                status: "false"
              });
            }
          );
        }
      } else {
        res.status(500).send({
          status: "false"
        });
      }
    }
  );
});

app.get("/api/species/all", (req, res) => {
  connection.query(`select * from species`, function(err, rows) {
    if (err) {
      res.sendStatus(500);
    }
    res.status(200).send(rows);
  });
});

app.post("/api/species/add", (req, res) => {
  connection.query(
    `select * from species where Name = '${req.body.Species_Name}'`,
    function(err, rows) {
      if (err) {
        res.sendStatus(500);
      }
      if (rows[0] != undefined) {
        connection.query(
          `insert into species (Name) values ('${req.body.Species_Name}')`,
          function(insertErr) {
            if (insertErr) {
              res.sendStatus(500);
            }
          }
        );
      }
    }
  );
});

app.get("/api/planets/all", (req, res) => {
  connection.query(`select * from planets`, function(err, rows) {
    if (err) {
      res.sendStatus(500);
    }
    res.status(200).send(rows);
  });
});

app.post("/api/planets/add", (req, res) => {
  connection.query(
    `select * from planets where Name = '${req.body.Planet_Name}'`,
    function(err, rows) {
      if (err) {
        res.sendStatus(500);
      }
      if (rows[0] != undefined) {
        connection.query(
          `insert into planets (Name) values ('${req.body.Planet_Name}')`,
          function(insertErr) {
            if (insertErr) {
              res.sendStatus(500);
            }
          }
        );
      }
    }
  );
});

app.listen(5000, () => {
  console.log(`Server listening on port 5000!`);
});
