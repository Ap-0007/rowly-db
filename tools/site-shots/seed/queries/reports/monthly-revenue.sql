SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue
FROM shop.orders
WHERE paid
GROUP BY 1
ORDER BY 1;
