let tempProduct = {}; // Temporary object to store product details

// Function to handle adding a product to the cart
function addtocart(productName, productPrice, productImg) {
    console.log("First function is worked"); // Debug message for function execution

    // Store product details temporarily in the global object
    tempProduct = {
        name: productName,
        price: productPrice,
        image: productImg
    };

    // Show the confirmation popup
    document.getElementById('box').classList.add('d-block'); // Add 'd-block' class to make popup visible
    document.getElementById('box').classList.remove('d-none'); // Remove 'd-none' class to ensure visibility
}

// Function to add the temporary product to the cart
function add() {
    console.log("Second function is worked"); // Debug message for function execution

    // Retrieve cart data from localStorage, or initialize as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];   //local Storage pyn call ya mal data in or out

    // Check if the product already exists in the cart
    let existingProduct = cart.find(item => item.name === tempProduct.name);

    if (existingProduct) {
        // If product exists, increase its quantity
        existingProduct.quantity += 1;
    } else {
        // If product doesn't exist, create a new product object and add to cart
        let product = { 
            id: cart.length + 1, // Generate a new ID for the product
            name: tempProduct.name,
            price: tempProduct.price,
            quantity: 1, // Set initial quantity to 1
            image: tempProduct.image
        };
        cart.push(product); // Add the new product to the cart
    }
    console.log(cart); // Log the updated cart to the console

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    tempProduct = {}; // Reset the temporary product object

    cancel(); // Hide the confirmation popup
}

// Function to hide the confirmation popup
function cancel() {
    document.getElementById('box').classList.remove('d-block'); // Remove 'd-block' class to hide popup
    document.getElementById('box').classList.add('d-none'); // Add 'd-none' class to ensure it's hidden
}

// Function to clear the cart
function clearAll() {
    localStorage.removeItem('cart'); // Remove cart data from localStorage
    loadData(); // Reload the cart UI

    let price = document.querySelector('#total'); // Select the total price element
    price.textContent = 0; // Reset the total price to 0
}

// Function to load and display cart data
function loadData() {
    // Retrieve cart data from localStorage, or initialize as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let cartItems = document.querySelector('.carts'); // Select the cart items container

    let total=0; 
    cartItems.innerHTHML=""; 
  

    if (cart.length === 0) {
        // If the cart is empty, display a message
        cartItems.innerHTML = `<h4 class="text-center my-4"> Your Shopping cart is empty </h4>`;
    } else {
        // If the cart has items, iterate over them and generate HTML
        cart.forEach((item, index) => {
            cartItems.innerHTML += `
                <div class="cart d-flex justify-content-between">
                    <img src="${item.image}" alt="" style="width: 100px; "> <!-- Display product image -->
                    <div class="info text-end">
                        <h4 class="m-0">${item.name}</h4> <!-- Display product name -->
                        <p class="m-0 fs-4">Price: $ ${item.price}</p> <!-- Display product price -->
                        <div class="btns">
                            <!-- Buttons to increase/decrease quantity -->
                            <button onclick="changeQuantity(${index}, 'decrease')" class="btn mx-2 fs-4">-</button>
                            <span>${item.quantity}</span> <!-- Display product quantity -->
                            <button onclick="changeQuantity(${index}, 'increase')" class="btn mx-2 fs-4">+</button>
                        </div>
                    </div>
                </div> <hr>
            `; 
        
          total+=item.price * item.quantity; 
            let price=document.querySelector('#total'); 
           price.textContent=total;
    
    
        });
    }
}
function changeQuantity(index,action){

    let cart=JSON.parse(localStorage.getItem('cart')) || []; 
    if(action=="increase"){
        cart[index].quantity+=1; 
    }else if(action=="decrease"){
        cart[index].quantity-=1; 
    }
    if(cart[index].quantity==0){
        cart.splice(index,1); 
    }
    
    localStorage.setItem('cart',JSON.stringify(cart)); 
    loadData(); 
    
    }
    