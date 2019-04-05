# BAMazon

Created during Week 12 of Rutgers Coding Bootcamp. The goal was to create an Amazon-like store front using Node.js and MySQL.

## Getting Started

- Clone repo https://github.com/ericjosprice/Bamazon.git
- In your terminal execute $ 'npm install'
- install mysql and create a database and table according to the schema.sql file
- start your application server, such as MAMP

### What the application does

1. `BamazonCustomer.js`

    * View the products that Bamazon has to offer

    * The customer is prompted to select a product by typing its product ID number. Subsequently, the customer will be prompted to enter a numerical value for the quantity they wish to buy

      * Bamazon determines whether or not there is enough of that product to fill the customer's order. if there is, the order is completed. If there is not, then the customer is told there is not enough of that item to fill their order and they are shown the exact amount of stock that is available.
      * Once the transaction is complete Bamazon updates the item's quantity in the MySQL database.


## Demo Videos

* BamazonCustomer.js ## https://drive.google.com/file/d/1YKh9vaG5y0Pz6JWZ9FLQ3c07FmWnr9JD/view

## Technologies used
- Node.js
- Inquire NPM Package (https://www.npmjs.com/package/inquirer)
- MYSQL NPM Package (https://www.npmjs.com/package/mysql)

### Prerequisites

```
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Create a MYSQL database called 'Bamazon', reference schema.sql
```
## Author

* **Eric Price**
