# 🛒 FLIPKART — Module 01: Multi-Filter Product Pipeline

> A defensive, in-memory product filtering pipeline for a Flipkart-style shopping list.
> Built with **100% pure vanilla JavaScript** — zero runtime dependencies, zero frameworks, zero UI.

[![Tests](https://img.shields.io/badge/tests-8%2F8%20passing-brightgreen)](./CODE/tests/flipkart-filter.test.js)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](#-quick-start)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue)](#-javascript-concepts-used)
[![Status](https://img.shields.io/badge/status-J2%20complete-success)](#-roadmap)

---

## 🎯 The Problem (Project Ticket `J2`)

A shopping app receives a large product list where:

- Some rows are malformed or have invalid values.
- The user wants only **Mobile** products.
- The budget is limited to **₹50,000**.
- The minimum acceptable rating is **4**.
- Out-of-stock products must not be shown.
- The original product list must remain unchanged.

The pipeline validates the input, applies every rule, creates a small display shape, and returns products in ascending price order.

---

## 🔎 What This Pipeline Does

| Stage | What it does | Result |
|-------|--------------|--------|
| `getFlipkartDeals(products)` | Validates the outer input | `400` failure or `200` success |
| Row validation | Skips malformed rows safely | Only valid rows continue |
| Eligibility filter | Applies category, price, rating, and stock rules | Matching products only |
| Display mapping | Converts `[name, category, price, rating, inStock]` | `[name, price, rating]` |
| Price ordering | Sorts from low price to high price | New, sorted result array |

---

## 🛡️ Engineering Rules Built In

1. **Exact Category Match** — Only `category === "Mobile"` is accepted.
2. **Inclusive Budget Boundary** — `price <= 50000`; exactly `50000` is valid.
3. **Inclusive Rating Boundary** — `rating >= 4`; exactly `4` is valid.
4. **Stock Check** — Only `inStock === true` is accepted.
5. **Safe Row Validation** — Price must be a finite number `>= 0`; rating must be a finite number from `0` to `5`.
6. **Immutability** — `toSorted()` returns a new sorted array; the original products list is not mutated.
7. **Consistent Return Type** — Every result uses a predictable response envelope:
   ```js
   { status: 200, ok: true, data: [...], productsCount: 3 }
   { status: 400, ok: false, error: "..." }
   ```
8. **Guard Clauses First** — Invalid input is handled before the pipeline does any work.

---

## 🚀 Quick Start

```bash
# 1. Enter the project
cd /FLIPKART-MULTI-FILTER

# 2. Run the proof suite (no install needed — zero dependencies!)
node /tests/flipkart-filter.test.js
```

### Minimal usage

```js
const { getFlipkartDeals } = require("./CODE/src/flipkart-filter");

const products = [
  ["Pixel 8", "Mobile", 44999, 4.4, true],
  ["Moto G", "Mobile", 14999, 4.1, true],
  ["Nokia G", "Mobile", 8999, 3.8, true],
  ["iPhone 15", "Mobile", 69999, 4.7, true],
  ["Realme C", "Mobile", 50000, 4.0, true],
];

getFlipkartDeals(products);
// {
//   status: 200,
//   ok: true,
//   data: [
//     ["Moto G", 14999, 4.1],
//     ["Pixel 8", 44999, 4.4],
//     ["Realme C", 50000, 4.0]
//   ],
//   productsCount: 3
// }
```

---

## 🧪 Test Coverage — 8 Acceptance Checks

| Check | Covers |
|-------|--------|
| 1 | Normal product fixture and expected sorted output |
| 2 | Invalid outer input returns the `400` failure envelope |
| 3 | Empty input returns a successful empty result |
| 4 | Malformed rows are skipped without a crash |
| 5 | No product matching all rules returns empty data |
| 6 | Inclusive boundary values: `50000` price and `4` rating |
| 7 | Negative price and out-of-range rating are rejected |
| 8 | Original products array remains unchanged |

Run the suite directly:

```bash
node CODE/tests/flipkart-filter.test.js
```

Expected final line:

```text
J2 test suite passed.
```

---

## 🧠 JavaScript Concepts Used (No Shortcuts)

- **Guard clauses** — reject invalid outer input immediately
- **`Array.isArray()`** — validate rows and the outer collection
- **`Number.isFinite()`** — validate price and rating safely
- **`.reduce()`** — clean and preserve only valid rows
- **`.filter()`** — apply the product eligibility rules
- **`.map()`** — create the final display shape
- **`.toSorted()`** — order results without mutating the source
- **Result objects** — HTTP-style `{ status, ok, data, error }` responses
- **Node's built-in `assert/strict`** — dependency-free acceptance testing

---

## 📈 Code Review Notes

The important review decisions for this module are:

1. `sort()` mutates an array. The implementation uses `toSorted()` so the source list remains unchanged.
2. Price and rating ranges are validated before eligibility filtering, so invalid numeric data cannot silently pass.
3. The rules use inclusive comparisons: `price <= 50000` and `rating >= 4`.
4. Production source and acceptance tests are separated:
   - `CODE/src/flipkart-filter.js`
   - `CODE/tests/flipkart-filter.test.js`
5. The ticket remains code-free in `PLAN/`; implementation belongs only in `CODE/src/`.

---

## 🗺️ Roadmap

- [x] Module 01 — Flipkart Multi-Filter Product Pipeline
- [ ] Module 02 — J3 Mini Pub/Sub
- [ ] Module 03 — J4 Debounce Engine
- [ ] Module 04 — J5 STREAM-OS Real Pipeline
- [ ] Module 05 — J6 Memoize/LRU (optional)

---

## 👤 Author

**Debjeet Dhar** — Kolkata, India 🇮🇳

Learning in public. Building reliable JavaScript logic modules, one proof-driven project at a time.
