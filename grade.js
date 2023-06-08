/**
 * Grade de blocos
 */
class Grade {

    /**
     * Constrói uma nova instância da classe Grade.
     * @param {Object} elementoHtml Elemento HTML que vai receber os blocos da grade.
     * @param {Function} funcaoCliqueBloco Função que trata o clique no bloco da grade.
     * @param {Array} array Array bidimensional que será utilizado para construir os blocos.
     */
    constructor(elementoHtml = null, funcaoCliqueBloco = null, array = null) {
        this.__elementoHtml = elementoHtml;
        this.__array = array;
        this.__funcaoCliqueBloco = funcaoCliqueBloco;
    }


    /**
     * Obtém o valor do atributo array.
     */
    get array() {
        return this.__array;
    }

    /**
     * Obtém o elemento HTML que vai receber os blocos da grade.
     */
    get elementoHtml() {
        return this.__elementoHtml;
    }

    /**
     * Obtém a função de tratamento do clique no bloco.
     */
    get funcaoCliqueBloco() {
        return this.__funcaoCliqueBloco;
    }

    /**
     * Altera o valor do atributo array.
     */
    set array(array) {
        this.__array = array;
    }

    /**
     * Altera o elemento HTML que vai receber os blocos da grade.
     */
    set elementoHtml(elementoHtml) {
        this.__elementoHtml = elementoHtml;
    }

    /**
     * Altera a função de tratamento do clique no bloco.
     */
    set funcaoCliqueBloco(funcaoCliqueBloco) {
        this.__funcaoCliqueBloco = funcaoCliqueBloco;
    }

    /**
     * Constrói dinamicamente o código HTML da Grade.
     */
    construirGrade() {
        this.__elementoHtml.innerHTML = "";
        for (let i = 0; i < this.__array.length; i++) {
            let tamanhoColuna = Math.floor(12 / this.__array[i].length);
            for (let j = 0; j < this.__array[i].length; j++) {
                let valor = (this.__array[i][j] == 0) ? '' : this.__array[i][j];
                this.__elementoHtml.innerHTML += `<div class="col-${tamanhoColuna} bloco" i="${i}" j="${j}">${valor}</div>`;
                this.__elementoHtml.onclick = this.funcaoCliqueBloco;
            }
        }
    }

    /**
     * Troca de posição dois blocos do jogo.
     * @param {Coordenadas} coordenada1 Coordenada do primeiro bloco.
     * @param {Coordenadas} coordenada2 Coordenada do segundo bloco.
     */
    swap(coordenada1, coordenada2) {
        let tmp = this.__array[coordenada1.linha][coordenada1.coluna];
        this.__array[coordenada1.linha][coordenada1.coluna] = this.__array[coordenada2.linha][coordenada2.coluna];
        this.__array[coordenada2.linha][coordenada2.coluna] = tmp;
    }

    /**
     * Obtém o bloco vazio (com o elemento 0).
     * @returns {BlocoCompleto} Bloco contendo os dados do bloco vazio.
     */
    obterBlocoVazio() {
        for (let i = 0; i < this.__array.length; i++) {
            for (let j = 0; j < this.__array[i].length; j++) {
                if (this.__array[i][j] == 0) {
                    return new BlocoCompleto(i, j, this.__array[i][j]);
                }
            }
        }
        return null;
    }

    /**
     * Obtém um bloco a partir do valor de sua linha e coluna.
     * @param {Number} linha Valor da linha do bloco.
     * @param {Number} coluna Valor da coluna do bloco.
     * @returns {BlocoCompleto} Bloco com os dados do bloco da linha e coluna solicitada.
     */
    obterBloco(linha, coluna) {
        if (coluna >= this.__array.length) {
            throw "Número da coluna é inváldo";
        }
        if (linha >= this.__array[coluna].length) {
            throw "Número da linha é inváldo";
        }

        return new BlocoCompleto(linha, coluna, this.__array[linha][coluna]);
    }

}