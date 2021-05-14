const db = require("../db");

exports.getRestaurants = async (req, res) => {
  try {
    const { rows: restaurants } = await db.query(
      "SELECT * FROM restaurants AS res LEFT JOIN (SELECT restaurant_id, COUNT(rating) AS reviews_count, TRUNC(AVG(rating),1) AS avg_rating FROM reviews GROUP BY restaurant_id) AS rev ON res.id = rev.restaurant_id;"
    );
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.getRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      "SELECT * FROM restaurants AS res LEFT JOIN (SELECT restaurant_id, COUNT(rating) AS reviews_count, TRUNC(AVG(rating),1) AS avg_rating FROM reviews GROUP BY restaurant_id) AS rev ON res.id = rev.restaurant_id WHERE id = $1;",
      [id]
    );
    const { rows: reviews } = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1;",
      [id]
    );
    res.status(200).json({ ...rows[0], reviews });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.createRestaurant = async (req, res) => {
  const { name, location, price_range } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO restaurants (name,location,price_range) VALUES ($1,$2,$3) RETURNING *;",
      [name, location, price_range]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

exports.updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, location, price_range } = req.body;
  try {
    const { rows } = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *;",
      [name, location, price_range, id]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      "DELETE FROM restaurants WHERE id = $1 RETURNING *;",
      [id]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.addReview = async (req, res) => {
  const { id } = req.params;
  const { name, review, rating } = req.body;

  try {
    const { rows } = await db.query(
      "INSERT INTO reviews (restaurant_id,name,review,rating) VALUES ($1,$2,$3,$4) RETURNING *;",
      [id, name, review, rating]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(409).send(error.message);
  }
};
