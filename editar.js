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

    // Reconstruindo objetivo do jogo
    blocosObjetivo.construirGrade();
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
    for(let i = 0, k = 0; i < numeroLinhas && k < entradas.length; i++) {
        let linha = [];
        for (let j = 0; j < numeroColunas && k < entradas.length; j++, k++) {
            linha.push(entradas[k]);
        }
        novoObjetivo.push(linha);
    }

    // Alterando o valor do objetivo
    blocosObjetivo.array = novoObjetivo;

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

    // Alterando os elementos de objetivo para caixa de texto
    const objetivoJogo = document.getElementById("areaObjetivo");
    for (let i = 0; objetivoJogo.childNodes.length; i++) {
        objetivoJogo.childNodes[i].innerHTML = "<div class=\"form-control\"><input class=\"textoObjetivo\" type=\"number\"></div>";
    }


}