-- Base de demostración de las capturas de la web: una tienda ficticia, con
-- nombres y correos inventados (@example.com). Determinista: los mismos datos
-- en cada carga, así las capturas claras y oscuras muestran lo mismo.

CREATE SCHEMA shop;
SET search_path = shop;

CREATE TABLE customers (
  id serial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  city text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id serial PRIMARY KEY,
  sku text NOT NULL UNIQUE,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock integer NOT NULL DEFAULT 0
);

CREATE TABLE orders (
  id serial PRIMARY KEY,
  customer_id integer NOT NULL REFERENCES customers(id),
  total numeric(10,2) NOT NULL,
  paid boolean NOT NULL DEFAULT false,
  created_at timestamp NOT NULL
);

CREATE TABLE order_items (
  order_id integer NOT NULL REFERENCES orders(id),
  product_id integer NOT NULL REFERENCES products(id),
  quantity integer NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);

WITH first(n, i) AS (SELECT * FROM unnest(ARRAY['Martín','Javier','Tomás','Diego','Natalia','Sebastián','Sofía','Bruno','Carla','Lucía','Valeria','Andrés','Elena','Camila','Mateo','Renata','Emilia','Óscar']) WITH ORDINALITY),
     last(n, i) AS (SELECT * FROM unnest(ARRAY['Vega','Rojas','Cruz','Herrera','Castro','Ortiz','Silva','Molina','Méndez','Flores','Ramos','Navarro','Torres','Paredes']) WITH ORDINALITY),
     cities(n, i) AS (SELECT * FROM unnest(ARRAY['Quito','Lima','Montevideo','Madrid','Bogotá','Santiago']) WITH ORDINALITY)
INSERT INTO customers (name, email, city, created_at)
SELECT f.n || ' ' || l.n,
       lower(translate(f.n, 'áéíóúÁÉÍÓÚñ', 'aeiouAEIOUn')) || '.' || lower(translate(l.n, 'áéíóú', 'aeiou')) || g || '@example.com',
       c.n,
       timestamp '2025-11-01' + (g * 3) * interval '1 day'
FROM generate_series(1, 48) g
JOIN first f ON f.i = 1 + (g * 7) % 18
JOIN last l ON l.i = 1 + (g * 5) % 14
JOIN cities c ON c.i = 1 + (g * 11) % 6;

INSERT INTO products (sku, name, price, stock) VALUES
  ('KB-75', 'Mechanical keyboard 75%', 89.00, 34),
  ('MS-02', 'Wireless mouse', 29.50, 120),
  ('MN-27', '27" monitor', 249.00, 12),
  ('HD-01', 'USB-C hub', 39.90, 58),
  ('DS-10', 'Desk mat', 19.00, 200),
  ('LT-30', 'Laptop stand', 45.00, 41),
  ('WC-4K', '4K webcam', 119.00, 9),
  ('HP-NC', 'Noise-cancelling headphones', 179.00, 17);

INSERT INTO orders (customer_id, total, paid, created_at)
SELECT 1 + (g * 13 + g / 7) % 48, 0, g % 6 <> 0,
       timestamp '2026-05-02' + (g * 37 % 150) * interval '1 day' + ((g * 53) % 600) * interval '1 minute' + interval '8 hours'
FROM generate_series(1, 140) g;

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT o.id, p.id, 1 + (o.id * 7 + p.id * 3) % 4, p.price
FROM orders o JOIN products p ON (o.id * 5 + p.id * 3) % 7 < 2;

UPDATE orders o SET total = s.t
FROM (SELECT order_id, sum(quantity * unit_price) t FROM order_items GROUP BY 1) s
WHERE s.order_id = o.id;
DELETE FROM orders WHERE total = 0;

-- Dos clientes sin pedidos: la escena de revisión borra uno sin chocar con
-- la clave foránea.
INSERT INTO customers (name, email, city, created_at) VALUES
  ('Gabriela Núñez', 'gabriela.nunez@example.com', 'Santiago', '2026-09-30'),
  ('Pablo Ibarra', 'pablo.ibarra@example.com', 'Bogotá', '2026-10-02');

CREATE VIEW customer_totals AS
  SELECT c.id, c.name, count(o.id) AS orders, coalesce(sum(o.total), 0) AS spent
  FROM customers c LEFT JOIN orders o ON o.customer_id = c.id AND o.paid
  GROUP BY c.id, c.name;

CREATE FUNCTION restock(p_sku text, p_qty integer) RETURNS integer LANGUAGE sql AS
  $$ UPDATE shop.products SET stock = stock + p_qty WHERE sku = p_sku RETURNING stock $$;

-- Solo el esquema shop en el explorador.
DROP SCHEMA public;
ALTER DATABASE shop SET search_path = shop;
