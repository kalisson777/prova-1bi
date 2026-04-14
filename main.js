var form = document.getElementById("formGasto");
var lista = document.getElementById("lista");
var totalSpan = document.getElementById("total");

var gastos = [];

form.addEventListener("submit", function(e) {
    e.preventDefault();

    var descricao = document.getElementById("descricao").value;
    var valor = document.getElementById("valor").value;
    var categoria = document.getElementById("categoria").value;

    if (descricao == "" || valor == "") {
        return;
    }

    gastos.push({
    descricao: descricao,
    valor: parseFloat(valor),
    categoria: categoria
});

    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";

    atualizarLista();
});

function atualizarLista() {
    lista.innerHTML = "";

    var total = 0;

    for (var i = 0; i < gastos.length; i++) {
        var tr = document.createElement("tr");

        var tdDesc = document.createElement("td");
        tdDesc.innerText = gastos[i].descricao;

        var tdCat = document.createElement("td");
        tdCat.innerText = gastos[i].categoria;

        var tdValor = document.createElement("td");
        tdValor.innerText = "R$ " + gastos[i].valor.toFixed(2);

        var tdAcao = document.createElement("td");
        var botao = document.createElement("button");
        botao.innerText = "X";

        botao.onclick = function(index) {
            return function() {
                remover(index);
            }
        }(i);

        if (gastos[i].valor > 100) {
            tr.className = "alto";
        }

        tdAcao.appendChild(botao);

        tr.appendChild(tdDesc);
        tr.appendChild(tdCat);
        tr.appendChild(tdValor);
        tr.appendChild(tdAcao);

        lista.appendChild(tr);

        total += Number(gastos[i].valor) || 0;
    }

    totalSpan.innerText = total.toFixed(2);
}

function remover(index) {
    gastos.splice(index, 1);
    atualizarLista();
}