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
  if (
    validationName() &&
    validationPrice() &&
    validationCategory() &&
    validationDescription() &&
    validationImage()
  ) {
    var product = {
      name: productNameInput.value.trim(),
      price: productPriceInput.value,
      category: productCategoryInput.value.trim(),
      description: productDescriptionInput.value.trim(),
      image: productImageInput.files[0]
        ? `images/${productImageInput.files[0]?.name}`
        : "images/2.jpg",
    };

    productList.push(product);

    displayData();

    console.log(productList);

    localStorage.setItem("productContainer", JSON.stringify(productList));

    clearForm();
  }
}
/********End FUNCTION addProduct ***************************/

/********START FUNCTION clearForm ***************************/
function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
  //
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
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
  var regex = new RegExp(productSearchInput.value, "gi");
  return `
        <div class="col">
                               <div class="card h-100" >
                                   <img height="150px" id="productImage" class="card-img-top" src=" ${
                                     productList[i].image
                                   } " alt=" ${productList[i].name} " />
                                   <div class="card-body text-center">
                                       <span class="badge">Id:${i + 1}</span>
                                       <h3 class="card-title h6">${productList[
                                         i
                                       ].name.replace(
                                         regex,
                                         (match) =>
                                           `<span class="bg-warning">${match}</span>`
                                       )}</h3>
                                       <p class="card-text"> ${
                                         productList[i].price
                                       } </p>
                                       <p class="card-text"> ${
                                         productList[i].category
                                       } </p>
                                       <p class="card-text"> ${
                                         productList[i].description
                                       } </p>
                                   </div>
                                   <div class="card-footer text-center">
                                       <button id="delete" onclick="deleteData(${i})" class="btn btn-outline-danger btn-sm"> <i
                                               class="fa-solid fa-trash-can"></i></button>
                                       <button id="update" onclick="prepareUpdateInfo(${i})" class="btn btn-outline-warning btn-sm"> <i
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
  if (
    validationName() &&
    validationPrice() &&
    validationCategory() &&
    validationDescription() &&
    validationImage()
  ) {
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
}
/********END FUNCTION updateData ***************************/

function validationName() {
  var text = productNameInput.value;
  var regex = /^[A-Za-z][a-z]{2,15}$/;
  var msgName = document.getElementById("msgName");

  if (regex.test(text) == true) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.remove("is-valid");
    productNameInput.classList.add("is-invalid");
    msgName.classList.remove("d-none");
    return false;
  }
}

function validationPrice() {
  var price = productPriceInput.value;
  var regex = /^[0-9]{5,15}$/;
  var msgPrice = document.getElementById("msgPrice");
  if (regex.test(price) == true) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    msgPrice.classList.add("d-none");

    return true;
  } else {
    productPriceInput.classList.remove("is-valid");
    productPriceInput.classList.add("is-invalid");
    msgPrice.classList.remove("d-none");

    return false;
  }
}

function validationCategory() {
  var optionText = productCategoryInput.value;
  var regex = /^(tv|mobile|screens|electronics)$/i;
  var msgCategory = document.getElementById("msgCategory");

  if (regex.test(optionText) == true) {
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    msgCategory.classList.add("d-none");

    return true;
  } else {
    productCategoryInput.classList.remove("is-valid");
    productCategoryInput.classList.add("is-invalid");
    msgCategory.classList.remove("d-none");

    return false;
  }
}

function validationDescription() {
  var text = productDescriptionInput.value;
  var regex = /^.{5,30}$/m;
  var descriptionMsg = document.getElementById("descriptionMsg");

  if (regex.test(text) == true) {
    productDescriptionInput.classList.add("is-valid");
    productDescriptionInput.classList.remove("is-invalid");
    descriptionMsg.classList.add("d-none");

    return true;
  } else {
    productDescriptionInput.classList.remove("is-valid");
    productDescriptionInput.classList.add("is-invalid");
    descriptionMsg.classList.remove("d-none");

    return false;
  }
}

function validationImage() {
  var imageInfo = productImageInput.value;
  var regex = /^.{3,}\.(jpg|jpeg|svg|png|avif)$/;
  var imageRule = document.getElementById("imageRule");

  if (regex.test(imageInfo) == true) {
    productImageInput.classList.add("is-valid");
    productImageInput.classList.remove("is-invalid");
    imageRule.classList.add("d-none");

    return true;
  } else {
    productImageInput.classList.remove("is-valid");
    productImageInput.classList.add("is-invalid");
    imageRule.classList.remove("d-none");

    return false;
  }
}
