const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

//ABRIR O MODAL DO CARRINHO
cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex"
    updateCartModal();
})

//FECHAR O MODAL DO CARRINHO só qndo clicar fora
cartModal.addEventListener("click", function(event){
    if (event.target === cartModal){
        cartModal.style.display = "none"
    }
})

//Fechar no botão fechar
closeModalBtn.addEventListener("click", function(){
   cartModal.style.display="none" 
} )

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
//ADICIONAR NO CARRINHO
addToCart(name, price)
    }

})







//FUNCAO P ADICIONAR NO CARRIHO
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
           })

    }
  

   updateCartModal()
}

//ATUALIZA O CARRINHO
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between mt-2"> 
        <div> 
            <p class="font-bold">${item.name} </p>
            <p>Qtd: ${item.quantity} </p>
            <p class="font-medium mt-2">${item.price.toFixed(2)} € </p>
        
        </div>
    
        <button class="remove-from-cart-btn" data-name="${item.name}"> 
        Remover
         </button>
         
        </div>
        `

        total+= item.price * item.quantity
        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt", {
        style: "currency",
        currency: "EUR"
    })

    cartCounter.innerHTML = cart.length;
}

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
         if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return; 
        }

        cart.splice(index, 1);
        updateCartModal();

    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;
    if(inputValue !== ""){
        addressInput.classList.remove(border-red-500)
        addressWarn.classList.add("hidden")
    }

})
checkoutBtn.addEventListener("click", function (){
    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressWarn.classList.add("border-red-500")
    } else {
        const cartItems = cart.map((item) =>{
            return(
                `${item.name} Quantidade: (${item.quantity}) Preço: ${item.price.toFixed(2)} €`
            )
        }).join('\n');
     
        const message = encodeURIComponent(cartItems)
        const phone = "936567731"

        window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")
    }
})


function checkStoreOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 9 && hora < 17
}

    const SpanItem = document.getElementById("date-span")
    const isOpen = checkStoreOpen();
    if(isOpen){
        SpanItem.classList.remove("bg-red-500")
        SpanItem.classList.add("bg-green-600")
    }else{
        SpanItem.classList.remove("bg-green-600")
        SpanItem.classList.add("bg-red-500")
    }
