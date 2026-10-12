SELECT id, customer_id, total, created_at
FROM shop.orders
WHERE NOT paid
ORDER BY created_at;
