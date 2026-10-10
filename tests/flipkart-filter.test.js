const assert = require("node:assert/strict");
const { getFlipkartDeals } = require("../src/flipkart-filter");

function checkTest(testName, actual, expected) {
  assert.deepEqual(actual, expected);
  console.log(`✅ PASS — ${testName}`);
}

const products = [
  ["Pixel 8", "Mobile", 44999, 4.4, true],
  ["Moto G", "Mobile", 14999, 4.1, true],
  ["Nokia G", "Mobile", 8999, 3.8, true],
  ["iPhone 15", "Mobile", 69999, 4.7, true],
  ["Galaxy A15", "Mobile", 12999, 4.0, false],
  ["HP Laptop", "Electronics", 45999, 4.5, true],
  ["Realme C", "Mobile", 50000, 4.0, true],
];

checkTest("normal product fixture", getFlipkartDeals(products), {
  status: 200,
  ok: true,
  data: [
    ["Moto G", 14999, 4.1],
    ["Pixel 8", 44999, 4.4],
    ["Realme C", 50000, 4.0],
  ],
  productsCount: 3,
});

checkTest("invalid outer input", getFlipkartDeals("hello"), {
  status: 400,
  ok: false,
  error: "input products must be an array",
});

checkTest("empty products", getFlipkartDeals([]), {
  status: 200,
  ok: true,
  data: [],
  productsCount: 0,
});

checkTest(
  "malformed rows are skipped",
  getFlipkartDeals([
    null,
    [],
    ["Broken Price", "Mobile", "19999", 4.5, true],
    [123, "Mobile", 19999, 4.5, true],
  ]),
  {
    status: 200,
    ok: true,
    data: [],
    productsCount: 0,
  },
);

checkTest(
  "no product matches all rules",
  getFlipkartDeals([
    ["Low Rating", "Mobile", 19999, 3.5, true],
    ["Too Expensive", "Mobile", 70000, 4.5, true],
    ["Out Stock", "Mobile", 19999, 4.5, false],
    ["Wrong Category", "Laptop", 19999, 4.5, true],
  ]),
  {
    status: 200,
    ok: true,
    data: [],
    productsCount: 0,
  },
);

checkTest(
  "boundary values pass",
  getFlipkartDeals([["Boundary Phone", "Mobile", 50000, 4, true]]),
  {
    status: 200,
    ok: true,
    data: [["Boundary Phone", 50000, 4]],
    productsCount: 1,
  },
);

checkTest(
  "invalid price and rating ranges are skipped",
  getFlipkartDeals([
    ["Negative Price", "Mobile", -1, 4, true],
    ["High Rating", "Mobile", 1000, 5.1, true],
    ["Valid Phone", "Mobile", 1000, 4, true],
  ]),
  {
    status: 200,
    ok: true,
    data: [["Valid Phone", 1000, 4]],
    productsCount: 1,
  },
);

const before = JSON.stringify(products);
getFlipkartDeals(products);
const after = JSON.stringify(products);
assert.equal(after, before);
console.log("✅ PASS — original products array unchanged");

console.log("J2 test suite passed.");
