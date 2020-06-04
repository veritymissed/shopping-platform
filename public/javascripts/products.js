var localStorage = window.localStorage;
console.log("localStorage", localStorage);

var productArray = []
fetch('http://127.0.0.1:8001/products')
  .then(function(response) {
    return response.json();
  })
  .then(function(resObject) {
    productArray = resObject
    // console.log("productsArray", productsArray);
    var list = productArray.map((product) => {
      return renderProduct(product)
    }).reduce((accu, curr) => {
      return accu + curr
    })
    // console.log("list", list);
    var productListHTML = $.parseHTML(list);
    // console.log("productListHTML", productListHTML);
    $("#productList").append(productListHTML)
  });





function renderProduct(product) {
  return `<div class="card" style="width: 18rem;" value="${product._id}">
    <img src="${product.imageUrl}" alt="" class="card-img-top" alt="Food">
    <div class="card-body">
      <h5 class="card-title productTitle">${product.productName}</h5>
      <p class="card-text text-danger productPrice">$ ${product.price}</p>
      <button class="btn btn-primary quick-preview">快速預覽</button>
      <button class="btn btn-warning add-to-cart">加入購物車</button>
    </div>
  </div>`
}

function updateProductListBlock() {
  var productInCart = getCartList()
  var cartList = productInCart.map((product, index) => {
    return renderCartList(product, index)
  }).reduce((accu, curr) => {
    return accu+curr
  })

  // console.log("cartList", cartList);
  $("#cartList > table > tbody").children().remove()
  $("#cartList > table > tbody").append(cartList)
}

function renderCartList(product, index) {
  return `<tr value="${product._id}">
    <th scope="row">${index+1}</th>
    <td>${product.productName}</td>
    <td>$${product.price}</td>
    <td><img width="100" src="${product.imageUrl}"></td>
    <td><button class="btn delete-product-in-cart"><i class="fas fa-trash-alt"></i></button></td>
  </tr>`
}

$("body").on('click', '.add-to-cart', function() {
  var tagetId = $(this).parent().parent().attr('value')
  var tagetProduct = productArray.find((product) => product._id === tagetId)
  addToCartList(tagetProduct)
});

$("body").on("click", ".delete-product-in-cart", function() {
  var targetId = $(this).parent().parent().attr("value")
  removeFromCartList(targetId)
})

function addToCartList(targetObject) {
  var array = getCartList()
  var found = array.find(product => product._id === targetObject._id)
  if(found){
    alert(`${found.productName} already in the cart!`)
  }
  else{
    array.push(targetObject)
    updateCartList(array)
  }
}

function removeFromCartList(targetId) {
  var array = getCartList()
  var deleteIndex = array.findIndex((product) => product._id === targetId)
  array.splice(deleteIndex, 1)
  updateCartList(array)
}


function getCartList() {
  var daineseCart = JSON.parse(localStorage.getItem('daineseCart'))
  if (!daineseCart) {
    localStorage.setItem('daineseCart', JSON.stringify([]));
    daineseCart = JSON.parse(localStorage.getItem('daineseCart'))
  }
  return daineseCart
}

function updateCartList(array) {
  localStorage.setItem('daineseCart', JSON.stringify(array));
  updateProductListBlock()
}
