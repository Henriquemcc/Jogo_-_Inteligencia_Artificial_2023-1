/**
 * Classe do objeto que controla o tempo do jogo.
 */
class Timer {

    constructor() {
        this.started = false;
    }

    /**
     * Inicia a contagem de tempo.
     */
    start() {
        if (this.started) {
            this.stop();
        }

        this.time = 0
        this.control = setInterval(() => {
            this.time++;
            const hours = Math.trunc(((this.time / 100) / 60) / 60)
            const minutes = Math.trunc(((this.time / 100) / 60) % 60);
            const seconds = Math.trunc((this.time / 100) % 60);
            const milliseconds = this.time % 100;

            // Horas
            const hoursStr = (hours < 10) ? `0${hours}` : `${hours}`

            // Minutos
            const minutesStr = (minutes < 10) ? `0${minutes}` : `${minutes}`

            // Segundos
            const secondsStr = (seconds < 10) ? `0${seconds}` : `${seconds}`

            // Millisegundos
            const millisecondsStr = (milliseconds < 10) ? `0${milliseconds}` : milliseconds;

            // Alterando o conteúdo HTML do elemento
            let element = document.getElementById("timer")
            element.innerHTML = `${hoursStr}:${minutesStr}:${secondsStr}:${millisecondsStr}`;

        }, 10);
    }

    /**
     * Finaliza a contagem de tempo.
     */
    stop() {
        clearInterval(this.control);
        this.control = null;
        this.started = false;
    }
}

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

/**
 * Representa uma coordenada do jogo puzzle-8.
 */
class Coordenadas {

