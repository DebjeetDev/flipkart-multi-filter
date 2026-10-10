const products = [
  ["Pixel 8", "Mobile", 44999, 4.4, true],
  ["Moto G", "Mobile", 14999, 4.1, true],
  ["Nokia G", "Mobile", 8999, 3.8, true],
  ["iPhone 15", "Mobile", 69999, 4.7, true],
  ["Galaxy A15", "Mobile", 12999, 4.0, false],
  ["HP Laptop", "Electronics", 45999, 4.5, true],
  ["Realme C", "Mobile", 50000, 4.0, true],
];

const isString = (value) => typeof value === "string" && value.trim() !== "";

const isNumber = (value) => typeof value === "number" && Number.isFinite(value);

const isBoolean = (value) => typeof value === "boolean";

function getFlipkartDeals(products) {
  if (!Array.isArray(products)) {
    return {
      status: 400,
      ok: false,
      error: "input products must be an array",
    };
  }

  const cleanProducts = products.reduce((acc, product) => {
    if (!Array.isArray(product)) return acc;

    const [name, category, price, rating, inStock] = product;
   if (
      !isString(name) ||
      !isString(category) ||
      !isNumber(price) ||
      price < 0 ||
      !isNumber(rating) ||
      rating < 0 ||
      rating > 5 ||
      !isBoolean(inStock)
    ) {
      return acc;
    }
    acc.push([name, category, price, rating, inStock]);
    return acc;
  }, []);

  const eligibleProducts = cleanProducts.filter(
    (p) => p[1] === "Mobile" && p[2] <= 50000 && p[3] >= 4 && p[4] === true,
  );

  const displayRows = eligibleProducts
    .map((m) => [m[0], m[2], m[3]])
    .toSorted((a, b) => a[1] - b[1]);

  return {
    status: 200,
    ok: true,
    data: displayRows,
    productsCount : displayRows.length
  };
}

// console.log(getFlipkartDeals(products))
module.exports = { getFlipkartDeals };