/**
 * Habilita a barra de progresso e desabilita os botões padrões;
 */
function habilitarBarraDeProgresso () {
    document.getElementById("btInicio").style.display = 'none';
    document.getElementById("btAEstrela").style.display = 'none';
    document.getElementById("btBuscaGulosa").style.display = 'none';
    document.getElementById("btBuscaUniforme").style.display = 'none';
    document.getElementById("btNovoJogo").style.display = 'none';
    document.getElementById("btEditar").style.display = 'none';
    document.getElementById("barraProgresso").style.display = '';
}

/**
 * Desabilita a barra de progresso e habilita os botões padrões.
 */
function desabilitarBarraDeProgresso() {
    document.getElementById("btInicio").style.display = '';
    document.getElementById("btAEstrela").style.display = '';
    document.getElementById("btBuscaGulosa").style.display = '';
    document.getElementById("btBuscaUniforme").style.display = '';
    document.getElementById("btNovoJogo").style.display = '';
    document.getElementById("btEditar").style.display = '';
    document.getElementById("barraProgresso").style.display = 'none';
}