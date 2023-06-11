/**
 * Função executada quando o botão comparar desempenho dos algoritmos é clicado.
 */
function compararDesempenho() {

    // Desabilitando os botões iniciar, novo jogo, editar e
    document.getElementById('btInicio').style.display='none';
    document.getElementById('btNovoJogo').style.display='none';
    document.getElementById('btEditar').style.display='none';
    document.getElementById('btCompararDesempenho').style.display='none';

    // Habilitando o botão cancelar
    document.getElementById('btCancelar').style.display='';

    // Obtendo a Tag HTML que mostrará a mensagem
    const tagHtmlMensagem = document.getElementById("areaMensagem");

    // Adicionando título a tag HTML
    tagHtmlMensagem.innerHTML = "<h2>Tempo de execução dos Algoritmos de Busca</h2>";

    // Alterando a funcionalidade dos botões A*, Busca Gulosa, Busca Uniforme e cancelar
    document.getElementById("btAEstrela").onclick = obterDesempenhoAEstrela;
    document.getElementById("btBuscaGulosa").onclick = obterDesempenhoBuscaGulosa;
    document.getElementById("btBuscaUniforme").onclick = obterDesempenhoBuscaUniforme;
    document.getElementById('btCancelar').onclick = compararDesempenhoSair;
}

/**
 * Função executada quando o botão cancelar for clicado.
 */
function compararDesempenhoSair() {

    // Habilitando os botões iniciar, novo jogo, editar e
    document.getElementById('btInicio').style.display='';
    document.getElementById('btNovoJogo').style.display='';
    document.getElementById('btEditar').style.display='';
    document.getElementById('btCompararDesempenho').style.display='';

    // Desabilitando o botão cancelar
    document.getElementById('btCancelar').style.display='none';

    // Obtendo a Tag HTML que mostrará a mensagem
    const tagHtmlMensagem = document.getElementById("areaMensagem");

    // Limpando a Tag HTML
    tagHtmlMensagem.innerHTML = "";

    // Alterando a funcionalidade dos botões A*, Busca Gulosa, Busca Uniforme e cancelar ao padrão
    document.getElementById("btAEstrela").onclick = executarAEstrela;
    document.getElementById("btBuscaGulosa").onclick = executarBuscaGulosa;
    document.getElementById("btBuscaUniforme").onclick = executarBuscaUniforme;
    document.getElementById('btCancelar').onclick = null;
}

/**
 * Função executada quando o botão A Estrela for clicado.
 */
function obterDesempenhoAEstrela() {

    // Obtendo a Tag HTML que mostrará a mensagem
    const tagHtmlMensagem = document.getElementById("areaMensagem");

    // Armazenando o estado inicial
    const estadoInicial = clonarArrayMultidimensional(blocosJogo.array);

    // Alterando o modo do jogo
    modo = 'Algoritmo';

    // Executando o A Estrela
    const tempoInicioAEstrela = performance.now();
    aEstrela();
    const tempoFimAEstrela = performance.now();
    const tempoExecucaoAEstrela = tempoFimAEstrela - tempoInicioAEstrela;

    // Mostrando o resultado do A Estrela
    tagHtmlMensagem.innerHTML += `<p>A Estrela: ${tempoExecucaoAEstrela} milisegundos</p>`;

    // Voltando blocos ao estado inicial
    blocosJogo.array = estadoInicial;
    blocosJogo.construirGrade();

    // Alterando o modo do jogo
    modo = '';
}

/**
 * Função executada quando o botão Busca Gulosa for clicado.
 */
function obterDesempenhoBuscaGulosa() {

    // Obtendo a Tag HTML que mostrará a mensagem
    const tagHtmlMensagem = document.getElementById("areaMensagem");

    // Armazenando o estado inicial
    const estadoInicial = clonarArrayMultidimensional(blocosJogo.array);

    // Alterando o modo do jogo
    modo = 'Algoritmo';

    // Executando a Busca Gulosa
    const tempoInicioBuscaGulosa = performance.now();
    buscaGulosa();
    const tempoFimBuscaGulosa = performance.now();
    const tempoExecucaoBuscaGulosa = tempoFimBuscaGulosa - tempoInicioBuscaGulosa;

    // Mostrando o resultado do Busca Gulosa
    tagHtmlMensagem.innerHTML += `<p>Busca Gulosa: ${tempoExecucaoBuscaGulosa} milisegundos</p>`;

    // Voltando blocos ao estado inicial
    blocosJogo.array = estadoInicial;
    blocosJogo.construirGrade();

    // Alterando o modo do jogo
    modo = '';
}

/**
 * Função executada quando o botão Busca Uniforme for clicado.
 */
function obterDesempenhoBuscaUniforme() {

    // Obtendo a Tag HTML que mostrará a mensagem
    const tagHtmlMensagem = document.getElementById("areaMensagem");

    // Armazenando o estado inicial
    const estadoInicial = clonarArrayMultidimensional(blocosJogo.array);

    // Alterando o modo do jogo
    modo = 'Algoritmo';

    // Executando a Busca Uniforme
    const tempoInicioBuscaUniforme = performance.now();
    buscaUniforme();
    const tempoFimBuscaUniforme = performance.now();
    const tempoExecucaoBuscaUniforme = tempoFimBuscaUniforme - tempoInicioBuscaUniforme;

    // Mostrando o resultado do Busca Uniforme
    tagHtmlMensagem.innerHTML += `<p>Busca Uniforme: ${tempoExecucaoBuscaUniforme} milisegundos</p>`;

    // Voltando blocos ao estado inicial
    blocosJogo.array = estadoInicial;
    blocosJogo.construirGrade();

    // Alterando o modo do jogo
    modo = '';
}