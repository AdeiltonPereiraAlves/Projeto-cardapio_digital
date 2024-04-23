//imports 

// pegando id do html

document.addEventListener('DOMContentLoaded', () => {
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


    const arryCart = []

    function addCart(id,nome, preco, img) {
        const item = {
            id: id,
            nome: nome,
            price: preco,
            img: img,
            qnt:1
        }
        if(!arryCart.some( item => item.id === id )){
            arryCart.push(item)

        }
       else{
        const itemNoCarrinho = arryCart.find(item => item.id === id);
        if (itemNoCarrinho) {
            // Se o item foi encontrado, aumente a quantidade
            itemNoCarrinho.qnt += 1;
        } else {
            // Se o item não foi encontrado, adicione-o ao carrinho
            arryCart.push({ id: id, qnt: 1 }); // Adiciona o item com quantidade 1 ao carrinho
        }
       }
      
        console.log(arryCart)
    }

});

