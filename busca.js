/**
 * Função de heurística a ser utilizada nas Buscas Gulosa e A Estrela.
 * @param estadoObjetivo {Array} Estado dos blocos para o qual deseja-se chegar.
 * @returns {number} Heurística deste vértice.
 */
function distanciaManhattan (estadoObjetivo) {
    let heuristica = 0;

    for (let elemento = 1; elemento <= 8; elemento++) {
        let posicaoElementoEstadoAtual = obterPosicaoElementoArrayMultidimensional(elemento, this.estado);
        let posicaoElementoEstadoObjetivo = obterPosicaoElementoArrayMultidimensional(elemento, estadoObjetivo);
        heuristica += Math.abs(posicaoElementoEstadoAtual[0] - posicaoElementoEstadoObjetivo[0]) + Math.abs(posicaoElementoEstadoAtual[1] - posicaoElementoEstadoObjetivo[1]);
    }

    return heuristica;
}

/**
 * Função de heurística a ser utilizada nas Buscas Gulosa e A Estrela.
 * @param estadoObjetivo {Array} Estado dos blocos para o qual deseja-se chegar.
 * @returns {number} Heurística deste vértice.
 */
function numeroDePecasForaDoLugar (estadoObjetivo) {
    let heuristica = 0;

    for (let elemento = 1; elemento <= 8; elemento++) {
        let posicaoElementoEstadoAtual = obterPosicaoElementoArrayMultidimensional(elemento, this.estado);
        let posicaoElementoEstadoObjetivo = obterPosicaoElementoArrayMultidimensional(elemento, estadoObjetivo);
        if (!arraysSaoIguais(posicaoElementoEstadoAtual, posicaoElementoEstadoObjetivo)) {
            heuristica++;
        }
    }

    return heuristica;
}

/**
 * Executa o AEstrela, Busca Gulosa ou Busca Uniforme para os blocos do 8-Puzzle.
 * O AEstrela só será executado caso o parâmetro habilitarCusto seja verdadeiro, e o parâmetro funcaoHeuristica não seja nulo.
 * A Busca Gulosa só será executada caso o parâmetro habilitarCusto seja falso, e o parâmetro funcaoHeuristica não seja nulo.
 * A Busca Uniforme só será executada caso o parâmetro habilitarCusto seja verdadeiro e o parâmetro funcaoHeuristica seja nulo.
 * @param habilitarCusto {Boolean} Habilita o uso do custo da origem na busca.
 * @param funcaoHeuristica {Function} Função utilizada para calcular a heurística da busca ou null, caso deseja desabilitar o uso da heurística.
 */
