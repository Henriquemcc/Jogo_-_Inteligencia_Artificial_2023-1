/**
 * Obtém os vértices vizinhos de um vértice do grafo representado pelo array bidimensional do jogo 8-Puzzle.
 * @param {Array} oitoPuzzleArray Array bidimensional do jogo 8-Puzzle
 * @returns {Array} Arrays com arrays bidimensionais dos vizinhos do vértice do grafo do 8-Puzzle.
 */
function obterVizinhos(oitoPuzzleArray) {
    let coordenadaZero = obterCoordenadasElementoArrayBidimensional(0, oitoPuzzleArray);
    let vizinhos = [];

    // Move para cima
    if (coordenadaZero.coluna > 0) {
        let coordenadaOutroElemento = new Coordenadas(coordenadaZero.coluna - 1, coordenadaZero.linha);
        let vizinho = swap(oitoPuzzleArray, coordenadaZero, coordenadaOutroElemento);
        vizinhos.push(vizinho);
    }

    // Move para baixo
    if (coordenadaZero.coluna < oitoPuzzleArray.length - 1) {
        let coordenadaOutroElemento = new Coordenadas(coordenadaZero.coluna + 1, coordenadaZero.linha);
        let vizinho = swap(oitoPuzzleArray, coordenadaZero, coordenadaOutroElemento);
        vizinhos.push(vizinho);
    }

    // Move para esquerda
    if (coordenadaZero.linha > 0) {
        let coordenadaOutroElemento = new Coordenadas(coordenadaZero.coluna, coordenadaZero.linha - 1);
        let vizinho = swap(oitoPuzzleArray, coordenadaZero, coordenadaOutroElemento);
        vizinhos.push(vizinho);
    }

    // Move para a direita
    if (coordenadaZero.linha < oitoPuzzleArray.length - 1) {
        let coordenadaOutroElemento = new Coordenadas(coordenadaZero.coluna, coordenadaZero.linha + 1);
        let vizinho = swap(oitoPuzzleArray, coordenadaZero, coordenadaOutroElemento);
        vizinhos.push(vizinho);
    }

    return vizinhos;
}