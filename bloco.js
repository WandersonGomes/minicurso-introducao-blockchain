const crypto = require('crypto');
const debug = require('debug')('moneyCoin:blockchain');

class Bloco {
    constructor(criado_em, transacoes, hash_bloco_anterior = '') {
        this.hash_bloco_anterior = hash_bloco_anterior;
        this.criado_em = criado_em;
        this.transacoes = transacoes;
        this.nonce = 0;
        this.hash = this.calcularHash();
    }

    calcularHash() {
        return crypto
            .createHash('sha256')
            .update(
                this.hash_bloco_anterior +
                this.criado_em +
                JSON.stringify(this.transacoes) +
                this.nonce
            )
            .digest('hex');
    }

    minerarBloco(dificuldade) {
        while (this.hash.substring(0, dificuldade) !== Array(dificuldade + 1).join('0')) {
            this.nonce++;
            this.hash = this.calcularHash();
        }

        debug(`Bloco minerado: ${this.hash}`);
    }

    verificarValidadeTransacoes() {
        for (const transacao of this.transacoes) {
            if (!transacao.validarTransacao()) 
                return false;
        }

        return true;
    }
}

module.exports = Bloco;