/**
 * Executa o AEstrela para os blocos do 8-Puzzle.
 */
function aEstrela() {

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
    class VerticeAEstrela {

        /**
         * Constrói uma nova instância da classe VerticeAEstrela
         * @param estado {Array} Estado dos blocos para o vértice atual.
         * @param pai {VerticeAEstrela} Vértice pai deste vértice na busca pelo A Estrela.
         * @param movimento {Movimento} Movimento que foi feito no vértice pai para resultar neste vértice.
         * @param custo {Number} Custo para chegar do vértice inicial á este vértice.
         * @param estadoObjetivo {Array} Estado dos blocos para qual a busca deseja chegar.
         */
        constructor(estado, pai, movimento, custo, estadoObjetivo) {
            this.estado = estado;
            this.pai = pai;
            this.movimento = movimento;
            this.custo = custo;
            this.heuristica = this.calcularHeuristica(estadoObjetivo);
        }

        /**
         * Calcula a heurística deste vértice
         * @param estadoObjetivo {Array} Estado dos blocos para o qual deseja-se chegar.
         * @returns {number} Heurística deste vértice.
         */
        calcularHeuristica(estadoObjetivo) {
            let heuristica = 0;

            for (let elemento = 1; elemento <= 8; elemento++) {
                let posicaoElementoEstadoAtual = obterPosicaoElementoArrayMultidimensional(elemento, this.estado);
                let posicaoElementoEstadoObjetivo = obterPosicaoElementoArrayMultidimensional(elemento, estadoObjetivo);
                heuristica += Math.abs(posicaoElementoEstadoAtual[0] - posicaoElementoEstadoObjetivo[0]) + Math.abs(posicaoElementoEstadoAtual[1] - posicaoElementoEstadoObjetivo[1]);
            }

            return heuristica;
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
     * @returns {VerticeAEstrela} Vértice final cujos pais, avôs, bisavôs, ... são os caminhos a serem percorridos.
     */
    function obterVerticeFinalAEstrela(estadoInicial, estadoFinal) {
        const fila = [];
        const caminho = [];

        const verticeInicial = new VerticeAEstrela(estadoInicial, null, null, 0, estadoFinal);
        fila.push(verticeInicial);

        while (fila.length > 0) {
            fila.sort((a, b) => (a.custo + a.heuristica) - (b.custo + b.heuristica));
            const verticeAtual = fila.shift();
            caminho.push({estado: verticeAtual.estado, movimento: verticeAtual.movimento});

            if (verticeAtual.heuristica === 0) {
                return verticeAtual;
            }

            const vizinhos = verticeAtual.obterVizinhos();
            for (const vizinho of vizinhos) {

                // Verificando se o array de dicionários 'caminho' contém algum element cujo atributo 'estado' contém o 'estado' do vértice do vizinho
                let caminhoIncluiEstadoDoVizinho = false;
                for (const c of caminho) {
                    if (arraysSaoIguais(c.estado, vizinho.estado)) {
                        caminhoIncluiEstadoDoVizinho = true;
                        break;
                    }
                }

                if (!caminhoIncluiEstadoDoVizinho) {
                    const novoVertice = new VerticeAEstrela(vizinho.estado, verticeAtual, vizinho.movimento, verticeAtual.custo + 1, estadoFinal);
                    fila.push(novoVertice);
                }
            }
        }

        return null;
    }

    // Executando o A Estrela
    const verticeFinal = obterVerticeFinalAEstrela(blocosJogo.array, blocosObjetivo.array);

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