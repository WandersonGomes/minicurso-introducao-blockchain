const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const debug = require('debug')('moneyCoin:blockchain');

class Transacao {
    constructor(endereco_origem, endereco_destino, valor) {
        this.endereco_origem = endereco_origem;
        this.endereco_destino = endereco_destino;
        this.valor = valor;
        this.criado_em = Date.now();
    }

    calcularHash() {
        return crypto
            .createHash('sha256')
            .update(this.endereco_origem + this.endereco_destino + this.valor + this.criado_em)
            .digest('hex');
    }

    assinarTransacao(chave_assinatura) {
        if (chave_assinatura.getPublic('hex') !== this.endereco_origem) {
            throw new Error('Você não pode assinar transações de outras carteiras!');
        }

        const hashTransacao = this.calcularHash();
        const assinatura = chave_assinatura.sign(hashTransacao, 'base64');

        this.assinatura = assinatura.toDER('hex');
    }

    validarTransacao() {
        if (this.endereco_origem === null) return true;

        if (!this.assinatura || this.assinatura.length === 0) {
            throw new Error('Sem assinatura nesta transação.');
        }

        const chave_publica = ec.keyFromPublic(this.endereco_origem, 'hex');
        return chave_publica.verify(this.calcularHash(), this.assinatura);
    }
}

module.exports = Transacao;