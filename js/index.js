/********** start Global ***************************/

var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var productSearchInput = document.getElementById("searchInput");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var currentIndex = 0;
var newIndex = 0;
var productList = [];

if (localStorage.getItem("productContainer") !== null) {
  productList = JSON.parse(localStorage.getItem("productContainer"));
  displayData();
}

/************** END GLOBAL ***********************/
/**************START FUNCTION addProduct ***************************/
function addProduct() {
  var product = {
    name: productNameInput.value.trim(),
    price: productPriceInput.value,
    category: productCategoryInput.value.trim(),
    description: productDescriptionInput.value.trim(),
    image: productImageInput.files[0]
      ? `images/${productImageInput.files[0].name}`
      : "images/2.jpg",
  };

  productList.push(product);

  displayData();

  console.log(productList);

  localStorage.setItem("productContainer", JSON.stringify(productList));

  clearForm();
}
/********End FUNCTION addProduct ***************************/

/********START FUNCTION clearForm ***************************/
function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
}
/********END FUNCTION clearForm ***************************/

/********START FUNCTION displayData ***************************/
function displayData() {
  var content = "";
  for (var i = 0; i < productList.length; i++) {
    content += htmlData(i);
  }

  document.getElementById("rowData").innerHTML = content;
}
/********END FUNCTION displayData ***************************/

/********START FUNCTION deleteData ***************************/
function deleteData(index) {
  currentIndex = index;
  productList.splice(currentIndex, 1);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
}
/********END FUNCTION deleteData ***************************/

/********START FUNCTION searchItems ***************************/
function searchItem() {
  var term = productSearchInput.value;

  var content = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      content += htmlData(i);
    }
  }
  document.getElementById("rowData").innerHTML = content;
}
/********END FUNCTION searchItems ***************************/

function htmlData(i) {
  return `
        <div class="col">
                               <div class="card " >
                                   <img height="200px" id="productImage" class="card-img-top" src=" ${productList[i].image} " alt=" ${productList[i].name} " />
                                   <div class="card-body">
                                       <span class="badge bg-info">index:${i}</span>
                                       <h3 class="card-title h6">ProductName:${productList[i].name}</h3>
                                       <p class="card-text">ProductPrice: ${productList[i].price} </p>
                                       <p class="card-text">ProductCategory: ${productList[i].category} </p>
                                       <p class="card-text">ProductDescription: ${productList[i].description} </p>
                                   </div>
                                   <div class="card-footer text-center">
                                       <button id="delete" onclick="deleteData(${i})" class="btn btn-outline-danger btn-sm"> <i
                                               class="fa-solid fa-trash-can"></i></button>
                                       <button id="update" class="btn btn-outline-warning btn-sm"> <i
                                               class="fa-solid fa-pen-to-square"></i></button>
                                   </div>
                               </div>
                           </div>
       
       `;
}

/********START FUNCTION updateData ***************************/

// الاول بيحضر الاايتيم اللي هعمل عليه ابديت وارفعه ف الانبوتس

function prepareUpdateInfo(index) {
  // productList[index] بتجيبلي الاوبجكت
  // اروح انا اخد القيم بتاعته احطها فوق ف ال inputs

  newIndex = index;
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;
  // واظهر زرار الابديت واخفي زرار الادد
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateData() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: productImageInput.files[0]
      ? `images/${productImageInput.files[0]?.name}`
      : "images/2.jpg",
  };

  productList.splice(newIndex, 1, product);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
  clearForm();

  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
}
/********END FUNCTION updateData ***************************/
