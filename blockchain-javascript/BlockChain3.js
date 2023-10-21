/*
Código adaptado de Simply Explained
*/
const Transacao = require('./Transacao');
const Bloco = require('./Bloco3');

class BlockChain {
    constructor() {
        this.cadeia_blocos = [this.criarBlocoGenesis()];
        this.dificuldade = 4;
        this.transacoes_pendentes = [];
        this.recompensa_mineracao = 100;
    }

    criarBlocoGenesis() {
        return new Bloco(new Date().getTime(), "Genesis block", "0");
    }

    getUltimoBloco() {
        return this.cadeia_blocos[this.cadeia_blocos.length - 1];
    }

    minerarTransacoesPendentes(endereco_para_recompensa) {
        let bloco = new Bloco(new Date().getTime(), this.transacoes_pendentes);
        bloco.minerarBloco(this.dificuldade);

        console.log('Bloco foi minerado com sucesso!');
        this.cadeia_blocos.push(bloco);

        this.transacoes_pendentes = [
            new Transacao(null, endereco_para_recompensa, this.recompensa_mineracao)
        ]
    }

    getBalancoEndereco(endereco) {
        let balanco = 0;

        for (const bloco of this.cadeia_blocos) {
            for (const transacao of bloco.transacoes) {
                if (transacao.endereco_origem === endereco) {
                    balanco -= transacao.valor;
                }
                if (transacao.endereco_destino === endereco) {
                    balanco += transacao.valor;
                }
            }
        }

        return balanco;
    }

    criarTransacao(transacao) {
        this.transacoes_pendentes.push(transacao);
    }

    validarCadeiaBlocos() {
        for (let i = 1; i < this.cadeia_blocos.length; i++) {
            const bloco_atual = this.cadeia_blocos[i];
            const bloco_anterior = this.cadeia_blocos[i - 1];

            if (bloco_atual.hash !== bloco_atual.calcularHash())
                return false;

            if (bloco_atual.hash_bloco_anterior !== bloco_anterior.calcularHash())
                return false;
        }

        return true;
    }
}

module.exports = BlockChain;