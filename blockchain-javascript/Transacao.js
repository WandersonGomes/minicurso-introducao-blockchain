class Transacao {
    constructor(endereco_origem, endereco_destino, valor) {
        this.endereco_origem = endereco_origem;
        this.endereco_destino = endereco_destino;
        this.valor = valor;
    }
}

module.exports = Transacao;