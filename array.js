/**
 * Verifica se dois arrays são iguais.
 * @param {Array} array1 Array a ser comparado com array2.
 * @param {Array} array2 Array a ser comparado com array1.
 * @returns {boolean} Valor booleano indicando se os dois arrays são iguais.
 */
function arraysSaoIguais(array1, array2) {

    // Verificando se o tamanho é igual
    if (array1.length !== array2.length) {
        return false;
    }

    // Verificando elemento por elemento
    for (let i = 0; i < array1.length; i++) {

        // Realizando recursividade caso seja um array multidimensional
        if (Array.isArray(array1[i]) && Array.isArray(array2[i])) {
            return arraysSaoIguais(array1[i], array2[i]);
        }
        // Comparando elemento por elemento
        else if (array1[i] !== array2[i]) {
            return false
        }
    }

    return true;
}

/**
 * Converte um array bidimensional em um array unidimensional.
 * @param {Array} arrayBidimensional Array bidimensional que será convertido para um array unidimensional.
 * @returns Array unidimensional com todos os elementos do array bidimensional.
 */
function converterArrayBidimensionalParaUnidimensional(arrayBidimensional) {
    let arrayUnidimensional = [];
    for (let i = 0; i < arrayBidimensional.length; i++) {
        for (let j = 0; j < arrayBidimensional[i].length; j++) {
            arrayUnidimensional.push(arrayBidimensional[i][j]);
        }
    }
    return arrayUnidimensional;
}

/**
 * Embaralha os elementos de um array.
 * @param {Array} array Array cuja cópia será embaralhada.
 * @returns Array cópia do array de entrada embaralhado.
 */
function embaralharArray(array) {
    array = Array.from(array);
    for (let i = 0; i < array.length; i++) {
        const j = Math.floor(Math.random() * (array.length - 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Obtém as coordenadas de um elemento em um array bidimensional.
 * @param {*} elemento Elemento a ser procurado.
 * @param {Array} array Array bidimensional em que o elemento será procurado.
 * @returns {Coordenada} Coordenadas do elemento procurado.
 */
function obterCoordenadasElementoArrayBidimensional(elemento, array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === elemento) {
                return new Coordenada(i, j);
            }
        }
    }
    return null;
}

/**
 * Troca dois elementos de posição em um array
 * @param {Array} array Array que será clonado e o clone terá elementos trocados de posição.
 * @param {Coordenada} coordenada1 Coordenada do primeiro elemento.
 * @param {Coordenada} coordenada2 Coordenada do segundo elemento.
 * @returns {Array} Array clonada com os elementos trocados de posição.
 */
function swap(array, coordenada1, coordenada2) {
    array = clonarArrayMultidimensional(array);
    let tmp = array[coordenada1.coluna][coordenada1.linha];
    array[coordenada1.coluna][coordenada1.linha] = array[coordenada2.coluna][coordenada2.linha];
    array[coordenada2.coluna][coordenada2.linha] = tmp;
    return array;
}

/**
 * Obtém a posição do menor elemento de um array.
 * @param {Array} array Array a ser obtida a posição do menor elemento.
 * @returns {Number} Posicão do menor elemento.
 */
function obterPosicaoMenorElemento(array) {
    let menorElemento = array[0];
    let posicaoMenorElemento = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] < menorElemento) {
            menorElemento = array[i];
            posicaoMenorElemento = i;
        }
    }
    return posicaoMenorElemento;
}

/**
 * Clona um array multidimensional.
 * @param array Array multidimensional a ser clonado.
 * @returns {Array} Array multidimensional clonado.
 */
function clonarArrayMultidimensional(array) {
    let clone = [];
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            clone.push(clonarArrayMultidimensional(array[i]));
        } else {
            clone.push(array[i]);
        }
    }
    return clone;
}