//Wasn't able to add Product Quantity to the Console and update it accordingly & to prompt customer about reamining quantity

//Links the MySQL Database & Inquirer NPM Package
var mysql = require('mysql');
var inquirer = require('inquirer');
//Connecting to MySQL Database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "defiance",
  database: "bamazon"
});
//Connection Error Prompt Connection Doesn't work
connection.connect(function (err) {
  if (err) {
    console.error("Connection Error" + err.stack);
    return;
  }
});
//Connection to show table, column, rows from MySQL database
connection.query('SELECT * FROM `products`', function (err, results, fields) {
  if (err) {
    console.log(err);
  }
  for (var i = 0; i < results.length; i++) {
    console.log(results[i].item_id + " " + results[i].product_name + " [" + results[i].price + "]");
  }
  //Executes inquirer prompts that reveales itemId from MySQL and desired Quantity to Purchase
  function bamazonList() {
    inquirer.prompt([{
      name: "itemId",
      type: "input",
      message: "What is the itemID for desired purchase?"
    }, {
      name: "quantity",
      type: "input",
      message: "What is the quantity of your desired purchase?"
    }]).then(function (answer) {
      for (var i = 0; i < results.length; i++) {
        if (results[i].item_id === parseInt(answer.itemId)) {
          //Statement to notify and prompt customer if quantity is out of stock
          if (results[i].stock_quantity < parseInt(answer.quantity)) {
            console.log("Out of Stock, Try Again");
            buyPrompt();
          } else {
            //Variables that calculates the purchase and total quantity
            var totalOrder = parseFloat(answer.quantity * results[i].price).toFixed(2);
            var quan = results[i].stock_quantity - answer.quantity;

            //Variable that executes updated quantity
            var newQuan = 'UPDATE `products` SET `stock_quantity` = ' + quan + ' WHERE `item_id` = ' + answer.itemId
            connection.query(newQuan, function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log(result.affectedRows + " product updated");
              }
            });
            console.log("You bought " + answer.quantity + " " + results[i].product_name);
            console.log("The total is " + totalOrder);
          }
        }
      }
    });
  }
  bamazonList();
});