# nrainhas-backtracking

## Problema

O problema das N-rainhas consiste em encontrar uma combinação possível de N rainhas num tabuleiro de dimensão N por N tal que nenhuma das rainhas ataque qualquer outra. Duas rainhas atacam-se uma à outra quando estão na mesma linha, na mesma coluna ou na mesma diagonal do tabuleiro.

### Solução

O algoritmo foi desenvolvido com JS e pode ser executado em qualquer navegador, a configuração inicial do tabuleiro e do número de rainhas pode ser alterado no código (script.js)

```
/* Configuração inicial do tabuleiro*/
let nrLinhaEColuna = 5;
let nrLinhaMatriz = nrLinhaEColuna;
let nrColunaMatriz = nrLinhaEColuna;
let rainhas = 5;
```

### Saída
![saida]('https://github.com/mathiasfc/nrainhas-backtracking/blob/master/src/assets/5x5.png?raw=true')
