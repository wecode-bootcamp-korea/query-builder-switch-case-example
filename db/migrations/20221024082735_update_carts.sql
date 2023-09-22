-- migrate:up
ALTER TABLE carts ADD quantity INT NOT NULL;

-- migrate:down

