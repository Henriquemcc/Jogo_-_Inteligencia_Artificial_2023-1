/**
 * Representa um bloco do jogo puzzle-8.
 */
class BlocoCompleto {

    /**
     * Constrói uma nova instância da classe Bloco.
     * @param {Number} linha Linha em que o bloco está.
     * @param {Number} coluna Coluna em que o bloco está
     * @param {*} Valor do bloco.
     */
    constructor(linha = null, coluna = null, valor = null) {
        this.__linha = linha;
        this.__coluna = coluna;
        this.__valor = valor;
    }

    /**
     * Obtém o valor da linha do bloco.
     */
    get linha() {
        return this.__linha;
    }

    /***
     * Altera o valor da linha do bloco.
     */
    set linha(novaLinha) {
        this.__linha = novaLinha;
    }

    /**
     * Obtém o valor da coluna do bloco.
     */
    get coluna() {
        return this.__coluna;
    }

    /**
     * Altera o valor da coluna do bloco.
     */
    set coluna(novaColuna) {
        this.__coluna = novaColuna;
    }

    /**
     * Obtém o valor do bloco.
     */
    get valor() {
        return this.__valor;
    }

    /**
     * Altera o valor do bloco.
     */
    set valor(novoValor) {
        this.__valor = novoValor;
    }
}