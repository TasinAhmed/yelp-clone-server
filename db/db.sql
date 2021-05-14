CREATE TABLE restaurants (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50),
    location VARCHAR(50),
    price_range INT
);

INSERT INTO restaurants (id,name,location,price_range) VALUES (456,'Burger King','Toronto',4);

SELECT * FROM restaurants WHERE id = 123;

CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <= 5),
    FOREIGN KEY(restaurant_id) 
        REFERENCES restaurants(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO reviews (restaurant_id,name,review,rating) 
VALUES (1,'Joe', 'nice', 4);

SELECT trunc(AVG(rating),2) AS average_rating FROM reviews WHERE restaurant_id = 2;
SELECT COUNT(rating) FROM reviews WHERE restaurant_id = 2;

SELECT * FROM restaurants AS res LEFT JOIN (SELECT restaurant_id, COUNT(rating) AS reviews_count, TRUNC(AVG(rating),1) AS avg_rating FROM reviews GROUP BY restaurant_id) AS rev ON res.id = rev.restaurant_id;