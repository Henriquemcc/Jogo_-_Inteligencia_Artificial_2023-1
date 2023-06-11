/* ------------------------- */
/* Variáveis globais: Inicio */
/* ------------------------- */

/**
 * Área dos blocos do Objetivo
 * @type {Grade}
 */
let blocosObjetivo;

/**
 * Área dos blocos do Jogo.
 * @type {Grade}
 */
let blocosJogo;

/**
 * Modo de execução.
 * @type {String}
 */
let modo;

/**
 * Número de colunas que a grade do jogo terá.
 * @type {Number}
 */
let numeroColunas;

/**
 * Número de linhas que a grade do jogo terá.
 * @type {Number}
 */
let numeroLinhas;

/**
 * Objeto que marcará o tempo no jogo
 * @type {Timer}
 */
let timer;

/* Variáveis globais: Fim */

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
 * Função executada quando um bloco for clicado.
 * @param {*} e
 */
function tratarCliqueNoBloco(e) {

    if (modo === 'Jogo' || modo === 'Algoritmo') {
        let idBlocoSelecionado = e.target.id;
        let i = parseInt(idBlocoSelecionado.substring(idBlocoSelecionado.indexOf('_') + 1, idBlocoSelecionado.lastIndexOf('_')));
        let j = parseInt(idBlocoSelecionado.substring(idBlocoSelecionado.lastIndexOf('_') + 1, idBlocoSelecionado.length));
        let blocoSelecionado = blocosJogo.obterBloco(i, j);
        let blocoVazio = blocosJogo.obterBlocoVazio();
        if (calcularDistanciaDoisBlocos(blocoSelecionado, blocoVazio) === 1) {

            // Alterando posição dos blocos
            blocosJogo.swap(blocoSelecionado, blocoVazio)
            blocosJogo.construirGrade();

            // Exibindo mensagem de vitória ao jogador
            if (arraysSaoIguais(blocosJogo.array, blocosObjetivo.array)) {
                venceuJogo();
            }
        } else {
            window.alert("Bloco inválido");
        }
    } else if (modo === 'Nao Iniciado') {
        window.alert("O jogo não foi iniciado. Para iniciar o jogo clique no botão iniciar (representado pelo símbolo play)")
    }
}

/**
 * Função executada quando o jogador vencer o jogo.
 */
function venceuJogo() {
    timer.stop();
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

    // Colocando os números aleatórios nas posições da grade
    let estado = [];
    for (let i = 0, k = 0; i < numeroLinhas && k < numerosAleatorios.length; i++) {
        let linha = [];
        for (let j = 0; j < numeroColunas && k < numerosAleatorios.length; j++, k++) {
            linha.push(numerosAleatorios[k]);
        }
        estado.push(linha);
    }

    return estado;
}

/**
 * Função que é executado quando o botão Novo Jogo é clicado.
 */
function novoJogo() {

    // Criando o array do jogo e do objetivo
    let arrayJogo = obterEstadoAleatorioParaOsBlocos();
    let arrayObjetivo = arrayJogo;
    while (arraysSaoIguais(arrayJogo, arrayObjetivo)) {
        arrayObjetivo = obterEstadoAleatorioParaOsBlocos();
    }

    criarJogo(arrayJogo, arrayObjetivo)
}

/**
 * Função executada quando o botão A* é clicado.
 */
function executarAEstrela() {

    // Desabilitando os outros botões e mostrando barra de progresso
    habilitarBarraDeProgresso();

    // Configurando o temporizador
    try {
        timer.stop()
    } catch {}
    timer = new Timer();
    timer.start();

    // Alterando o modo do jogo
    modo = 'Algoritmo';

    // Executando o A Estrela
    aEstrela();

    // Parando o temporizador
    timer.stop();

    // Alterando o modo do jogo
    modo = '';

    // Habilitando os outros botões e mostrando barra de progresso
    desabilitarBarraDeProgresso();

}

/**
 * Função executada quando o botão Busca Gulosa é clicado.
 */
function executarBuscaGulosa() {

    // Desabilitando os outros botões e mostrando barra de progresso
    habilitarBarraDeProgresso();

    // Configurando o temporizador
    try {
        timer.stop()
    } catch {}
    timer = new Timer();
    timer.start();

    // Alterando o modo do jogo
    modo = 'Algoritmo';

    // Executando o Busca Gulosa
    buscaGulosa();

    // Parando o temporizador
    timer.stop();

    // Alterando o modo do jogo
    modo = '';

    // Habilitando os outros botões e mostrando barra de progresso
    desabilitarBarraDeProgresso();
}

/**
 * Função executada quando o botão Busca Uniforme é clicado.
 */
function executarBuscaUniforme() {

    // Desabilitando os outros botões e mostrando barra de progresso
    habilitarBarraDeProgresso();

    // Configurando o temporizador
    try {
        timer.stop()
    } catch {}
    timer = new Timer();
    timer.start();

    // Alterando o modo do jogo
    modo = 'Algoritmo';

    // Executando o Busca Uniforme
    buscaUniforme();

    // Parando o temporizador
    timer.stop();

    // Alterando o modo do jogo
    modo = '';

    // Habilitando os outros botões e mostrando barra de progresso
    desabilitarBarraDeProgresso();
}

/**
 * Função executada quando o botão Jogar é clicado.
 */
function iniciarJogo() {
    timer.start();
    modo = 'Jogo';
}

/**
 * Cria um jogo 8-Puzzle.
 * @param arrayJogo {Array} Array com o estado inicial dos blocos do jogo.
 * @param arrayObjetivo {Array} Array com o estado dos blocos do objetivo.
 */
function criarJogo(arrayJogo, arrayObjetivo) {

    // Configurando o jogo
    numeroColunas = 3;
    numeroLinhas = 3;

    // Criando os blocos
    blocosJogo = new Grade(document.getElementById("areaJogo"), tratarCliqueNoBloco, arrayJogo);
    blocosObjetivo = new Grade(document.getElementById("areaObjetivo"), null, arrayObjetivo);
    blocosJogo.construirGrade();
    blocosObjetivo.construirGrade();

    try {
        timer.stop();
    } catch {
    }
    timer = new Timer();
    modo = 'Nao Iniciado';
}

/**
 * Função principal.
 */
onload = function () {

    // Associando os botões com as funções
    document.getElementById("btInicio").onclick = iniciarJogo;
    document.getElementById("btAEstrela").onclick = executarAEstrela;
    document.getElementById("btBuscaGulosa").onclick = executarBuscaGulosa;
    document.getElementById("btBuscaUniforme").onclick = executarBuscaUniforme;
    document.getElementById("btNovoJogo").onclick = novoJogo;
    document.getElementById("btEditar").onclick = editar;

    // Criando o jogo
    const arrayJogo = [[8,3,5],[4,1,6],[2,7,0]];
    const arrayObjetivo = [[1,2,3],[8,0,4],[7,6,5]];
    criarJogo(arrayJogo, arrayObjetivo);
}