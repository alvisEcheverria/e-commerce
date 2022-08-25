const   shoppingCar = document.querySelector('#shopping-car'),
            showShopping = document.querySelector('.show-shopping'),
                productsContainer = document.querySelector('#products-container'),
                    closed = document.querySelector('.closed'),
                        btnPlus = document.querySelector('.btn-plus'),
                            carContainer = document.querySelector('#car-container'),
                                areaCar = document.querySelector('#area-car'),
                                    navProducts = document.querySelector('#nav-products'),
                                        imgEmpty = document.querySelector('.img-empty'),
                                            totalCart = document.querySelector('.total-cart'),
                                                btnCheckout = document.querySelector('.btn-checkout'),
                                                    iconCheck = document.querySelector('.icon-check')
                                                        btnSignUp = document.querySelector('.btn-sign-up');



const products = [
                {id: 1, name: 'NEW YORK YANKEES', image: './img/new-york blue.png', price: 45.99, description: 'Just Caps Drop 5 New York Yankees 59FIFTY Fitted', category: 'mlb', unit: 1,  quantity: 14},
                    {id: 2, name: 'MIAMI HEAT', image: './img/miami-heat black.png', price: 49.99, description: 'Miami Heat Side City Doodle 59FIFTY Fitted', category: 'nba', unit: 1, quantity: 16},
                        {id: 3, name: 'THOR', image: './img/newera-thor black.png', price: 43.99,  description: 'Thor Love And Thunder Model 59FIFTY Fitted', category: 'entertainment', unit: 1, quantity: 8}
                ];

let shopCar = [];


document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('shopCar')){
        shopCar = JSON.parse(localStorage.getItem('shopCar'));
            actCar();
    }
});


showShopping.addEventListener("click", () =>{


    shoppingCar.style.display = 'block';

});

closed.addEventListener('click', ()  =>{

    shoppingCar.style.display = 'none';

})

localStorage.setItem('products', JSON.stringify(products));
    JSON.parse(localStorage.getItem('products'));


products.map((product) =>{
        const creatediv = document.createElement('div')
            creatediv.classList.add('cap-products')
                creatediv.innerHTML =   `<div class="img">
                                            <img class="cap" src="${product.image}"> 
                                        </div>
                                        <div class="text-product">
                                            <div class="border-products">
                                                <p class="category">${product.category}</p>
                                                <h2 class="name">${product.name}</h2>
                                                <p class="description">${product.description}</p>
                                            </div>     
                                            <div class="price-stock">
                                                <p class="stock">Stock:${product.quantity}</p>
                                                <p class="price">$${product.price}</p> 
                                            </div>    
                                        </div>
                                        <button id="addProduct${product.id}" class="btn-plus">
                                            <span class="material-symbols-outlined">add_shopping_cart</span>
                                        </button>` 
    
        productsContainer.appendChild(creatediv);
        
        const button = document.querySelector(`#addProduct${product.id}`);
    
        button.addEventListener('click', () =>{   

            addCar(product.id);
        })       
});


const addCar = (productId) =>{

    const full = shopCar.some((product)=> product.id === productId);

    if(full){     
        shopCar.map(product =>  {
            
            if(product.id === productId){

                product.unit <= product.quantity -1 ? product.unit++ : null;
                    product.unit === product.quantity ? alert('No more available.') : null;
            }
        });
    } else{
        const item = products.find((product) => product.id === productId)
            shopCar.push(item);
    }
     actCar();

}

const actCar = () =>{

    carContainer.innerHTML = "";

        shopCar.forEach((product) => {

            const creatediv = document.createElement('div');
                creatediv.classList.add('area-car');
                    creatediv.innerHTML =   `<div class"img">
                                                <img class="cap-car" src="${product.image}"> 
                                            </div>
                                            <div class="text-product-car">
                                                    <p class="category-car">${product.category}</p>
                                                    <p class="name-car">${product.name}</p>
                                                    <p class="description-car">${product.description}</p> 
                                                <div class="price-stock-car">
                                                    <p class="stock-car">Stock:${product.quantity}</p>
                                                    <p class="price-car">$${product.price}</p>                                              
                                                </div>
                                                <div class="zone-subtotal">
                                                    <div class="btn-rest-plus">
                                                        <span class="material-symbols-outlined">
                                                            remove
                                                        </span>
                                                        <p>${product.unit} units</p>
                                                        <span class="material-symbols-outlined">
                                                            add
                                                        </span>
                                                    </div>
                                                    <p class="subtotal">Subtotal: 0</p> 
                                                </div>
                                            </div>
                                            <button onClick = 'deleteItems(${product.id})' class="delete-btn">
                                                <span class="material-symbols-outlined">delete</span>
                                            </button>`            
        
            carContainer.appendChild(creatediv);
        });

    const countCar = document.querySelector('.count-car');
        countCar.innerText = shopCar.length;

    const totalPrice = document.querySelector('.total-price');
        totalPrice.innerText = shopCar.reduce((count, product) => count + product.price, 0);
    
        if (shopCar.length === 0) {
            imgEmpty.style.display = 'flex';
                btnCheckout.style.cursor = "not-allowed";
                    btnCheckout.style.backgroundColor = "#bebfc1";
                        btnCheckout.style.color = "var(--secondary)";
                            iconCheck.style.color = "var(--secondary)";
                                iconCheck.style.backgroundColor = "#bebfc1";
                                    totalCart.style.display = 'none';            
        }else{
            imgEmpty.style.display = 'none';
                btnCheckout.style.cursor = "pointer";
                    btnCheckout.style.backgroundColor = "var(--secondary)";
                        btnCheckout.style.color = "var(--primary)";
                            iconCheck.style.color = "green";
                                iconCheck.style.backgroundColor = "var(--primary)";
                                    totalCart.style.display = 'block';  
        }

    localStorage.setItem('shopCar', JSON.stringify(shopCar));
    
}

function deleteItems(productId){
    const item = shopCar.find((product)=> product.id === productId);
        const index = shopCar.indexOf(item);
            shopCar.splice(index, 1);  
                actCar();    
                    
            
};

btnCheckout.addEventListener('click', ()=>{

    if(shopCar.length >= 1){
        shopCar.length = 0;
            alert('Thanks for your purchase! <3');
    }
        
    actCar();
});


const productStockMlb = document.querySelector('.products-stock-mlb');
    productStockMlb.innerText = `${products[0].quantity} productos`;

const productStockNba = document.querySelector('.products-stock-nba');
    productStockNba.innerText = `${products[1].quantity} productos`;

const productStockEntertainment = document.querySelector('.products-stock-entertainment'); 
    productStockEntertainment.innerText = `${products[2].quantity} productos`; 

btnSignUp.addEventListener('click', ()=>{

    alert('Thanks for subscribing!');

})