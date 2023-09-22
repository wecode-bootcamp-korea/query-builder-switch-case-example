-- migrate:up
CREATE TABLE images(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     image_url VARCHAR(3000) NOT NULL,
     product_id INT NOT NULL,
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE images;

