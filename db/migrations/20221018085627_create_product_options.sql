-- migrate:up
CREATE TABLE product_options(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     product_id INT NOT NULL,
     size VARCHAR(100) NULL,
     price DECIMAL(10, 3) NOT NULL,
     color VARCHAR(50) NULL,
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE product_options;
