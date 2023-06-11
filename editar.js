/**
 * Função executada quando o botão editar é clicado.
 */
function editar() {

    /**
     * Habilita os botões confirmar e cancelar e desabilita os botões padrões.
     * @param funcaoBotaoConfirmar {Function} Função que é executada quando o botão confirmar for pressionado.
     * @param funcaoBotaoCancelar {Function} Função que é executada quando o botão cancelar for pressionado.
     */
    function habilitarBotoesConfirmarCancelar(funcaoBotaoConfirmar, funcaoBotaoCancelar) {

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