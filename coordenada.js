/**
 * Representa uma coordenada do jogo puzzle-8.
 */
class Coordenada {

    /**
     * Constrói uma nova instância da classe Coordeada.
     * @param {Number} linha Linha em que o bloco está.
     * @param {Number} coluna Coluna em que o bloco está
     */
    constructor(coluna = null, linha = null) {
        this.linha = linha;
        this.coluna = coluna;
    }
}