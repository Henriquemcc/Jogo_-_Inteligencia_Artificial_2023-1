/* ------------------------- */
/* Variáveis globais: Inicio */
/* ------------------------- */

/**
 * Área dos blocos do Objetivo
 */
let blocosObjetivo;

/**
 * Área dos blocos do Jogo.
 */
let blocosJogo;

/* Variáveis globais: Fim */

/* --------------------------------- */
/* Variáveis globais ocultas: Inicio */
/* --------------------------------- */

/**
 * Variável que indica se o jogo foi iniciado.
 */
let __jogoIniciado;

/**
 * Número de colunas que a grade do jogo terá.
 */
let __numeroColunas;

/**
 * Número de linhas que a grade do jogo terá.
 */
let __numeroLinhas;

/**
 * Objeto que marcará o tempo no jogo
 */
let __timer;

/* Variáveis globais ocultas: Fim */

/* --------------------------------------------- */
/* Getters das variáveis globais ocultas: Inicio */
/* --------------------------------------------- */

/**
 * Obtém o valor da variável __estado.
 * @returns {Array} Valor da variável __estado.
 */
function getEstado() {
    return blocosJogo.array;
}

/**
 * Obtém o valor da variável __jogoIniciado.
 * @returns {boolean} Valor da variável __jogoIniciado.
 */
function getJogoIniciado() {
    return this.__jogo_iniciado;
}

/**
 * Obtém o valor da variável __numeroColunas.
 * @returns {Number} Valor da variável __numeroColunas.
 */
function getNumeroColunas() {
    return this.__numeroColunas;
}

/**
 * Obtém o valor da variável __numeroLinhas.
 * @returns {Number} Valor da variável __numeroLinhas.
 */
function getNumeroLinhas() {
    return this.__numeroLinhas;
}

/**
 * Obtém o valor da variável __objetivo.
 * @returns {Array} Valor da variável __objetivo.
 */
function getObjetivo() {
    return blocosObjetivo.array;
}

/**
 * Obtém o valor da variável __timer.
 * @returns {Timer} Valor da variável __timer.
 */
function getTimer() {
    return this.__timer;
}

/* Getters das variáveis globais ocultas: Fim */

/* --------------------------------------------- */
/* Setters das variáveis globais ocultas: Inicio */
/* --------------------------------------------- */

/**
 * Altera o valor da variável __estado.
 * @param {Array} novoEstado Novo valor para a variável __estado.
 */
function setEstado(novoEstado) {

    blocosJogo = new Grade(elementoHtml = this.document.getElementById("areaJogo"),funcaoCliqueBloco = tratarCliqueNoBloco,array = novoEstado);
    blocosJogo.construirGrade();
}

/**
 * Altera o valor da variável __jogoIniciado.
 * @param {boolean} novoJogoIniciado Novo valor para a variavel __jogoIniciado.
 */
function setJogoIniciado(novoJogoIniciado) {
    this.__jogo_iniciado = novoJogoIniciado;
}

/**
 * Altera o valor da variável __numeroColunas.
 * @param {Number} novoNumeroColunas Novo valor para a variável __numeroColunas.
 */
function setNumeroColunas(novoNumeroColunas) {
    this.__numeroColunas = novoNumeroColunas;
}

/**
 * Altera o valor da variável __numeroLinhas.
 * @param {Number} novoNumeroLinhas Novo valor para a variável __numeroLinhas.
 */
function setNumeroLinhas(novoNumeroLinhas) {
    this.__numeroLinhas = novoNumeroLinhas
}

/**
 * Altera o valor da variável __objetivo.
 * @param {Array} novoObjetivo Novo valor para a variável __objetivo.
 */
function setObjetivo(novoObjetivo) {

    blocosObjetivo = new Grade(elementoHtml = this.document.getElementById("areaObjetivo"), funcaoCliqueBloco = null, array = novoObjetivo);
    blocosObjetivo.construirGrade();
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

/* Setters das variáveis globais ocultas: Fim */

/**
 * Obtém o bloco vazio no jogo.
 * @returns {BlocoCompleto} Bloco contendo os dados do bloco vazio.
 */
function obterBlocoVazio() {
    return blocosJogo.obterBlocoVazio();
}

/**
 * Obtém um bloco a partir do valor de sua linha e coluna.
 * @param {Number} linha Valor da linha do bloco.
 * @param {Number} coluna Valor da coluna do bloco.
 * @returns {BlocoCompleto} Bloco com os dados do bloco da linha e coluna solicitada.
 */
function obterBloco(linha, coluna) {
    return blocosJogo.obterBloco(linha, coluna);
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
    blocosJogo.swap(coordenada1, coordenada2);
    blocosJogo.construirGrade();
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

            // Alterando posição dos blocos
            swap(blocoSelecionado, blocoVazio);
            
            // Exibindo mensagem de vitória ao jogador
            if (arraysSaoIguais(getEstado(), getObjetivo())) {
                venceuJogo();
            }
        } else {
            window.alert("Bloco inválido");
        }
    }
    else {
        window.alert("O jogo não foi iniciado. Para iniciar o jogo clique no botão iniciar (representado pelo símbolo play)")
    }
}

/**
 * Função que é executada quando o jogador vencer o jogo.
 */
function venceuJogo() {
    getTimer().stop();
    alert("Parabéns você venceu o jogo")
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
 * Trata o clique no botão novo jogo.
 */
function novoJogo() {
    setObjetivo(obterEstadoAleatorioParaOsBlocos());
    setEstado(obterEstadoAleatorioParaOsBlocos());
    setTimer(new Timer());
    setJogoIniciado(false);
}

/**
 * Função que é executado quando o botão A* é clicado.
 */
function executarAEstrela() {}

/**
 * Função que é executada quando o botão Jogar é clicado.
 */
function iniciarJogo() {
    getTimer().start();
    setJogoIniciado(true);
}

/**
 * Função principal.
 */
onload = function () {

    // Associando os botões com as funções
    this.document.getElementById("btInicio").onclick = iniciarJogo;
    this.document.getElementById("btAEstrela").onclick = executarAEstrela;
    this.document.getElementById("btNovoJogo").onclick = novoJogo;
    this.document.getElementById("btEditar").onclick = editar;

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