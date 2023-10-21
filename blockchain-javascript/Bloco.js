/*
Código adaptado de Simply Explained
*/
const SHA256 = require('crypto-js/sha256');

class Bloco {
    constructor(indice, instante, dados, hash_bloco_anterior = '') {
        this.indice = indice;
        this.instante = instante;
        this.dados = dados;
        this.hash_bloco_anterior = hash_bloco_anterior;
        this.hash = this.calcularHash();
    }

    calcularHash() {
        const dados_gerar_hash = 
            this.index +
            this.hash_bloco_anterior +
            this.instante +
            JSON.stringify(this.dados).toString();
        
        return SHA256(dados_gerar_hash).toString();
    }
}

module.exports = Bloco;