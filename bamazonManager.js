//Have an error from adding new product to the mySQL database that I wasnt able to figure out

//Loads MySQL Database and Inquirer NPM Package
var mysql = require('mysql');
var inquirer = require('inquirer');

//Link & Connect to MySQL Database "bamazon"
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'defiance',
  database : 'bamazon'
});
//Connection error prompt
connection.connect(function(err) {
  if (err) {
    console.error("Connection Error: " + err.stack);
    return;
  }
});
//Function for manager prompts menu
function manager() {
  inquirer.prompt( {
    name: "manager",
    type: "list",
    message: "What would you like to do?",
    choices: ["Available Items", "Low Inventory", "Add Quantity", "Add New Product", "Exit"]
  }).then(function(answer) {
    switch (answer.manager) {
      case "Available Items":
        return listItems();

      case "Low Inventory":
        return lowInventory();

      case "Add Quantity":
        return addQuan();

      case "Add New Product":
        return addItem();

      case "Exit":
        return exit();
    }
  });
};

//Function that executews full item list view
function listItems() {
  connection.query('SELECT * FROM `products`', function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("\n***Available products:\n");
    for (var i=0; i<results.length; i++) {
      console.log(
        results[i].item_id + " " + 
        results[i].product_name + " [" + 
        results[i].price + "] Qty: " + 
        results[i].stock_quantity
      );
    }
    console.log("\n**************\n");
    manager();
  })
};

//Function that initializes the list of low inventory under Qty: 3
function lowInventory() {
  connection.query('SELECT * FROM `products` WHERE `stock_quantity` < 3', function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("\nYou have low stock in:\n");
    for (var i=0; i<results.length; i++) {
      console.log( 
        results[i].item_id + " " + 
        results[i].product_name + 
        results[i].price + " [Remaining amount: " + 
        results[i].stock_quantity + "]"
      );
    }
    console.log("\n*************\n");
    manager();
  })
};

//Function that adds to a product's quantity
function addQuan() {
  inquirer.prompt( [{
    name: "itemId",
    type: "input",
    message: "Add Quantity to which Item id?"
  }, {
    name: "addQty",
    type: "input",
    message: "Enter quantity of items to ADD"
  }]).then(function(answer) {
    var sql = "UPDATE `products` SET `stock_quantity` = `stock_quantity` + " + answer.addQty + " WHERE `item_id` = " + answer.itemId;
    connection.query(sql, function(err, result, fields) {
      console.log("\n" + result.affectedRows + " item updated");
      console.log("\n*************\n");
      manager();
    })
  })
};

//Function that executes that adds an product to item list
function addItem() {
  inquirer.prompt([{
    name: "name",
    type: "input",
    message: "What item would you like to add?"
  }, {
    name: "department",
    type: "list",
    message: "Which department for listing?", 
    choices: ["Clothing", "Shoes", "Instruments", "Movies", "Foods"]
  }, {
    name: "value",
    type: "input",
    message: "What is the value of product?"
  }, {
    name: "qty",
    type: "input",
    message: "What is the available quantity of the product?"
  }]).then(function(answer) {
    var sql = "INSERT INTO `products` (product_name, department_name, price, stock_quantity) VALUES ";
    var values = "('" + answer.name + "', '" + answer.dept + "', " + answer.price + ", " + answer.qty + ")";
    connection.query(sql + values, function(err, result, fields) {
      console.log("\n" + result.affectedRows + " item was added");
      console.log("\n*************\n");
      manager();    
    })
  })
};
//Function to Exit Manager Prompt Menu
function exit() {
  connection.end();
}

manager();