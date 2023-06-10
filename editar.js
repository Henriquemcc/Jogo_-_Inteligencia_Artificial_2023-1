/**
 * Sai do menu editar.
 */
function editarSair() {

    desabilitarBotoesConfirmarCancelar();

    // Reconstruindo grades
    blocosObjetivo.construirGrade();
    blocosJogo.construirGrade();

    // Voltando para o modo não iniciado
    modo = 'Nao Iniciado';
}

/**
 * Função executada quando o botão confirmar, dentro da edição, é clicado.
 */
function editarConfirmar() {

    let elementosInvalidosObjetivo = blocosObjetivo.entradasInvalidasEdicao();
    let elementosInvalidosJogo = blocosJogo.entradasInvalidasEdicao();

    if (elementosInvalidosJogo.length > 0) {
        window.alert(`Entrada(s) Inválida(s) no Jogo: ${elementosInvalidosJogo}`);
    } else if (elementosInvalidosObjetivo.length > 0) {
        window.alert(`Entrada(s) Inválida(s) no Objetivo: ${elementosInvalidosObjetivo}`);
    } else {

        // Aplicando a edição
        blocosObjetivo.aplicarEdicao();
        blocosJogo.aplicarEdicao();

        // Saindo do jogo
        editarSair();
    }
}

/**
 * Função executada quando o botão cancelar, dentro da ediçãoo, é clicado.
 */
function editarCancelar() {
    editarSair();
}

/**
 * Função executada quando o botão editar é clicado.
 */
function editar() {

    // Alterando o modo do jogo
    modo = 'Edicao';

    // Parando o temporizador
    timer.stop();

    // Habilitando os botões confirmar e cancelar
    habilitarBotoesConfirmarCancelar(editarConfirmar, editarCancelar);

    // Habilitando modo de edição
    blocosObjetivo.habilitarModoEdicao();
    blocosJogo.habilitarModoEdicao();

}