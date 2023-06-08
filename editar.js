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
    document.getElementById("btNovoJogo").style.display = '';
    document.getElementById("btEditar").style.display = '';

    // Reconstruindo grades
    blocosObjetivo.construirGrade();
    blocosJogo.construirGrade();
}

/**
 * Função que é executada quando o botão confirmar, dentro da edição, é clicado.
 */
function editarConfirmar() {

    // Aplicando a edição
    blocosObjetivo.aplicarEdicao();
    blocosJogo.aplicarEdicao();

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
    document.getElementById("btNovoJogo").style.display = 'none';
    document.getElementById("btEditar").style.display = 'none';

    // Habilitando os botões confirmar e cancelar
    document.getElementById("btConfirmar").style.display = '';
    document.getElementById("btConfirmar").onclick = editarConfirmar;
    document.getElementById("btCancelar").style.display = '';
    document.getElementById("btCancelar").onclick = editarCancelar;

    // Habilitando modo de edição
    blocosObjetivo.habilitarModoEdicao();
    blocosJogo.habilitarModoEdicao();

}