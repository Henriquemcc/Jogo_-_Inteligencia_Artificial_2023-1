/**
 * Representa uma coordenada do jogo puzzle-8.
 */
class Coordenadas {

    /**
     * Constrói uma nova instância da classe Coordeadas.
     * @param {Number} linha Linha em que o bloco está.
     * @param {Number} coluna Coluna em que o bloco está
     */
    constructor(coluna = null, linha = null) {
        this.__linha = linha;
        this.__coluna = coluna;
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
}