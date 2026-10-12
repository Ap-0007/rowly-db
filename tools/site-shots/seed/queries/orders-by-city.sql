SELECT c.city, count(*) AS orders, sum(o.total) AS revenue
FROM shop.orders o
JOIN shop.customers c ON c.id = o.customer_id
WHERE o.paid
GROUP BY c.city
ORDER BY revenue DESC;
