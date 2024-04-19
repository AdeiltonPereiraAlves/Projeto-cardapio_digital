
// pegando id do html
const carrinho = document.querySelector('#carrinho')
const butaoFecharcarrinho = document.querySelector('#botaoFecharCarrinho')
const closeCarrinho = document.querySelector('#fechar-carrinho')


//abrindo e fechando o carrinho
carrinho.addEventListener('click', () => {

    closeCarrinho.classList.contains('hidden') ? closeCarrinho.classList.toggle('flex') && closeCarrinho.classList.remove('hidden') : closeCarrinho.classList.toggle('hidden') && closeCarrinho.classList.remove('flex');


})
//fechando o carrinho pelo icone
butaoFecharcarrinho.addEventListener('click', () => {
    closeCarrinho.classList.contains('hidden') ? closeCarrinho.classList.toggle('flex') && closeCarrinho.classList.remove('hidden') : closeCarrinho.classList.toggle('hidden') && closeCarrinho.classList.remove('flex');

})
