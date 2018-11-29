var linhaMatriz = 7;
var colunaMatriz = 7;
let solucoes = 0;

window.onload = function() {
  criaTabuleiro(linhaMatriz, colunaMatriz);

  //addRainha(3, 3);
  let rainhas = 8;
  let colunaAtual = 0;
  backtracking(rainhas, colunaAtual);
};

let criaTabuleiro = (linhaMatriz, colunaMatriz) => {
  let matriz = $('.matriz');
  for (let i = 0; i < linhaMatriz; i++) {
    matriz.append("<div class='linha'>");
    for (let j = 0; j < colunaMatriz; j++) {
      let bloco = "<div class='bloco' linha=" + i + ' coluna=' + j + '></div>';
      $('.linha')
        .last()
        .append(bloco);
      if (j == colunaMatriz) matriz.append('</div>');
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
  if (solucoes > 10) {
    return;
  }
  if (col == rainhas) {
    let matrizSolucao = $('.matriz[type="default"]').clone();
    matrizSolucao.attr('type', 'solution' + (solucoes + 1));
    matrizSolucao.removeClass('hide');
    $('body').append(matrizSolucao);
    console.log('\nSolucao ' + (solucoes + 1) + ' encontrada.');
    solucoes++;
    return;
  }
  for (let i = 0; i < rainhas; i++) {
    // verifica se é seguro colocar a rainha naquela coluna
    if (posicaoValida(rainhas, i, col)) {
      // insere a rainha (marca com 1)
      addRainha(i, col);
      //tab[i][col] = 1;
      //$('.bloco[linha=' + i + '][coluna=' + col + ']').addClass('rainha');

      // chamada recursiva
      backtracking(rainhas, col + 1);

      // remove a rainha (backtracking)
      removeRainha(i, col);
      //$('.bloco[linha=' + i + '][coluna=' + col + ']').removeClass('rainha');
      //tab[i][col] = 0;
    }
  }
};

// verifica se é uma posição válida, ou seja, a rainha não será atacada
let posicaoValida = (rainhas, lin, col) => {
  let i, j;

  // verifica se ocorre ataque na linha
  for (i = 0; i < rainhas; i++) {
    //if (tab[lin][i] == 1) return false;
    if ($('.matriz[type="default"] .bloco[linha=' + lin + '][coluna=' + i + ']').hasClass('rainha')) return false;
  }

  //verifica se ocorre ataque na coluna
  for (i = 0; i < rainhas; i++) {
    //if (tab[i][col] == 1) return false;
    if ($('.matriz[type="default"] .bloco[linha=' + i + '][coluna=' + col + ']').hasClass('rainha')) return false;
  }

  // verifica se ocorre ataque na diagonal principal
  // acima e abaixo
  for (i = lin, j = col; i >= 0 && j >= 0; i--, j--) {
    //if (tab[i][j] == 1) return false;
    if ($('.matriz[type="default"] .bloco[linha=' + i + '][coluna=' + j + ']').hasClass('rainha')) return false;
  }
  for (i = lin, j = col; i < rainhas && j < rainhas; i++, j++) {
    //if (tab[i][j] == 1) return false;
    if ($('.matriz[type="default"] .bloco[linha=' + i + '][coluna=' + j + ']').hasClass('rainha')) return false;
  }

  // verifica se ocorre ataque na diagonal secundária
  // acima e abaixo
  for (i = lin, j = col; i >= 0 && j < rainhas; i--, j++) {
    //if (tab[i][j] == 1) return false;
    if ($('.matriz[type="default"] .bloco[linha=' + i + '][coluna=' + j + ']').hasClass('rainha')) return false;
  }
  for (i = lin, j = col; i < rainhas && j >= 0; i++, j--) {
    //if (tab[i][j] == 1) return false;
    if ($('.matriz[type="default"] .bloco[linha=' + i + '][coluna=' + j + ']').hasClass('rainha')) return false;
  }

  // se chegou aqui, então está seguro (retorna true)
  return true;
};

function marcaPosicoes(li, col) {
  /*mesma coluna ou mesma linha faz parte range

    se -1 linha e -1 coluna faz parte

    se +1 linha e +1 coluna faz parte

    se +1 linha e -1 coluna faz parte

    se -1 linha e +1 coluna faz parte*/
  for (var i = 0; i < linhaMatriz; i++) {
    for (var j = 0; j < colunaMatriz; j++) {
      if (!$('.bloco[linha=' + i + '][coluna=' + j + ']').hasClass('rainha')) {
        if (li - 1 == i && col - 1 == j) {
          $('.bloco[linha=' + i + '][coluna=' + j + ']').addClass('rainha');
          marcaPosicoes(i, j);
        } else if (li + 1 == i && col + 1 == j) {
          $('.bloco[linha=' + i + '][coluna=' + j + ']').addClass('rainha');
          marcaPosicoes(i, j);
        } else if (li + 1 == i && col - 1 == j) {
          $('.bloco[linha=' + i + '][coluna=' + j + ']').addClass('rainha');
          marcaPosicoes(i, j);
        } else if (li - 1 == i && col + 1 == j) {
          //$(".bloco[linha="+i+"][coluna="+j+"]").addClass('rainha');
          //marcaPosicoes(i,j);
        }
      }
    }
  }

  /*//cima
    for(var i=col;i>=0;i--){
        $(".bloco[linha="+i+"][coluna="+li+"]").addClass('rainha');
    }

    //baixo
    for(var i=col;i<=colunaMatriz;i++){
        $(".bloco[linha="+i+"][coluna="+li+"]").addClass('rainha');
    }

    //esquerda
    for(var i=col;i>=0;i--){
        $(".bloco[linha="+li+"][coluna="+i+"]").addClass('rainha');
    }

    //direita
    for(var i=col;i<=colunaMatriz;i++){
        $(".bloco[linha="+li+"][coluna="+i+"]").addClass('rainha');
    }

    //diagonais esquerda-cima
    for(var i=li;i>=0;i--){
        $(".bloco[linha="+i+"][coluna="+i+"]").addClass('rainha');
    }

    //diagonais direita-baixo
    for(var i=li;i<=linhaMatriz;i++){
        $(".bloco[linha="+i+"][coluna="+i+"]").addClass('rainha');
    }


    //todo

    //diagonais direita-cima
    for(var i=li;i<=linhaMatriz;i++){
        $(".bloco[linha="+i+"][coluna="+i+"]").addClass('rainha');
    }

    //diagonais esquerda-baixo
    for(var i=li;i<=linhaMatriz;i++){
        $(".bloco[linha="+i+"][coluna="+i+"]").addClass('rainha');
    }*/
}
