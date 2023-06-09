/**
 * Grade de blocos
 */
class Grade {

    /**
     * Constrói uma nova instância da classe Grade.
     * @param {Object} elementoHtml Elemento HTML que vai receber os blocos da grade.
     * @param {Function} funcaoCliqueBloco Função que trata o clique no bloco da grade.
     * @param {Array} array Array bidimensional que será utilizado para construir os blocos.
     * @param {Number} numeroLinhas Número de linhas.
     * @param {Number} numeroColunas Número de colunas.
     */
    constructor(elementoHtml = null, funcaoCliqueBloco = null, array = null, numeroLinhas = null, numeroColunas = null) {

        if (numeroColunas == null && array != null) {
            numeroColunas = array.length;
        }

        if (numeroLinhas == null && array != null) {
            numeroLinhas = 0;
            for (let i = 0; i < array.length; i++) {
                if (array[i] != null) {
                    numeroLinhas = Math.max(numeroLinhas, array[i].length);
                }
            }
        }

        this.__elementoHtml = elementoHtml;
        this.__array = array;
        this.__numeroColunas = numeroColunas;
        this.__numeroLinhas = numeroLinhas;
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
     * Obtém o número de linhas.
     */
    get numeroColunas() {
        return this.__numeroColunas;
    }

    /**
     * Obtém o número de colunas.
     */
    get numeroLinhas() {
        return this.__numeroLinhas;
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
     * Altera o número de linhas.
     */
    set numeroColunas(numeroColunas) {
        this.__numeroColunas = numeroColunas;
    }

    /**
     * Altera o número de colunas.
     */
    set numeroLinhas(numeroLinhas) {
        this.__numeroLinhas = numeroLinhas;
    }

    /**
     * Constrói dinamicamente o código HTML da Grade.
     */
    construirGrade() {
        this.__elementoHtml.innerHTML = "";
        for (let i = 0; i < this.__array.length; i++) {
            let tamanhoColuna = Math.floor(12 / this.__array[i].length);
            for (let j = 0; j < this.__array[i].length; j++) {
                let valor = (this.__array[i][j] === 0) ? '' : this.__array[i][j];
                this.__elementoHtml.innerHTML += `<div class="col-${tamanhoColuna} bloco" id="${this.__elementoHtml.id}_${i}_${j}">${valor}</div>`;
                this.__elementoHtml.onclick = this.funcaoCliqueBloco;
            }
        }
    }

    /**
     * Troca de posição dois blocos do jogo.
     * @param {Coordenada} coordenada1 Coordenada do primeiro bloco.
     * @param {Coordenada} coordenada2 Coordenada do segundo bloco.
     */
    swap(coordenada1, coordenada2) {
        let tmp = this.__array[coordenada1.coluna][coordenada1.linha];
        this.__array[coordenada1.coluna][coordenada1.linha] = this.__array[coordenada2.coluna][coordenada2.linha];
        this.__array[coordenada2.coluna][coordenada2.linha] = tmp;
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
    obterBloco(coluna, linha) {
        if (coluna >= this.__array.length) {
            throw "Número da coluna é inváldo";
        }
        if (linha >= this.__array[coluna].length) {
            throw "Número da linha é inváldo";
        }

        return new BlocoCompleto(coluna, linha, this.__array[coluna][linha]);
    }

    /**
     * Habilita o modo de edição nas tags HTML da grade.
     */
    habilitarModoEdicao() {
        let dados = converterArrayBidimensionalParaUnidimensional(this.__array);
        for (let i = 0; i < this.elementoHtml.childNodes.length; i++) {
            this.elementoHtml.childNodes[i].innerHTML = `<div class=\"form-control\"><input class=\"textoObjetivo\" type=\"number\" value=\"${dados[i]}\"></div>`;
        }
    }

    /**
     * Obtém as entradas do usuário no modo de edição.
     * @returns {Array} Entradas do usuário.
     */
    obterEntradasEdiacao() {
        // Obtendo entrada do usuário
        let entradas = [];
        for (let i = 0; i < this.elementoHtml.childNodes.length; i++) {
            entradas.push(this.elementoHtml.childNodes[i].childNodes[0].childNodes[0].value);
        }

        return entradas;
    }

    /**
     * Obtém os elementos inválidos das entradas do usuário no modo de edição.
     * @returns {Array} Elementos inválidos das entradas do usuário.
     */
    entradasInvalidasEdicao() {
        let entradas = this.obterEntradasEdiacao();

        // Verificando se as entradas são válidas
        let elementosInvalidos = [];
        for (let i = 0; i < entradas.length; i++) {
            if (isNaN(entradas[i]) || entradas[i] < 0 || entradas[i] > 8) {
                elementosInvalidos.push(entradas[i]);
            }
        }

        return elementosInvalidos;
    }

    /**
     * Aplica a entrada do usuário no array.
     */
    aplicarEdicao() {
        let entradas = this.obterEntradasEdiacao();

        if (this.entradasInvalidasEdicao().length > 0) {
            throw "Entrada Inválida";
        }

        // Convertendo entrada em um array bidimensional.
        let novoArray = [];
        for (let i = 0, k = 0; i < this.__numeroLinhas && k < entradas.length; i++) {
            let linha = [];
            for (let j = 0; j < this.__numeroColunas && k < entradas.length; j++, k++) {
                linha.push(entradas[k]);
            }
            novoArray.push(linha);
        }

        // Alterando o valor do array
        this.__array = novoArray;
    }
}