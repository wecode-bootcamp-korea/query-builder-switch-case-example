-- migrate:up
ALTER TABLE orders ADD quantity INT NOT NULL;

-- migrate:down

