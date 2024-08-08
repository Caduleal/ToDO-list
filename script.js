const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');
let minhaListaDeElementos = [];

function adicionarNovaTarefa() {
    minhaListaDeElementos.push({
        tarefa: input.value,
        concluida: false,
    });
    input.value = '';
    mostrarTarefas();
}

function mostrarTarefas() {
    let novaLi = '';
    minhaListaDeElementos.forEach((item, posicao) => {
        novaLi = novaLi +      
        `
        <li class="task ${item.concluida && 'done'}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        `;
    });
    listaCompleta.innerHTML = novaLi;
    localStorage.setItem('lista', JSON.stringify(minhaListaDeElementos));
}

function concluirTarefa(posicao) {
    minhaListaDeElementos[posicao].concluida = !minhaListaDeElementos[posicao].concluida;
    mostrarTarefas();
}

function deletarItem(posicao) {
    minhaListaDeElementos.splice(posicao, 1);
    mostrarTarefas();
}

function recarregarTarefas() {
    const tarefasDoLocalStore = localStorage.getItem('lista');
    if (tarefasDoLocalStore) {
        minhaListaDeElementos = JSON.parse(tarefasDoLocalStore);
    }
    mostrarTarefas();
}

recarregarTarefas();

const button = document.querySelector('.button-add-task');
button.addEventListener('click', adicionarNovaTarefa);
