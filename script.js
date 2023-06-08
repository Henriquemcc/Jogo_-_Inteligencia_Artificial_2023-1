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

/**
 * Modo de execução.
 */
let modo;

/**
 * Número de colunas que a grade do jogo terá.
 */
let numeroColunas;

/**
 * Número de linhas que a grade do jogo terá.
 */
let numeroLinhas;

/**
 * Objeto que marcará o tempo no jogo
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
 * Função que é executada quando um bloco for clicado.
 * @param {*} e 
 */
function tratarCliqueNoBloco(e) {

    if (modo == 'Jogo') {
        let blocoSelecionado = blocosJogo.obterBloco(e.target.getAttribute('i'), e.target.getAttribute('j'));
        let blocoVazio = blocosJogo.obterBlocoVazio();
        if (calcularDistanciaDoisBlocos(blocoSelecionado, blocoVazio) == 1) {

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
    }
    else if (modo == 'Nao Iniciado') {
        window.alert("O jogo não foi iniciado. Para iniciar o jogo clique no botão iniciar (representado pelo símbolo play)")
    }
}

/**
 * Função que é executada quando o jogador vencer o jogo.
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

    // Colocando os numeros aleatórios nas posições da grade
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
 * Cria um novo jogo.
 */
function novoJogo() {

    // Criando o array do jogo e do objetivo
    let arrayJogo = obterEstadoAleatorioParaOsBlocos();
    let arrayObjetivo = arrayJogo;
    while (arraysSaoIguais(arrayJogo, arrayObjetivo)) {
        arrayObjetivo = obterEstadoAleatorioParaOsBlocos();
    }

    // Criando as grades
    blocosJogo = new Grade(document.getElementById("areaJogo"), tratarCliqueNoBloco, arrayJogo);
    blocosObjetivo = new Grade(document.getElementById("areaObjetivo"), null, arrayObjetivo);
    blocosJogo.construirGrade();
    blocosObjetivo.construirGrade();

    try {
        timer.stop();
    }
    catch {}
    timer = new Timer();
    modo = 'Nao Iniciado';
}

/**
 * Função que é executado quando o botão A* é clicado.
 */
function executarAEstrela() {}

/**
 * Função que é executada quando o botão Jogar é clicado.
 */
function iniciarJogo() {
    timer.start();
    modo = 'Jogo';
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
    numeroColunas = 3;
    numeroLinhas = 3;

    // Criando um novo jogo
    novoJogo();
}