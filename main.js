var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productImage = document.getElementById('productImage');
var productDesc = document.getElementById('productDesc');
var addBtn = document.getElementById('addBtn');
var resetBtn = document.getElementById('resetBtn');
var productList = [];


if(localStorage.getItem('product') !==null){
  productList = localStorage.getItem('product')
  displayProduct();
}else{
  productList = []; 
}

// add product

addBtn.onclick = addProduct;

function addProduct(){
    var product = {
        pName: productName.value,
        category: productCategory.value,
        desc: productDesc.value,
        price: productPrice.value,
        productImage: `./images/${productImage.files[0].name}`, 
    };
      console.log(product)
    console.log(productImage.files[0].name)

    if(document.getElementById('addBtn').innerHTML === "Add Product"){
        productList.push(product);   
    }
    else{
       
        productList.splice(currentIndex,1,product)
        document.getElementById('addBtn').innerHTML = "Add Product"
    }
    
   
    localStorage.setItem('product', JSON.stringify(productList));
    displayProduct();
    resetForm();
    
}

// display
function displayProduct(){
    var cartona = ``;

    for(var i = 0; i < productList.length; i++){
        cartona += `
        <div class="col-md-4 col-sm-6 ">
            <div class="product">
                <img src="${productList[i].productImage}" class="w-100" alt="">
                <div class="product-details m-auto">
                    <h2 class="h4 ">${productList[i].pName}</h2>
                    <p class="text-secondary border-bottom pb-2">${productList[i].desc}</p>
                    <p><span class="fw-bold">Price</span> <span class="text-secondary">${productList[i].price}</span></p>
                    <p><span class="fw-bold">Category</span> <span class="text-secondary">${productList[i].category}</span></p>
                    <div class="text-center">
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger my-3 w-75">Delete <i class="fa-solid fa-trash-can"></i> </button>
                    <button onclick="updateProduct(${i})" class="btn btn-outline-warning  w-75">update <i class="fa fa-edit mx-3"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
    }
    document.getElementById('rowBody').innerHTML = cartona;
}

// clear form
function resetForm(){
    productName.value = '';
    productCategory.value = '';
    productDesc.value = '';
    productPrice.value = '';
}


function deleteProduct(index) {
    if (Array.isArray(productList)) {
        productList.splice(index, 1);
        localStorage.setItem('product', JSON.stringify(productList));
        displayProduct();
        console.log('Updated productList after deletion:', productList);
    } else {
        console.error('productList is not an array:', productList);
    }
}

var currentIndex;

function updateProduct(index){

    currentIndex = index;

    productName.value = productList[index].pName;
    productCategory.value = productList[index].category;
    productDesc.value = productList[index].desc;
    productPrice.value = productList[index].price;

    document.getElementById('addBtn').innerHTML = 'update product'
}


var search = document.getElementById('search')

 function searchProduct(){
    console.log(search.value)
    var searchValue = search.value;
    var box = ``;
    for(var i=0; i<productList.length;i++){
        if(productList[i].pName.toLowerCase().includes(searchValue.toLowerCase()) == true){
            
             box += `
             <div class="col-md-4 col-sm-6 ">
                 <div class="product">
                     <img src="${productList[i].productImage}" class="w-100" alt="">
                     <div class="product-details m-auto">
                         <h2 class="h4 ">${productList[i].pName}</h2>
                         <p class="text-secondary border-bottom pb-2">${productList[i].desc}</p>
                         <p><span class="fw-bold">Price</span> <span class="text-secondary">${productList[i].price}</span></p>
                         <p><span class="fw-bold">Category</span> <span class="text-secondary">${productList[i].category}</span></p>
                         <div class="text-center">
                         <button onclick="deleteProduct(${i})" class="btn btn-outline-danger my-3 w-75">Delete <i class="fa-solid fa-trash-can"></i> </button>
                         <button onclick="updateProduct(${i})" class="btn btn-outline-warning  w-75">update <i class="fa fa-edit mx-3"></i></button>
                         </div>
                     </div>
                 </div>
             </div>`;
        }
    }
    document.getElementById('rowBody').innerHTML = box;

 }


