let dbparams={
	hsot: 'localhost',
	user: 'pratik',
	password: 'cdac',
	database: 'islampur',
	port: 3306
};

const mysql = require('mysql2');
const con =mysql.createConnection(dbparams);

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');
const { response } = require('express');






app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



//var result;

app.get("/getbookdetails", (req, resp) => {
	let input = req.query.x;
  
	let output = {
	  status: false,
	  bookdetails: { bookid: 0, bookname: "xyz", price: 0 },
	};
  
	con.query("select * from book where bookid=?", [input], (err, rows) => {
	  if (rows.length > 0) {
		output.status = true;
		output.bookdetails = rows[0];
	  }
	  resp.send(output);
	});
  });
  
  app.get("/updatebookdetails", (req, resp) => {
	let bookid = req.query.x;
	let price = req.query.z;
  
	let output = { status: false, bookdetails: { bookid: 0, price: 0 } };
	con.query(
	  "update book set price=? where bookid=?",
	  [price, bookid],
	  (err, rows) => {
		if (err) {
		  console.log("error occure" + toString(err));
		} else if (rows.affectedRows > 0) {
		  output.status = true;
		}
		resp.send(output);
	  }
	);
  });


		

	
app.listen(900, function () {
    console.log("server listening at port 900...");
});