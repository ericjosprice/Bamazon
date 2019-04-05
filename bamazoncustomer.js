var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require('easy-table')

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 8889,
    // Your username
    user: "root",
    // Your password
    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    onConnect();

});

function onConnect() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res);
        askCustomer();
    });
}

// The app should then prompt users with two messages.
function askCustomer() {
    inquirer
        .prompt({
            name: "welcome",
            type: "list",
            message: "Would you like to buy anything?",
            choices: ["Yes", "No"]
        })
        .then(function (answer) {
            switch (answer.welcome) {
                case "Yes":
                    buying();
                    break;

                case "No":
                    console.log("Thank you, come again.");
                    connection.end();
                    break;
            }
        });
}

function buying() {
    // The first should ask them the ID of the product they would like to buy.

    // The second message should ask how many units of the product they would like to buy.
    inquirer.prompt([{
                name: "buy",
                type: "input",
                message: "Please enter the item number of the item you wish to procure.",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "units",
                type: "input",
                message: "Please enter the quantity you'd like to buy.",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            var query = "SELECT stock_quantity, price FROM products WHERE item_id= ?";
            connection.query(query, [answer.buy], function (err, res) {
                if (err) throw err;
                if (res[0].stock_quantity >= parseInt(answer.units)) {
                    var nNewStock = res[0].stock_quantity - parseInt(answer.units);
                    var nCost= res[0].price* parseInt(answer.units);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                stock_quantity: nNewStock
                            },
                            {
                                item_id: parseInt(answer.buy)
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Your total was: $" + nCost);
                            console.log("Thank you for shopping with Bamazon. Your purchase has been processed.")
                            

                            setTimeout(onConnect,4000);
                        }
                    );

                } else if (res[0].stock_quantity < parseInt(answer.units)) {
                    
                    console.log("We currently have " + res[0].stock_quantity + " in stock. My apologies, we do not have enough to complete your order.");
                    setTimeout(onConnect, 4000);
                }
            });
        });
}




// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.