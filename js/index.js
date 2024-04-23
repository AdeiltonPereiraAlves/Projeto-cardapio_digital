//imports 

// pegando id do html

document.addEventListener('DOMContentLoaded', () => {
    let p = 0;
    const carrinho = document.querySelector('#carrinho')
    const butaoFecharcarrinho = document.querySelector('#botaoFecharCarrinho')
    const closeCarrinho = document.querySelector('#fechar-carrinho')
    const menu = document.querySelector('.menu-container')



    //abrindo e fechando o carrinho
    carrinho.addEventListener('click', () => {
        if (closeCarrinho) {

            closeCarrinho.classList.contains('hidden') ? closeCarrinho.classList.toggle('flex') && closeCarrinho.classList.remove('hidden') : closeCarrinho.classList.toggle('hidden') && closeCarrinho.classList.remove('flex');
        }


    })
    //fechando o carrinho pelo icone
    butaoFecharcarrinho.addEventListener('click', () => {
        closeCarrinho.classList.contains('hidden') ? closeCarrinho.classList.toggle('flex') && closeCarrinho.classList.remove('hidden') : closeCarrinho.classList.toggle('hidden') && closeCarrinho.classList.remove('flex');

    })



    //item do menu
    const btnItem = document.querySelector('#btn-item')

    menu.addEventListener('click', (event) => {
        const parentBtn = event.target.closest('.btn-to-cart')
        if (parentBtn) {
            const id = parentBtn.getAttribute("data-id")
            const nome = parentBtn.getAttribute("data-name")
            const preco = parseFloat(parentBtn.getAttribute("data-price"))
            const img = parentBtn.getAttribute("data-img")
            addCart(id, nome, preco, img)

        }
    })


    // add cart
    let arryCart = []
    function addCart(id, nome, preco, img) {
        const item = {
            id: id,
            nome: nome,
            preco: preco,
            img: img,
            qnt: 1
        }
        if (!arryCart.some(item => item.id === id)) {
            arryCart.push(item)

        }
        else {
            const itemNoCarrinho = arryCart.find(item => item.id === id);
            if (itemNoCarrinho) {
                // Se o item foi encontrado, aumente a quantidade

                window.alert("O item ja esta no carrinho")
                itemNoCarrinho.qnt += 1;
            } else {
                // Se o item não foi encontrado, adicione-o ao carrinho
                arryCart.push({ id: id, qnt: 1 }); // Adiciona o item com quantidade 1 ao carrinho
            }
        }
        p = totalCart(arryCart);
        listarCarrinho(arryCart)
        console.log(arryCart)
        totalPreco.textContent = `${p}`;
        
    }
    
    //preço total do carrinho

    function totalCart(cart) {
        const total = cart.reduce((ac, item) => {
            const precoTotal = item.preco * item.qnt;

            return ac + precoTotal;

        }, 0)
        return total;
    }


    //listar itens do carrinho
    const itemContainer = document.querySelector('.item-container')
    const totalPreco = document.querySelector('#total-carrinho')

    function listarCarrinho(cart) {
        itemContainer.innerHTML = '';
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('flex', 'w-60', 'h-28', 'bg-slate-200', 'rounded-md', 'p-4', 'overflow-hidden');
    
            const img = document.createElement('img');
            img.src = item.img;
            img.alt = '';
            img.classList.add('w-14', 'h-14');
    
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('flex', 'flex-col', 'p-5', 'items-center', 'justify-center');
    
            const title = document.createElement('h1');
            title.classList.add('font-black');
            title.textContent = item.nome;
    
            const priceSpan = document.createElement('span');
            priceSpan.classList.add('font-black');
            priceSpan.textContent = `preço: ${item.preco}R$`;
    
            const quantityDiv = document.createElement('div');
            quantityDiv.classList.add('flex', 'p-2', 'gap-2');
    
            const decreaseBtn = document.createElement('button');
            decreaseBtn.textContent = '-';
            decreaseBtn.addEventListener('click', () => {
                if (item.qnt > 1) {
                    item.qnt--;
                    // Atualizar a exibição da quantidade na interface do usuário
                    quantitySpan.textContent = item.qnt;
                     p = totalCart(arryCart)
                     console.log(p)
                     totalPreco.textContent = `${p}`;
                }
            });
    
            const quantitySpan = document.createElement('span');
            quantitySpan.textContent = item.qnt;
    
            const increaseBtn = document.createElement('button');
            increaseBtn.textContent = '+';
            increaseBtn.addEventListener('click', () => {
                item.qnt++;
                // Atualizar a exibição da quantidade na interface do usuário
                quantitySpan.textContent = item.qnt;
                console.log(item.qnt)
                 p = totalCart(arryCart)
                console.log(p)
                totalPreco.textContent = `${p}`;
            });
    
            quantityDiv.append(decreaseBtn, quantitySpan, increaseBtn);
            infoDiv.append(title, priceSpan, quantityDiv);
            itemDiv.append(img, infoDiv);
    
            itemContainer.appendChild(itemDiv);

          
        //     itemContainer.innerHTML += `
        //      <div class="flex w-60 h-28 bg-slate-200 rounded-md p-4 overflow-hidden ">
        //         <img src=${item.img} alt="" class="w-14 h-14 " id="img-item">
        //         <div class="flex flex-col  p-5 items-center justify-center">
        //             <h1 class="font-black" id="title">${item.nome} </h1>

        //             <div class="flex flex-col">
        //                 <span class="font-black">preço: ${item.preco}R$</span>
        //                 <div class="flex p-2 gap-2">
        //                     <button>
        //                         -
        //                     </button>
        //                     <span>5</span>
        //                     <button>
        //                         +
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>`
         });

        }

});

