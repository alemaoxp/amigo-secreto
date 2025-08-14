let amigos = [];
let ultimoSorteado = null; // evita repetição

// Detecta Enter no campo e chama adicionarAmigo()
document.getElementById('amigo').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    amigos.push(nome);
    input.value = "";
    atualizarLista();
}

function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;

        // Botão remover ❌
        const btnRemover = document.createElement('button');
        btnRemover.textContent = "❌";
        btnRemover.classList.add("remove-button");
        btnRemover.onclick = () => {
            amigos.splice(index, 1);
            atualizarLista();
        };

        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("Adicione pelo menos um nome para sortear.");
        return;
    }

    let indiceSorteado;
    do {
        indiceSorteado = Math.floor(Math.random() * amigos.length);
    } while (amigos.length > 1 && amigos[indiceSorteado] === ultimoSorteado);

    ultimoSorteado = amigos[indiceSorteado];

    // Animação rápida antes de mostrar o sorteado
    const resultadoEl = document.getElementById('resultado');
    resultadoEl.innerHTML = ""; // limpa antes
    let contador = 0;
    const animacao = setInterval(() => {
        const nomeTemp = amigos[Math.floor(Math.random() * amigos.length)];
        resultadoEl.innerHTML = `<li>🤔 Sorteando: ${nomeTemp}</li>`;
        contador++;
        if (contador > 15) {
            clearInterval(animacao);
            resultadoEl.innerHTML = `<li>🎉 Amigo secreto: ${ultimoSorteado}</li>`;
        }
    }, 100);
}
