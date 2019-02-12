DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT auto_increment,
  product_name VARCHAR(200),
  department_name VARCHAR(50),
  price DECIMAL(10, 2),
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
	("Vans T-shirt", "Clothing", 20.99, 500), 
    ("Levi's Jeans", "Clothing", 50.15, 400), 
    ("Vans Sk8 Hi-Tops", "Shoes", 59.60, 200),
    ("Timberland Boots", "Shoes", 72.44, 250), 
    ("Gibson Les Paul", "Instruments", 999.50, 10),
    ("Epiphone Flying V", "Instruments", 400.89, 50),
    ("Boondock Saints", "Movies", 10.95, 700),
    ("Trainspotting", "Movies", 15.40, 600),
    ("Grilled Chicken Fillets", "Foods", 19.99, 150),
    ("Quinoa Brown Rice", "Foods", 12.50, 1);
    
    SELECT * FROM products;
    
    UPDATE products SET stock_quantity = stock_quantity + 10 WHERE item_id = 1;
    