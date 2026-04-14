var form = document.getElementById("formGasto");
var lista = document.getElementById("lista");
var totalSpan = document.getElementById("total");

var gastos = [];
var editIndex = -1;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    var descricao = document.getElementById("descricao").value;
    var valor = document.getElementById("valor").value;
    var categoria = document.getElementById("categoria").value;

    if (descricao == "" || valor == "") {
        return;
    }

    var valorNumero = parseFloat(valor.replace(",", "."));

    if (editIndex >= 0) {
        gastos[editIndex] = {
            descricao: descricao,
            valor: valorNumero,
            categoria: categoria
        };
        editIndex = -1;
    } else {
        gastos.push({
            descricao: descricao,
            valor: valorNumero,
            categoria: categoria
        });
    }

    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("categoria").value = "";

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

        var valor = Number(gastos[i].valor);
        if (isNaN(valor)) valor = 0;

        tdValor.innerText = "R$ " + valor.toFixed(2);

        var tdAcao = document.createElement("td");

        var botaoEditar = document.createElement("button");
        botaoEditar.innerText = "Editar";

        botaoEditar.onclick = function(index) {
            return function () {
                document.getElementById("descricao").value = gastos[index].descricao;
                document.getElementById("valor").value = gastos[index].valor;
                document.getElementById("categoria").value = gastos[index].categoria;

                editIndex = index;
            }
        }(i);

        var botaoRemover = document.createElement("button");
        botaoRemover.innerText = "X";

        botaoRemover.onclick = function(index) {
            return function () {
                gastos.splice(index, 1);
                atualizarLista();
            }
        }(i);

        if (gastos[i].valor > 100) {
            tr.className = "alto";
        }

        tdAcao.appendChild(botaoEditar);
        tdAcao.appendChild(botaoRemover);

        tr.appendChild(tdDesc);
        tr.appendChild(tdCat);
        tr.appendChild(tdValor);
        tr.appendChild(tdAcao);

        lista.appendChild(tr);

        total += valor;
    }

    totalSpan.innerText = total.toFixed(2);
}