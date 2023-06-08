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

}