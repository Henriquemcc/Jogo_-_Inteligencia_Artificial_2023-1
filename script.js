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
 * Sai do menu editar.
 */
function editarSair() {
    // Desabilitando os botões confirmar e cancelar
    document.getElementById("btConfirmar").style.display = 'none';
    document.getElementById("btConfirmar").onclick = null;
    document.getElementById("btCancelar").style.display = 'none';
    document.getElementById("btCancelar").onclick = null;

    // Habilitando os botões padrões
    document.getElementById("btInicio").style.display = '';
    document.getElementById("btAEstrela").style.display = '';
    document.getElementById("btNovoObjetivo").style.display = '';
    document.getElementById("btEditar").style.display = '';

    // Reconstruindo objetivo do jogo
    setObjetivo(getObjetivo());
}

/**
 * Função que é executada quando o botão confirmar, dentro da edição, é clicado.
 */
function editarConfirmar() {

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
    editarSair();
}

/**
 * Função que é executada quando o botão cancelar, dentro da ediçãoo, é clicado.
 */
function editarCancelar() {
    editarSair();
}

/**
 * Função que é executada quando o botão editar é clicado.
 */
function editar() {

    // Desabilitando os botões padrões
    document.getElementById("btInicio").style.display = 'none';
    document.getElementById("btAEstrela").style.display = 'none';
    document.getElementById("btNovoObjetivo").style.display = 'none';
    document.getElementById("btEditar").style.display = 'none';

    // Habilitando os botões confirmar e cancelar
    document.getElementById("btConfirmar").style.display = '';
    document.getElementById("btConfirmar").onclick = editarConfirmar;
    document.getElementById("btCancelar").style.display = '';
    document.getElementById("btCancelar").onclick = editarCancelar;

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