function busca(habilitarCusto = true, funcaoHeuristica = distanciaManhattan) {

    /**
     * Enum com os tipos de movimentos que podem ser realizados no 8-Puzzle
     * @type {{BAIXO: string, ESQUERDA: string, DIREITA: string, CIMA: string}}
     */
    const Movimento = {
        CIMA: "Cima",
        BAIXO: "Baixo",
        ESQUERDA: "Esquerda",
        DIREITA: "Direita"
    }

    /**
     * Vértice do grafo utilizado na busca do caminho para encontrar o objetivo utilizando o algoritmo A Estrela.
     */
    class Vertice {

        /**
         * Constrói uma nova instância da classe Vertice
         * @param estado {Array} Estado dos blocos para o vértice atual.
         * @param pai {Vertice} Vértice pai deste vértice na busca pelo A Estrela.
         * @param movimento {Movimento} Movimento que foi feito no vértice pai para resultar neste vértice.
         * @param custo {Number} Custo para chegar do vértice inicial á este vértice.
         * @param estadoObjetivo {Array} Estado dos blocos para qual a busca deseja chegar.
         */
        constructor(estado, pai, movimento, custo, estadoObjetivo) {
            this.estado = estado;
            this.pai = pai;
            this.movimento = movimento;
            this.custo = custo;
            if (funcaoHeuristica != null) {
                this.calcularHeuristica = funcaoHeuristica;
                this.heuristica = this.calcularHeuristica(estadoObjetivo);
            }
        }

        /**
         * Obtém os vizinhos deste vértice.
         * @returns {[{estado, movimento}]} Array de dicionários contendo o estado do vizinho e o movimento utilizado para chegar neste estado.
         */
        obterVizinhos() {
            let posicaoZero = obterPosicaoElementoArrayMultidimensional(0, this.estado);
            let vizinhos = [];

            // Move para cima
            if (posicaoZero[0] > 0) {
                let posicaoOutro = [posicaoZero[0] - 1, posicaoZero[1]];
                let vizinho = swap(this.estado, posicaoZero, posicaoOutro);
                vizinhos.push({estado: vizinho, movimento: Movimento.CIMA});
            }

            // Move para baixo
            if (posicaoZero[0] < this.estado.length - 1) {
                let posicaoOutro = [posicaoZero[0] + 1, posicaoZero[1]];
                let vizinho = swap(this.estado, posicaoZero, posicaoOutro);
                vizinhos.push({estado: vizinho, movimento: Movimento.BAIXO});
            }

            // Move para a esquerda
            if (posicaoZero[1] > 0) {
                let posicaoOutro = [posicaoZero[0], posicaoZero[1] - 1];
                let vizinho = swap(this.estado, posicaoZero, posicaoOutro);
                vizinhos.push({estado: vizinho, movimento: Movimento.ESQUERDA});
            }

            // Move para a direita
            if (posicaoZero[1] < this.estado[posicaoZero[0]].length - 1) {
                let posicaoOutro = [posicaoZero[0], posicaoZero[1] + 1];
                let vizinho = swap(this.estado, posicaoZero, posicaoOutro);
                vizinhos.push({estado: vizinho, movimento: Movimento.DIREITA});
            }

            return vizinhos;
        }
    }

    /**
     * Executa o método de busca A Estrela, obtendo o vértice final.
     * @param estadoInicial {Array} Estado dos blocos que originará a busca.
     * @param estadoFinal {Array} Estado dos blocos que será buscado.
     * @returns {Vertice} Vértice final cujos pais, avôs, bisavôs, ... são os caminhos a serem percorridos.
     */
    function obterVerticeFinal(estadoInicial, estadoFinal) {
        const fila = [];
        const caminho = [];

        const verticeInicial = new Vertice(estadoInicial, null, null, 0, estadoFinal);
        fila.push(verticeInicial);

        while (fila.length > 0) {
            if (habilitarCusto && funcaoHeuristica != null) { // A Estrela
                fila.sort((a, b) => (a.custo + a.heuristica) - (b.custo + b.heuristica));
            } else if ((!habilitarCusto) && funcaoHeuristica != null) { // Busca Gulosa
                fila.sort((a, b) => a.heuristica - b.heuristica);
            } else if (habilitarCusto && funcaoHeuristica === null) { // Busca Uniforme
                fila.sort((a, b) => a.custo - b.custo);
            }

            const verticeAtual = fila.shift();
            caminho.push(verticeAtual.estado);

            if (verticeAtual.heuristica === 0) {
                return verticeAtual;
            }

            const vizinhos = verticeAtual.obterVizinhos();
            for (const vizinho of vizinhos) {
                if (!caminho.includes(vizinho.estado)) {
                    const novoVertice = new Vertice(vizinho.estado, verticeAtual, vizinho.movimento, verticeAtual.custo + 1, estadoFinal);
                    fila.push(novoVertice);
                }
            }
        }

        return null;
    }

    // Executando o A Estrela
    const verticeFinal = obterVerticeFinal(blocosJogo.array, blocosObjetivo.array);

    // Utilizando a solução do A Estrela para resolver o Jogo
    if (verticeFinal == null) {
        window.alert("Não é possível resolver esse problema");
    } else {

        // Obtendo o caminho para resolver o Jogo
        let cabecote = verticeFinal;
        const caminho = [];
        while (cabecote != null) {
            caminho.push(cabecote);
            cabecote = cabecote.pai;
        }

        // Clicando nos bolocos do Jogo
        for (let i = caminho.length - 2; i >= 0; i--) {
            const c = caminho[i];

            // Identificando qual bloco clicar
            const posicaoZero = obterPosicaoElementoArrayMultidimensional(0, blocosJogo.array);
            let posicaoClique = null;
            if (c.movimento === Movimento.CIMA) {
                posicaoClique = [posicaoZero[0] - 1, posicaoZero[1]];
            } else if (c.movimento === Movimento.BAIXO) {
                posicaoClique = [posicaoZero[0] + 1, posicaoZero[1]];
            } else if (c.movimento === Movimento.ESQUERDA) {
                posicaoClique = [posicaoZero[0], posicaoZero[1] - 1];
            } else if (c.movimento === Movimento.DIREITA) {
                posicaoClique = [posicaoZero[0], posicaoZero[1] + 1];
            }

            // Clicando no bloco
            document.getElementById(`areaJogo_${posicaoClique[0]}_${posicaoClique[1]}`).click();
        }
    }
}

/**
 * Executa o AEstrela para os blocos do 8-Puzzle.
 */
function aEstrela() {
    busca(true, distanciaManhattan);
}

/**
 * Executa o Busca Gulosa para os blocos do 8-Puzzle.
 */
function buscaGulosa() {
    busca(false, distanciaManhattan);
}

/**
 * Executa a Busca Uniforme para os blocos do 8-Puzzle.
 */
function buscaUniforme() {
    busca(true, null);
}
