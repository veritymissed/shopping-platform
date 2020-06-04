const faker = require('faker');
const fs = require('fs');
const path = require('path');

console.log();
// faker.setLocale("zh-TW");
// faker.locale = "zh-TW"
var times = 50;
var array = []
for (var i = 0; i < times; i++) {
  var product = {
    _id: faker.random.uuid(),
    productName: faker.commerce.productName(),
    department: faker.commerce.department(),
    price: faker.commerce.price(),
    productMaterial: faker.commerce.productMaterial(),
    imageUrl: `https://i.picsum.photos/id/${parseInt(Math.random()*1200)}/220/220.jpg`
  }
  array.push(product)
}
console.log(array);

fs.writeFileSync(path.join(__dirname, './products.json'),JSON.stringify({
  products: array
}))

// console.log("faker.commerce.product", faker.commerce.product());
// console.log("faker.commerce.productName", faker.commerce.productName());
// console.log("faker.commerce.productMaterial", faker.commerce.productMaterial());
// console.log("faker.commerce.price", faker.commerce.price());
//
// console.log("faker.commerce.department", faker.commerce.department());
// console.log("faker.commerce.productAdjective", faker.commerce.productAdjective());
// console.log("faker.commerce.color", faker.commerce.color());
//
//
// console.log("faker.image.image", faker.image.image());
// console.log("faker.image.fashion", faker.image.fashion());
// console.log("faker.image.food", faker.image.food());
// console.log("faker.image.imageUrl", faker.image.imageUrl());
// console.log("faker.image.avatar", faker.image.avatar());
// console.log("faker.image.dataUri", faker.image.dataUri());
