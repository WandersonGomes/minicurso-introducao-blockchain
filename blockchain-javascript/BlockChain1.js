/*
Código adaptado de Simply Explained
*/
const Bloco = require('./Bloco1');

class BlockChain {
    constructor() {
        this.cadeia_blocos = [this.criarBlocoGenesis()];
    }

    criarBlocoGenesis() {
        return new Bloco(0, new Date().getTime(), "Genesis block", "0");
    }

    getUltimoBloco() {
        return this.cadeia_blocos[this.cadeia_blocos.length - 1];
    }

    adicionarBloco(novoBloco) {
        novoBloco.hash_bloco_anterior = this.getUltimoBloco().hash;
        novoBloco.hash = novoBloco.calcularHash();
        this.cadeia_blocos.push(novoBloco);
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