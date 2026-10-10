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

  const CleanProduct = products.reduce((acc, product) => {
    if (!Array.isArray(product)) return acc;

    const [name, category, price, rating, inStock] = product;
    if (
      !isString(name) ||
      !isString(category) ||
      !isNumber(price) ||
      !isNumber(rating) ||
      !isBoolean(inStock)
    ) {
      return acc;
    }
    acc.push([name, category, price, rating, inStock]);
    return acc;
  }, []);

  const sortedMobails = CleanProduct.filter(
    (p) => p[1] === "Mobile" && p[2] <= 50000 && p[3] >= 4 && p[4] === true,
  );

  const displayRow = sortedMobails
    .map((m) => [m[0], m[2], m[3]])
    .toSorted((a, b) => a[1] - b[1]);

  return {
    status: 200,
    ok: true,
    data: displayRow,
    productsCount : displayRow.length
  };
}

// console.log(getFlipkartDeals(products))


// ============================================================
// J2 TEST RUNNER
// ============================================================

function checkTest(testName, actual, expected) {
  const passed =
    JSON.stringify(actual) === JSON.stringify(expected);

  console.log(
    passed ? `✅ PASS — ${testName}` : `❌ FAIL — ${testName}`
  );

  if (!passed) {
    console.log("Expected:", expected);
    console.log("Actual:", actual);
  }
}

// TEST 1: Normal products [pass]
// Expected:
// Moto G, Pixel 8, Realme C
const normalResult = getFlipkartDeals(products);

checkTest(
  "normal product fixture",
  normalResult,
  {
    status: 200,
    ok: true,
    data: [
      ["Moto G", 14999, 4.1],
      ["Pixel 8", 44999, 4.4],
      ["Realme C", 50000, 4.0],
    ],
    productsCount: 3,
  }
);

// TEST 2: Invalid outer input [pass]
// Expected: status 400 and ok false
checkTest(
  "invalid outer input",
  getFlipkartDeals("hello"),
  {
    status: 400,
    ok: false,
    error: "input products must be an array",
  }
);

// TEST 3: Empty array
// Expected: successful empty result
checkTest(
  "empty products",
  getFlipkartDeals([]),
  {
    status: 200,
    ok: true,
    data: [],
    productsCount: 0,
  }
);

// TEST 4: Malformed rows
// String price, non-string name, and null row should skip.
// No valid row remains.
checkTest(
  "malformed rows",
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
  }
);

// TEST 5: No product matches all rules
// Expected: empty successful result
checkTest(
  "no matching product",
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
  }
);

// TEST 6: Boundary values
// Price exactly 50000 and rating exactly 4 are valid.
checkTest(
  "boundary values",
  getFlipkartDeals([
    ["Boundary Phone", "Mobile", 50000, 4, true],
  ]),
  {
    status: 200,
    ok: true,
    data: [
      ["Boundary Phone", 50000, 4],
    ],
    productsCount: 1,
  }
);

// TEST 7: Original array must not change
const before = JSON.stringify(products);
getFlipkartDeals(products);

const after = JSON.stringify(products);

console.log(
  before === after
    ? "✅ PASS — original products array unchanged"
    : "❌ FAIL — original products array was changed"
);