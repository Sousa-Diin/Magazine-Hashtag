import { 
  catalogo, 
  salvarLocalStorage,
  getLocalStorage
 } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = getLocalStorage('carrinho') ?? {}; // Dicionario Controle

function fecharCarrinho(){
   
    document.getElementById('carrinho').classList.remove('right-0');
    document.getElementById('carrinho').classList.add('right-360');
}

function abrirCarrinho () {
    document.getElementById('carrinho').classList.remove('right-360');
    document.getElementById('carrinho').classList.add('right-0');
}

export function inicializarCarrinho() {
    const btnFechar = document.getElementById('fechar-carrinho');
    const btnAbrir = document.getElementById('abrir-carrinho');

    btnFechar.addEventListener('click', fecharCarrinho);
    btnAbrir.addEventListener('click', abrirCarrinho);
}

function removerDoCarrinho(idProduto){
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  atualizPrecoCarrinho();
  renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto){
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  atualizPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto){
  if(idsProdutoCarrinhoComQuantidade[idProduto] ===   1){
    removerDoCarrinho(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto]--;
  atualizPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto){
  document
    .getElementById(`quantidade-${idProduto}`)
    .innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto){
  const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutoCarrinho =
        document.getElementById('produtos-carrinho');

    const elementoArticle = document.createElement('article'); //<article></article>
    const articleClasses = [
      'flex',
      'bg-w',
      'b-radius-3',
      'relative'
    ];

    for (const articleClass of articleClasses){
      elementoArticle.classList.add(articleClass);
    }
    
    const cartaoProdutoCarrinho = `<button class="clean-btn absolute right-0 p-2 " id="remover-item-${produto.id}">
      <i class="fa-solid fa-circle-xmark hover-colo-red" ></i>
    </button>
    <img class="h-24 b-radius-3" src="./assets/img/${produto.imagem}" alt="${produto.nome}">
    <div class="flex col jc-between text-color-pto p-2 py-2">
      <p class="text-md">${produto.nome}</p>
      <p class="text-color-pto-38 font-weight-400">Tamanho M</p>
      <p class="text-color-green-160  text-lg">$${produto.preco}</p>
    </div>
    <div class='flex text-slate-950 align-end absolute bottom-0 right-0 p-2'>
      <button id="decrementar-produto${produto.id}" class="clean-btn "><i class="fa-solid fa-minus"></i></button>
      <p class="ml-2" id="quantidade-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
      <button id="incrementar-produto${produto.id}" class="clean-btn ml-2"><i class="fa-solid fa-plus"></i></button>
    </div>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutoCarrinho.appendChild(elementoArticle);
   

    document
      .getElementById(`incrementar-produto${produto.id}`)
      .addEventListener('click', () => incrementarQuantidadeProduto(produto.id));

    document
      .getElementById(`decrementar-produto${produto.id}`)
      .addEventListener('click', () => decrementarQuantidadeProduto(produto.id));

    document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener('click', () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho(){
  const containerProdutoCarrinho =
  document.getElementById('produtos-carrinho');

  containerProdutoCarrinho.innerHTML = '';

  for (const idProduto in  idsProdutoCarrinhoComQuantidade){
    desenharProdutoNoCarrinho(idProduto);
  }
 
}

export function adicionarAoCarrinho(idProduto){

  if (idProduto in idsProdutoCarrinhoComQuantidade){
    incrementarQuantidadeProduto(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto] = 1;
  atualizPrecoCarrinho();
  salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade)
  desenharProdutoNoCarrinho(idProduto);
}

export function atualizPrecoCarrinho(){
  const precoCarrinho = document.getElementById('preco-total');
  let precoTotalCarrinho = 0;
  for ( const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade ){
    precoTotalCarrinho += 
    catalogo.find(p => p.id === idProdutoNoCarrinho).preco * 
    idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade)
  precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
}