    /**
     * Constrói uma nova instância da classe Coordeadas.
     * @param {Number} linha Linha em que o bloco está.
     * @param {Number} coluna Coluna em que o bloco está
     */
    constructor(linha = null, coluna = null) {
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

/**
 * Objeto que marcará o tempo no jogo
 */
let __timer;

/**
 * Obtém o valor da variável __timer.
 * @returns {Timer} Valor da variável __timer.
 */
function getTimer() {
    return this.__timer;
}

/**
 * Altera o valor da variável __timer.
 * @param {Timer} novoTimer Novo valor para a variável __timer.
 */
function setTimer(novoTimer) {
    try {
        this.__timer.stop();
    } catch { }
    this.__timer = novoTimer;
}

/**
 * Número de linhas que a grade do jogo terá.
 */
let __numeroLinhas;

/**
 * Obtém o valor da variável __numeroLinhas.
 * @returns {Number} Valor da variável __numeroLinhas.
 */
function getNumeroLinhas() {
    return this.__numeroLinhas;
}

/**
 * Altera o valor da variável __numeroLinhas.
 * @param {Number} novoNumeroLinhas Novo valor para a variável __numeroLinhas.
 */
function setNumeroLinhas(novoNumeroLinhas) {
    this.__numeroLinhas = novoNumeroLinhas
}

/**
 * Número de colunas que a grade do jogo terá.
 */
let __numeroColunas;

/**
 * Obtém o valor da variável __numeroColunas.
 * @returns {Number} Valor da variável __numeroColunas.
 */
function getNumeroColunas() {
    return this.__numeroColunas;
}

/**
 * Altera o valor da variável __numeroColunas.
 * @param {Number} novoNumeroColunas Novo valor para a variável __numeroColunas.
 */
function setNumeroColunas(novoNumeroColunas) {
    this.__numeroColunas = novoNumeroColunas;
}

/**
 * Objetivo do jogo.
 */
let __objetivo;

/**
 * Obtém o valor da variável __objetivo.
 * @returns {Array} Valor da variável __objetivo.
 */
function getObjetivo() {
    return __objetivo;
}

/**
 * Altera o valor da variável __objetivo.
 * @param {Array} novoObjetivo Novo valor para a variável __objetivo.
 */
function setObjetivo(novoObjetivo) {
    __objetivo = novoObjetivo;

    // Construindo página de acordo com o objetivo do jogo
    const tagObjetivo = this.document.getElementById("areaObjetivo");
    tagObjetivo.innerHTML = "";
    for (let i = 0; i < __objetivo.length; i++) {
        let tamanhoColuna = Math.floor(12 / __objetivo[i].length);
        for (let j = 0; j < __objetivo[i].length; j++) {
            let valor = (__objetivo[i][j] == 0) ? '' : __objetivo[i][j];
            tagObjetivo.innerHTML += `<div class="col-${tamanhoColuna} bloco" i="${i}" j="${j}">${valor}</div>`;
        }
    }
}

/**
 * Obtém o bloco vazio no jogo.
 * @returns {BlocoCompleto} Bloco contendo os dados do bloco vazio.
 */
function obterBlocoVazio() {
    for (let i = 0; i < getNumeroLinhas(); i++) {
        for (let j = 0; j < getNumeroColunas(); j++) {
            if (getEstado()[i][j] == 0) { return new BlocoCompleto(linha = i, coluna = j, getEstado()[i][j]); }
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
function obterBloco(linha, coluna) {
    if (linha >= getNumeroLinhas()) {
        throw "Número da linha é inváldo";
    }
    if (coluna >= getNumeroColunas()) {
        throw "Número da coluna é inváldo";
    }

    return new BlocoCompleto(linha = linha, coluna = coluna, valor = getEstado()[linha][coluna]);
}

/**
 * Obtém a distância entre dois blocos do jogo.
 * @param {BlocoCompleto} bloco1 Bloco cuja distância será comparada com o bloco2.
 * @param {BlocoCompleto} bloco2 Bloco cuja distância será comparada com o bloco1.
 * @returns {Number} Distância entre os dois blocos.
 */
function calcularDistanciaDoisBlocos(bloco1, bloco2) {
    const distanciaLinhas = Math.abs(bloco1.linha - bloco2.linha);
    const distanciaColunas = Math.abs(bloco1.coluna - bloco2.coluna);
    return distanciaLinhas + distanciaColunas;
}

/**
 * Troca de posição dois blocos do jogo.
 * @param {Coordenadas} coordenada1 Coordenada do primeiro bloco.
 * @param {Coordenadas} coordenada2 Coordenada do segundo bloco.
 */
function swap(coordenada1, coordenada2) {
    let estado = getEstado();
    let tmp = estado[coordenada1.linha][coordenada1.coluna];
    estado[coordenada1.linha][coordenada1.coluna] = estado[coordenada2.linha][coordenada2.coluna];
    estado[coordenada2.linha][coordenada2.coluna] = tmp;
    setEstado(estado);
}

/**
 * Variável que indica se o jogo foi iniciado.
 */
let __jogoIniciado;

/**
 * Obtém o valor da variável __jogoIniciado.
 * @returns {boolean} Valor da variável __jogoIniciado.
 */
function getJogoIniciado() {
    return this.__jogo_iniciado;
}

/**
 * Altera o valor da variável __jogoIniciado.
 * @param {boolean} novoJogoIniciado Novo valor para a variavel __jogoIniciado.
 */
function setJogoIniciado(novoJogoIniciado) {
    this.__jogo_iniciado = novoJogoIniciado;
}

/**
 * Função que é executada quando um bloco for clicado.
 * @param {*} e 
 */
function tratarCliqueNoBloco(e) {

    if (getJogoIniciado()) {
        let blocoSelecionado = obterBloco(linha = e.target.getAttribute('i'), coluna = e.target.getAttribute('j'));
        let blocoVazio = obterBlocoVazio();
        if (calcularDistanciaDoisBlocos(blocoSelecionado, blocoVazio) == 1) {
            swap(blocoSelecionado, blocoVazio);
        } else {
            window.alert("Bloco inválido");
        }
    }
    else {
        window.alert("O jogo não foi iniciado. Para iniciar o jogo clique no botão iniciar (representado pelo símbolo play)")
    }
}

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
        if (Array.isArray(array1[i]) && Array.isArray(array2[i]) && (!arraysSaoIguais(array1[i], array2[i]))) {
            return false;

        }
        // Comparando elemento por elemento
        else if (array1[i] !== array2[i]) {
            return false
        }
    }

    return true;
}

/**
 * Função que é executada quando o jogador vencer o jogo.
 */
function venceuJogo() {
    getTimer().stop();
    alert("Parabéns você venceu o jogo")
}

/**
 * Estado do jogo.
 */
let __estado;

/**
 * Obtém o valor da variável __estado.
 * @returns {Array} Valor da variável __estado.
 */
function getEstado() {
    return __estado;
}

/**
 * Altera o valor da variável __estado.
 * @param {Array} novoEstado Novo valor para a variável __estado.
 */
function setEstado(novoEstado) {
    __estado = novoEstado;

    // Construindo a página de acordo com o estado do jogo
    const tagJogo = this.document.getElementById("areaJogo");
    tagJogo.innerHTML = "";
    for (let i = 0; i < __estado.length; i++) {
        let tamanhoColuna = Math.floor(12 / __estado[i].length);
        for (let j = 0; j < __estado[i].length; j++) {
            let valor = (__estado[i][j] == 0) ? '' : __estado[i][j];
            tagJogo.innerHTML += `<div class="col-${tamanhoColuna} bloco" i="${i}" j="${j}">${valor}</div>`;
            tagJogo.onclick = tratarCliqueNoBloco;
        }
    }

    // Exibindo mensagem de vitória ao jogador
    if (arraysSaoIguais(__estado, getObjetivo())) {
        venceuJogo();
    }
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
 * Obtém um estado aleatório para os blocos.
 * @returns {Array} Array bidimensional contendo um estado aleatório para os blocos.
 */
function obterEstadoAleatorioParaOsBlocos() {

    // Obtendo números aleatórios
    let numerosAleatorios = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    numerosAleatorios = embaralharArray(numerosAleatorios);

    // Colocando os numeros aleatórios nas posições da grade
    let estado = [];
    for (let i = 0, k = 0; i < getNumeroLinhas() && k < numerosAleatorios.length; i++) {
        let linha = [];
        for (let j = 0; j < getNumeroColunas() && k < numerosAleatorios.length; j++, k++) {
            linha.push(numerosAleatorios[k]);
        }
        estado.push(linha);
    }

    return estado;
}

/**
 * Trata o clique no botão novo objetivo.
 */
function novoObjetivo() {
    setObjetivo(obterEstadoAleatorioParaOsBlocos());
    setEstado(obterEstadoAleatorioParaOsBlocos());
    setTimer(new Timer());
    setJogoIniciado(false);
}

/**
 * Função que é executado quando o botão A* é clicado.
 */
function executarAEstrela() {

}

/**
 * Função que é executada quando o botão Jogar é clicado.
 */
function iniciarJogo() {
    getTimer().start();
    console.log(obterBlocoVazio());
    setJogoIniciado(true);
}

/**
 * Sai do menu editar objetivo.
 */
function editarObjetivoSair() {
    // Desabilitando os botões confirmar e cancelar
    document.getElementById("btConfirmar").style.display = 'none';
    document.getElementById("btConfirmar").onclick = null;
    document.getElementById("btCancelar").style.display = 'none';
    document.getElementById("btCancelar").onclick = null;

    // Habilitando os botões padrões
    document.getElementById("btInicio").style.display = '';
    document.getElementById("btAEstrela").style.display = '';
    document.getElementById("btNovoObjetivo").style.display = '';
    document.getElementById("btEditarObjetivo").style.display = '';

    // Reconstruindo objetivo do jogo
    setObjetivo(getObjetivo());
}

/**
 * Função que é executada quando o botão confirmar, dentro da edição do objetivo, é clicado.
 */
function editarObjetivoConfirmar() {

    // Obtendo entrada do usuário
    const objetivoJogo = document.getElementById("areaObjetivo");
    let entradas = [];
    for (let i = 0; i < objetivoJogo.childNodes.length; i++) {
        entradas.push(objetivoJogo.childNodes[i].childNodes[0].childNodes[0].value);
    }

    // Convertendo entrada em um array de objetivo
    let novoObjetivo = [];
    for(let i = 0, k = 0; i < getNumeroLinhas() && k < entradas.length; i++) {
        let linha = [];
        for (let j = 0; j < getNumeroColunas() && k < entradas.length; j++, k++) {
            linha.push(entradas[k]);
        }
        novoObjetivo.push(linha);
    }

    // Alterando o valor do objetivo
    setObjetivo(novoObjetivo);

    // Saindo do jogo
    editarObjetivoSair();
}

/**
 * Função que é executada quando o botão cancelar, dentro da ediçãoo do objetivo, é clicado.
 */
function editarObjetivoCancelar() {
    editarObjetivoSair();
}

/**
 * Função que é executada quando o botão editar objetivo é clicado.
 */
function editarObjetivo() {

    // Desabilitando os botões padrões
    document.getElementById("btInicio").style.display = 'none';
    document.getElementById("btAEstrela").style.display = 'none';
    document.getElementById("btNovoObjetivo").style.display = 'none';
    document.getElementById("btEditarObjetivo").style.display = 'none';

    // Habilitando os botões confirmar e cancelar
    document.getElementById("btConfirmar").style.display = '';
    document.getElementById("btConfirmar").onclick = editarObjetivoConfirmar;
    document.getElementById("btCancelar").style.display = '';
    document.getElementById("btCancelar").onclick = editarObjetivoCancelar;

    // Alterando os elementos de objetivo para caixa de texto
    const objetivoJogo = document.getElementById("areaObjetivo");
    for (let i = 0; objetivoJogo.childNodes.length; i++) {
        objetivoJogo.childNodes[i].innerHTML = "<div class=\"form-control\"><input class=\"textoObjetivo\" type=\"number\"></div>";
    }


}

/**
 * Função principal.
 */
onload = function () {

    // Associando os botões com as funções
    this.document.getElementById("btInicio").onclick = iniciarJogo;
    this.document.getElementById("btAEstrela").onclick = executarAEstrela;
    this.document.getElementById("btNovoObjetivo").onclick = novoObjetivo;
    this.document.getElementById("btEditarObjetivo").onclick = editarObjetivo;

    // Configurando o jogo
    setNumeroColunas(3);
    setNumeroLinhas(3);

    // Criando objetivo e estado inicial
    setObjetivo(obterEstadoAleatorioParaOsBlocos());
    setEstado(obterEstadoAleatorioParaOsBlocos());

    // Criando o timer
    setTimer(new Timer());

    // Não-Iniciando o jogo
    setJogoIniciado(false);
}