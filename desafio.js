function Item(nomeItem, quantidade, preco) {
    this.nomeItem = nomeItem;
    this.quantidade = quantidade;
    this.preco = preco;
}

var itens = [];
preencherCookieCarrinho();
atualizaTabela();

function adicionarItem() {
    var nomeItemNovo = $("#nomeItemId").val();
    var quantidadeNovo = $("#quantidadeId").val();
    var precoNovo = $("#precoId").val();

    var novoItem = new Item(nomeItemNovo, quantidadeNovo, precoNovo);
    itens.push(novoItem);
    criarCookie("carrinho", JSON.stringify(itens), 2);
    atualizaTabela();
    limpar();
    console.log(itens);
}

function limpar(){
    $("#nomeItemId").val("");
    $("#quantidadeId").val("");
    $("#precoId").val("");
}

function atualizaTabela() {
    var tabela = $("#tabelaItensId");
    tabela.find("tr:gt(0)").remove();
    
    itens.forEach(item => {
        var linha = "<tr><td>" + item.nomeItem + "</td><td>" + item.quantidade + "</td><td>" + item.preco + "</td></tr>";
        tabela.append(linha);
    });
}

function fecharCompra() {
    var htmlFinal = "Você comprou: ";
    var soma = 0;

    for(var i = 0; i < itens.length; i++) {
        htmlFinal += itens[i].quantidade + " " + itens[i].nomeItem +  " - ";
        soma += itens[i].quantidade  * itens[i].preco; 
    }

    htmlFinal += " Total: R$ " + soma;
    $("#fechamentoLabelId").text(htmlFinal);
}

function criarCookie(campo, valor, dias) {
    var dataExpiracao = new Date();
    dataExpiracao.setTime(dataExpiracao.getTime() + (dias * 24 * 60 * 60 * 1000));
    var campoExpires = "expires=" + dataExpiracao.toUTCString();
    document.cookie = campo + "=" + valor + "; " + campoExpires;
}

function preencherCookieCarrinho() {
    var camposValor = document.cookie.split("; ");
    var meuCookie = {};
    
    for (var i = 0; i < camposValor.length; i++) {
        var campoValorVetor = camposValor[i].split("=");
        meuCookie[campoValorVetor[0]] = campoValorVetor[1];
    }
    
    if (meuCookie.carrinho) {
        itens = JSON.parse(meuCookie.carrinho);
    }
    console.log(meuCookie);
}
