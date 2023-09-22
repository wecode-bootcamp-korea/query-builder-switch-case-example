-- migrate:up
CREATE TABLE carts(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     product_option_id INT NOT NULL,
     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
     FOREIGN KEY (product_option_id) REFERENCES product_options(id) ON DELETE CASCADE,
     CONSTRAINT carts_user_id_product_option_id_ukey UNIQUE (user_id, product_option_id)
);

-- migrate:down
DROP TABLE carts;