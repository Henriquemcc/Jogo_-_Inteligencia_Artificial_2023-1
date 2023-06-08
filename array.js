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