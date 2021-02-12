//variables

const cartBtn = document.querySelector('.cart-btn');
const clearCarBtn = document.querySelector('.clear-cart');
const closeCartBtn = document.querySelector('.close-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartTotal = document.querySelector('.cart-total');
const cartItems = document.querySelector('.cart-items');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
const finishBtn = document.querySelector('.finish');
const btns = document.querySelectorAll(".bag-btn");
const phone_number = '+5571981367152';

var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = './public/icon.ico';
document.getElementsByTagName('head')[0].appendChild(link);


// cart
let cart = [];
let buttonsDOM = [];

//getting the products
class Products{
    async getProducts(){
        try{
            // Busca items do JSON
            let result = await fetch('products.json');
            let data = await result.json();

            //Salva items em variavel
            let products  = data.items;
            
            //Mapeia vetor de items
            products = products.map(item => {
                const {title,price} = item.fields;
                const {id} = item.sys
                const image = item.fields.image.fields.file.url;
                
                //Retorna mapeamento do vetor como objeto
                return {title,price,id,image}
            })
            //Retorna Objeto
            return products
        } catch(error){
            console.log(error);
        }   
    }
}
// display products
class UI {
    displayProducts(products){
        //Inicia variavel result como string
        let result = '';

        //Pra cada produto do "result" anterior cria-se um container para tal
        products.forEach(product => {
            result += `
            <!-- SINGLE PRODUCT-->
            <article class="product">
                <div class="img-container">
                    <img 
                    src="${product.image}"
                    alt="product" 
                    class="product-img"/>                
                    <button class="bag-btn" data-id="${product.id}">
                        <i class="fa fa-shopping-cart"></i>
                        Comprar
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h3>R$ ${product.price}</h3>
            </article>    
            <!-- END OF SINGLE PRODUCT--> 
            `
        });
        // Insere no HTML resultado ao container (ProductsDOM)
        productsDOM.innerHTML = result;
    }

    //Pega todos os botões de compra
    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttonsDOM = buttons;

        buttons.forEach(button => {
            //Pega o id de cada butão
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            
            if(inCart){
                button.innerText = "No Carrinho";
                button.disabled = true;
            }
            button.addEventListener('click', (event)=>{
                //console.log(event);

                //Altera nome do Botão e Desativa
                event.target.innerText = "No Carrinho";
                event.target.disable = true;

                console.log(event.target);

                // Pega produto de Produtos
                let cartItem = {...Storage.getProduct(id), amount:1};

                // Adiciona ao Carrinho
                cart = [...cart,cartItem];

                //Salva carrinho em "Local Storage"
                Storage.saveCart(cart);

                //Seta valores de carrinho
                this.setCartValues(cart);

                // Add item ao carrinho                
                this.addCartItem(cartItem);

                // mostra carrinho
                this.showCart();
                
            })            
            
        });
    }

    setCartValues(cart){


        //Inicializa Variaveis
        let tempTotal = 0;
        let itemsTotal = 0;                
        
        cart.map(item =>{ 
            //Preço Total = Item * Quantidade
            tempTotal += item.price * item.amount;

            // Quantidade de Items incrementado a cada Clique
            itemsTotal += item.amount;
        })

        //Apresenta no front Resultados
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;

    }

    addCartItem(item){
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.image}" alt="product">
            <div>
                <h4>${item.title}</h4>
                <h5>$${item.price}</h5>
                <span class="remove-item" data-id=${item.id}>Remover</span>
            </div>
            <div>
                <i class="fa fa-chevron-up fa-2x" data-id=${item.id}></i>
                <a class="item-amount">${item.amount}</a> Kg
                <i class="fa fa-chevron-down fa-2x" data-id=${item.id}></i>
            </div>`;
            cartContent.appendChild(div);
            
    }

    showCart(){
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
    }

    setupAPP(){
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click',this.showCart);
        closeCartBtn.addEventListener('click',this.hideCart);
        this.cartLogic();
    }

    populateCart(cart){
        cart.forEach(item =>this.addCartItem(item));
    }

    hideCart(){
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
    }

    cartLogic(){
        finishBtn.addEventListener('click', () =>{
            this.finish();
        });
        /*==========================================================
        /
        /                   LIMPAR CARRINHO
        /
        ==========================================================*/
        clearCarBtn.addEventListener('click', () =>{
            this.clearCart();
        });
        /*==========================================================
        /
        /                   REMOVER ITEM INDIVIDUALMENTE
        /
        ==========================================================*/

        cartContent.addEventListener('click',event=>{
            
            if(event.target.classList.contains('remove-item')){                
                
                //Seleciona item do carrinho no front (<div>)
                let removeItem = event.target;

                //Seta id do Item
                let id = event.target.dataset.id;

                // remove Item no front
                cartContent.removeChild(removeItem.parentElement.parentElement);

                //Remove Item no "Local Storage"
                this.removeItem(id);
                
            // Acrescenta + 1 a quantidade de determindado Item
            }else
            /*==========================================================
            /
            /                   INCREMENTAR QUANTIDADE 
            /
            ==========================================================*/            
            
             if(event.target.classList.contains('fa-chevron-up')){
                //Seleciona item do carrinho no front (<div>)
                let addAmount = event.target;
                
                // Resgata ID do Item (<div>)
                let id = addAmount.dataset.id;
                
                // Busca no Carrinho (Array) o ITEM de acordo com ID da <div>
                // OBS: Salva em Variavel temporaria
               
                let tempItem = cart.find(item => item.id === id);

                //Acrescenta nesse ITEM a quantidade de Mais um
                tempItem.amount = tempItem.amount + 1;
                
                Storage.saveCart(cart);

                this.setCartValues(cart);

                // Incrementa +1 no front
                 addAmount.nextElementSibling.innerText = tempItem.amount;            
            }else
            /*==========================================================
            /
            /                   DECREMENTAR QUANTIDADE 
            /
            ==========================================================*/ 

            if(event.target.classList.contains('fa-chevron-down')){
                //Seleciona item do carrinho no front (<div>)
                let lowerAmount = event.target;
                
                // Resgata ID do Item (<div>)
                let id = lowerAmount.dataset.id;
                
                let tempItem = cart.find(item => item.id === id);

                tempItem.amount = tempItem.amount - 1;

                console.log(tempItem);

                    if(tempItem.amount > 0){
                        Storage.saveCart(cart);
                        this.setCartValues(cart);
                        lowerAmount.previousElementSibling.innerText = tempItem.amount;
                        
                    }else{
                        cartContent.removeChild(lowerAmount.parentElement.parentElement);
                        this.removeItem(id);
                    }
            }
        })
    }

    finish(){
        var ItemsFinish  = '';
        var index = 0;
        var all_items_total = 0;

        console.log(cart);
        

        while (index!=cart.length) {
            var price_total = cart[index].price*cart[index].amount;
            price_total = price_total.toFixed(2);

            ItemsFinish +=  
            cart[index].amount+' Unidade(s)%20de%20'+
            cart[index].title+',%20';
            index++;
                        
            
            all_items_total = parseFloat(price_total)+parseFloat(all_items_total);
        }

        ItemsFinish+=`Valor%20Total%20da%20Compra:%20R$%20${all_items_total}`;
        
        this.clearCart();

        window.open('https://api.whatsapp.com/send?phone='+phone_number+'&text='+ItemsFinish, '_blank');



    }

    clearCart(){
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        while(cartContent.children.length>0){
            cartContent.removeChild(cartContent.children[0]);
        }

        this.hideCart();
    }

    removeItem(id){
        //Carrinho será igual a todos que já há no carrinho exceto o ID que foi passado
        //Somente aceita o item.id que são diferentes do que foi entregue
        cart = cart.filter(item => item.id !== id);        
        this.setCartValues(cart);
        Storage.saveCart(cart);        
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fa fa-shopping-cart"></i>Comprar`;
    }

    getSingleButton(id){
        return buttonsDOM.find(button => button.dataset.id === id);
    }

}

// local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products))
    }

    static saveCart(cart){
        localStorage.setItem("cart",JSON.stringify(cart));
    }

    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));

        return products.find(product => product.id === id);
    }

    static getCart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI();
    const products  = new Products();
    ui.setupAPP();

    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(()=>{
       ui.getBagButtons();
      // ui.cartLogic(); 
    });

});

function ScrollToBottom() {
    window.scrollTo({ top: 800, behavior: 'smooth' })  
}

