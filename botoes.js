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

/**
 * Habilita os botões confirmar e cancelar e desabilita os botões padrões.
 * @param funcaoBotaoConfirmar {Function} Função que é executada quando o botão confirmar for pressionado.
 * @param funcaoBotaoCancelar {Function} Função que é executada quando o botão cancelar for pressionado.
 */
function habilitarBotoesConfirmarCancelar(funcaoBotaoConfirmar, funcaoBotaoCancelar){

    // Desabilitando os botões padrões
    document.getElementById("btInicio").style.display = 'none';
    document.getElementById("btAEstrela").style.display = 'none';
    document.getElementById("btBuscaGulosa").style.display = 'none';
    document.getElementById("btBuscaUniforme").style.display = 'none';
    document.getElementById("btNovoJogo").style.display = 'none';
    document.getElementById("btEditar").style.display = 'none';
    document.getElementById("btCompararDesempenho").style.display = 'none';

    // Habilitando os botões confirmar e cancelar
    document.getElementById("btConfirmar").style.display = '';
    document.getElementById("btConfirmar").onclick = funcaoBotaoConfirmar;
    document.getElementById("btCancelar").style.display = '';
    document.getElementById("btCancelar").onclick = funcaoBotaoCancelar;
}

/**
 * Desabilita os botões confirmar e cancelar e habilita os botões padrões.
 */
function desabilitarBotoesConfirmarCancelar(){

    // Desabilitando os botões confirmar e cancelar
    document.getElementById("btConfirmar").style.display = 'none';
    document.getElementById("btConfirmar").onclick = null;
    document.getElementById("btCancelar").style.display = 'none';
    document.getElementById("btCancelar").onclick = null;

    // Habilitando os botões padrões
    document.getElementById("btInicio").style.display = '';
    document.getElementById("btAEstrela").style.display = '';
    document.getElementById("btBuscaGulosa").style.display = '';
    document.getElementById("btBuscaUniforme").style.display = '';
    document.getElementById("btNovoJogo").style.display = '';
    document.getElementById("btEditar").style.display = '';
    document.getElementById("btCompararDesempenho").style.display = '';
}