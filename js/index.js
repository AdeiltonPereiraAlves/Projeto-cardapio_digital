//imports 

// pegando id do html
document.addEventListener('DOMContentLoaded', () => {


    let precoTotalCart = 0;
    let numeroItemsCart = 0;
    const carrinho = document.querySelector('#carrinho')
    const butaoFecharcarrinho = document.querySelector('#botaoFecharCarrinho')
    const closeCarrinho = document.querySelector('#fechar-carrinho')
    const menu = document.querySelector('.menu-container')
    const icon = document.querySelector('.icon')

    icon.textContent = numeroItemsCart;

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
            precoTotalCart = totalCart(arryCart);
            // numeroItemsCart++;
            numeroItemsCart = arryCart.length;
            icon.textContent = numeroItemsCart;

        }
        else {
            const itemNoCarrinho = arryCart.find(item => item.id === id);
            if (itemNoCarrinho) {
                // Se o item foi encontrado, aumente a quantidade

                window.alert("O item ja esta no carrinho")

            } else {
                // Se o item não foi encontrado, adicione-o ao carrinho
                arryCart.push({ id: id, qnt: qnt + 1 }); // Adiciona o item com quantidade 1 ao carrinho
                // numeroItemsCart++;
                numeroItemsCart = arryCart.length;
                icon.textContent = numeroItemsCart;
            }
        }
        listarCarrinho(arryCart)
        console.log(arryCart)
        totalPreco.textContent = `${precoTotalCart.toFixed(2)}`;
        totalPrecoMenu.textContent = `${precoTotalCart.toFixed(2)}`;

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
    const totalPrecoMenu = document.querySelector('.total-carrinho')

    function listarCarrinho(cart) {
        itemContainer.innerHTML = '';
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('flex', 'w-60', 'h-28', 'bg-slate-100', 'rounded-md', 'p-4', 'overflow-hidden', 'border-b');

            const img = document.createElement('img');
            img.src = item.img;
            img.alt = '';
            img.classList.add('w-14', 'h-14');

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('flex', 'flex-col', 'p-5', 'items-center', 'justify-center');

            const title = document.createElement('h1');
            title.classList.add('font-black', 'text-sm');
            title.textContent = item.nome;

            const priceSpan = document.createElement('span'); 
            priceSpan.classList.add('font-black');
            priceSpan.textContent = `preço: ${item.preco}R$`;

            const quantityDiv = document.createElement('div');
            quantityDiv.classList.add('flex', 'p-2', 'gap-2');

            const decreaseBtn = document.createElement('button');
            decreaseBtn.classList.add('p-4', 'rounded-sm', 'border', 'flex', 'items-center', 'hover:bg-white', 'h-4', 'border-gray-800-dark')
            decreaseBtn.textContent = '-';
            decreaseBtn.addEventListener('click', () => {
                if (item.qnt > 1) {
                    item.qnt--;
                    // Atualizar a exibição da quantidade na interface do usuário
                    quantitySpan.textContent = item.qnt;
                    precoTotalCart = totalCart(arryCart)

                    totalPreco.textContent = `${precoTotalCart.toFixed(2)}`;
                    totalPrecoMenu.textContent = `${precoTotalCart.toFixed(2)}`;
                }
            });

            const quantitySpan = document.createElement('span');
            quantitySpan.textContent = item.qnt;

            const increaseBtn = document.createElement('button');
            increaseBtn.classList.add('p-4', 'rounded-sm', 'border', 'flex', 'items-center', 'hover:bg-white', 'h-4', 'border-gray-800-dark')
            increaseBtn.textContent = '+';
            increaseBtn.addEventListener('click', () => {
                item.qnt++;
                // Atualizar a exibição da quantidade na interface do usuário
                quantitySpan.textContent = item.qnt;

                precoTotalCart = totalCart(arryCart)

                totalPreco.textContent = `${precoTotalCart.toFixed(2)}`;
                totalPrecoMenu.textContent = `${precoTotalCart.toFixed(2)}`;
            });

            // botãp de excluir item do carrinho
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
            deleteBtn.addEventListener('click',() =>{
                arryCart = arryCart.filter((i) => i.id != item.id)
                console.log("Depois da exclusão:", arryCart);
                listarCarrinho(arryCart)
                let novototal = totalCart(arryCart)
                precoTotalCart = novototal
                totalPreco.textContent = `${precoTotalCart.toFixed(2)}`;
                totalPrecoMenu.textContent = `${precoTotalCart.toFixed(2)}`;
                numeroItemsCart = arryCart.length;
                icon.textContent = numeroItemsCart;
                
                console.log(numeroItemsCart)

                
            })

            quantityDiv.append(decreaseBtn, quantitySpan, increaseBtn,deleteBtn);
            infoDiv.append(title, priceSpan, quantityDiv);

            itemDiv.append(img, infoDiv);
            itemContainer.appendChild(itemDiv)






        });


    }

    //modal de pedidos e pagamento

    const btnPedidos = document.querySelector('#btn-pedidos')
    const pagContainer = document.querySelector('.pag-container')

    btnPedidos.addEventListener('click', () => {
        closeCarrinho.classList.contains('hidden') ? closeCarrinho.classList.toggle('flex') && closeCarrinho.classList.remove('hidden') : closeCarrinho.classList.toggle('hidden') && closeCarrinho.classList.remove('flex');

        pagContainer.classList.contains('hidden') ? pagContainer.classList.toggle('flex') && pagContainer.classList.remove('hidden') : ""
        if (pagContainer.classList.contains('flex')) {
            const btn = document.querySelector('#td-total')
            btn.textContent = precoTotalCart;
            listarTabela(arryCart)

        }


    })
    const butaoFecharModal = document.querySelector('#botaoFecharModal')

    butaoFecharModal.addEventListener('click', () => {
        pagContainer.classList.toggle('hidden') && pagContainer.classList.remove('flex')
        tabela.innerHTML = ''
    })

    //tabela do modal de pagamentos
    const tabela = document.querySelector('#tbody')
    function listarTabela(cart) {
        cart.map((item) => {

            tabela.innerHTML += `
            <tr>
            <td class="w-1/2 border border-gray-300 px-4 py-2">${item.nome}<span> x ${item.qnt}</span></td>
            <td class="w-1/2 border border-gray-300 px-4 py-2">${item.preco}</td>
        </tr>
            `

        })
    }



    // finalizando pedido

    const finalizPedido = document.querySelector('#finalizar')

    finalizPedido.addEventListener('click', (e) => {
       e.preventDefault()
       const form = document.querySelector('form')
       const nome = document.querySelector('#nome').value
       const endereco = document.querySelector('#endereço').value
       const adicionais= document.querySelector('#infoAdicional').value
       const tipoPag= document.querySelector('#opcoes').value
          
       console.log(form)

       const cart = arryCart.map((item) => {
         return(
            ` -----PEDIDO------\n Nome: ${item.nome} \n- Qnt: ${item.qnt} \n Preço: R$ ${item.preco} \n`
         )
       }).join("")
       
       const message = encodeURIComponent(cart)
       const tel = "83981112469"
       window.open(`https://wa.me/${tel}?text=${message} Cliente:${nome} Endereço:${endereco} Total:${precoTotalCart}`, "_blanck")
    })









});

