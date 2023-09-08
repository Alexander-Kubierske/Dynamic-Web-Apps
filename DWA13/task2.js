// given data
const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

//   outcomes
// @Use forEach to console.log each product name to the console.
// @Use filter to filter out products that have a name longer than 5 characters
// @Using both filter and map. Convert all prices that are strings to numbers, and remove all products from the array that do not have prices. After this has been done then use reduce to calculate the combined price of all remaining products.
// @Use reduce to concatenate all product names to create the following string: banana, mango, potato, avocado, coffee and tea.
// *Use reduce to calculate both the highest and lowest-priced items. The names should be returned as the following string: Highest: coffee. Lowest: banana.
// Using only Object.entries and reduce recreate the object with the exact same values. However, the following object keys should be changed in the new array:
// product should be changed to name
// price should be changed to cost

console.log(
  "Product Names:\n",
  products.forEach((element) => console.log(element.product)),
  "\n",
  "\nProduct Names excluding anything over 5 letters:",
  products.filter((element) => element.product.length < 6),
  "\nProducts with Prices:",
  products
    .map((element) => parseFloat(element.price))
    .filter((element) => !isNaN(element) && element.price !== 0)
    .reduce((total, price) => total + price, 0),
  "\nProducts as a string:",
  products.reduce((accumulator, product, index) => {
    if (index !== products.length - 1) {
      return accumulator + ", " + product.product;
    } else {
      return accumulator + " and " + product.product;
    }
  }, ""),
  "\nHighest and lowest price:",
  // (() => {
  products.reduce(
    (accumulator, currentValue) => {
      const currentPrice = parseFloat(currentValue.price);
      if (!isNaN(currentPrice)) {
        if (currentPrice > accumulator.highestPrice) {
          accumulator.highestPrice = currentPrice;
          accumulator.highestPriceName = currentValue.product;
        }
        if (currentPrice < accumulator.lowestPrice) {
          accumulator.lowestPrice = currentPrice;
          accumulator.lowestPriceName = currentValue.product;
        }
      }

      return accumulator;
    },
    {
      highestPrice: -Infinity, // 10
      lowestPrice: Infinity, // 2
      highestPriceName: "", // coffee
      lowestPriceName: "", // banana
    }
  ),

  //   const highestAndLowest = `Highest: ${accumulator.highestPriceName}. Lowest: ${accumulator.lowestPriceName}`;
  //   return highestAndLowest;
  // })();

  // ====== problems ======
  // the problems i had to with this part are as follows:
  // the difficulty with changing and outputting the string as the accumulator seems to be the difficulty.
  // I have tried making a function in the return of the reduce but that just creates a factory function does not evaluate the function.
  // I thus tried to make a function that wraps around the reduce method but that doesn't seem to pass the values as expected with an anon function.
  // I have tried modifying the accumulator object before it is returned but that changes the result as I need to keep it separate from the reduce loop.
  // All my problems point to a solution that does not have my reduce logic encapsulated in the console.log.

  "\nModified keys:",
  products.reduce((accumulator, currentValue) => {
    const recreatedObj = Object.entries(currentValue).reduce(
      (secondAccumulator, [key, value]) => {
        if (key === "product") {
          secondAccumulator.name = value;
        } else if (key === "price") {
          secondAccumulator.cost = value;
        }
        return secondAccumulator;
      },
      {}
    );
    accumulator.push(recreatedObj);
    return accumulator;
  }, [])
);
