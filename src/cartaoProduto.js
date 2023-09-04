
import { catalogo } from "./utilidades";
import { adicionarAoCarrinho } from "./menuCarrinho";


export function renderizarCatalogo(){
    for (const produtoCatalogo of catalogo) {
        const cartaoProduto = `<div class='shadow-lg w-48 margin-bottom-1 flex col p-2 jc-between group bround-lg z-0 my-10' id="card-produto-${produtoCatalogo.id}">
      <img
        src="./assets/img/${produtoCatalogo.imagem}"
        alt="Produto 1 do Magazine Hashtag."
        class="my-3 hover-scale-110 duration-300 bround-lg"
      />
      <p class="mb-4 text-sm">${produtoCatalogo.marca}</p>
      <p class="mb-4 text-sm">${produtoCatalogo.nome}</p>
      <p class="mb- text-sm">$${produtoCatalogo.preco}</p>
      <button id= 'adicionar-${produtoCatalogo.id}'class="border-none color-wht bg240 hover-bg-color-240-light p-2"><i class="fa-solid fa-cart-plus"></i></button>
      </div>`;
      
        document.getElementById("container-produto").innerHTML += cartaoProduto;
    }

    for(const produtoCatalogo of catalogo){
      document
        .getElementById(`adicionar-${produtoCatalogo.id}`)
        .addEventListener('click', ()=> adicionarAoCarrinho(produtoCatalogo.id));
    }
}
