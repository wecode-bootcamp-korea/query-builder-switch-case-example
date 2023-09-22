-- migrate:up
CREATE TABLE products(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     thumbnail VARCHAR(3000) NOT NULL,
     description text NULL,
     category_id INT NOT NULL,
     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- migrate:down
DROP TABLE products;
