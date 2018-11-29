/* Configuração inicial do tabuleiro*/
let nrLinhaMatriz = 5;
let nrColunaMatriz = 5;
let rainhas = 5;

/* Variáveis Globais */
let solucoes = 0;

window.onload = function() {
  criaTabuleiro(nrLinhaMatriz, nrColunaMatriz);
  let colunaAtual = 0;
  backtracking(rainhas, colunaAtual);
};

let criaTabuleiro = (nrLinhaMatriz, nrColunaMatriz) => {
  let inverteCor = false;
  let matriz = $('.matriz');
  for (let i = 0; i < nrLinhaMatriz; i++) {
    matriz.append("<div class='linha'>");
    for (let j = 0; j < nrColunaMatriz; j++) {
      let bloco = "<div class='bloco " + (inverteCor ? 'black' : 'white') + "' linha=" + i + ' coluna=' + j + '></div>';
      inverteCor = !inverteCor;
      $('.linha')
        .last()
        .append(bloco);
      if (j == nrColunaMatriz) matriz.append('</div>');
    }
  }
};

let addRainha = (li, col) => {
  $('.matriz[type="default"] .bloco[linha=' + li + '][coluna=' + col + ']').addClass('rainha');
};

let removeRainha = (li, col) => {
  $('.matriz[type="default"] .bloco[linha=' + li + '][coluna=' + col + ']').removeClass('rainha');
};

/*
	função que resolve o problema
	retorna true se conseguiu resolver e false caso contrário
*/
let backtracking = (rainhas, col) => {
  /*if (solucoes > 1) {
    return;
  }*/
  if (col == rainhas) {
    let matrizSolucao = $('.matriz[type="default"]').clone();
    matrizSolucao.attr('type', 'solution' + (solucoes + 1));
    matrizSolucao.removeClass('hide');
    $('.resultados').append(matrizSolucao);
    $('div[type="solution' + (solucoes + 1)).before('<span class="span-solucao">Solução ' + (solucoes + 1) + '</span>');
    console.log('\nSolucao ' + (solucoes + 1) + ' encontrada.');
    solucoes++;
    return;
  }
  for (let i = 0; i < rainhas; i++) {
    // verifica se é seguro colocar a rainha naquela coluna
    if (posicaoValida(rainhas, i, col)) {
      addRainha(i, col);

      // chamada recursiva
      backtracking(rainhas, col + 1);

      removeRainha(i, col);
    }
  }
};

// verifica se é uma posição válida, ou seja, a rainha não será atacada
let posicaoValida = (rainhas, lin, col) => {
  let i, j;

  // verifica se ocorre ataque na linha
  for (i = 0; i < rainhas; i++) {
    if ($('.matriz[type="default"] .bloco[linha=' + lin + '][coluna=' + i + ']').hasClass('rainha')) return false;
  }

  //verifica se ocorre ataque na coluna
  for (i = 0; i < rainhas; i++) {
    if ($('.matriz[type="default"] .bloco[linha=' + i + '][coluna=' + col + ']').hasClass('rainha')) return false;
  }

  // verifica se ocorre ataque na diagonal principal
  // acima e abaixo
  for (i = lin, j = col; i >= 0 && j >= 0; i--, j--) {
    if ($('.matriz[type="default"] .bloco[linha=' + i + '][coluna=' + j + ']').hasClass('rainha')) return false;
  }
  for (i = lin, j = col; i < rainhas && j < rainhas; i++, j++) {
    if ($('.matriz[type="default"] .bloco[linha=' + i + '][coluna=' + j + ']').hasClass('rainha')) return false;
  }

  // verifica se ocorre ataque na diagonal secundária
  // acima e abaixo
  for (i = lin, j = col; i >= 0 && j < rainhas; i--, j++) {
    if ($('.matriz[type="default"] .bloco[linha=' + i + '][coluna=' + j + ']').hasClass('rainha')) return false;
  }
  for (i = lin, j = col; i < rainhas && j >= 0; i++, j--) {
    if ($('.matriz[type="default"] .bloco[linha=' + i + '][coluna=' + j + ']').hasClass('rainha')) return false;
  }

  // se chegou aqui, então está seguro (retorna true)
  return true;
};
