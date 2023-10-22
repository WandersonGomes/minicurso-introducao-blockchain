const Transacao = require('./transacao');
const Bloco = require('./bloco');
const debug = require('debug')('moneyCoin:blockchain');

class BlockChain {
    constructor() {
        this.cadeia_blocos = [this.criarBlocoGenesis()];
        this.dificuldade = 2;
        this.transacoes_pendentes = [];
        this.recompensa_mineracao = 100;
    }

    criarBlocoGenesis() {
        return new Bloco(Date.parse('2015-08-30'), [], '0');
    }

    getUltimoBloco() {
        return this.cadeia_blocos[this.cadeia_blocos.length - 1];
    }

    minerarTransacoesPendentes(endereco_minerador) {
        const transacao_recompensa = new Transacao(null, endereco_minerador, this.recompensa_mineracao);
        this.transacoes_pendentes.push(transacao_recompensa);

        const bloco = new Bloco(Date.now(), this.transacoes_pendentes, this.getUltimoBloco().hash);
        bloco.minerarBloco(this.dificuldade);

        debug('Bloco minerado com sucesso!');
        this.cadeia_blocos.push(bloco);

        this.transacoes_pendentes = [];
    }

    adicionarTransacao(transacao) {
        if (!transacao.endereco_origem || !transacao.endereco_destino) {
            throw new Error('Transacao precisa de incluir endereco de origem e endereco de destino.');
        }

        if (!transacao.validarTransacao()) {
            throw new Error('Não pode adicionar transacao invalida a cadeia.');
        }

        if (transacao.valor <= 0) {
            throw new Error('Valor da transacao deve ser maior que 0');
        }

        const saldo_carteira_origem = this.getSaldoEndereco(transacao.endereco_origem);
        if (saldo_carteira_origem < transacao.valor) {
            throw new Error('Sem saldo');
        }
        
        const transacoes_pendentes_carteira = this.transacoes_pendentes.filter(
            transacao => transacao.endereco_origem === transacao.endereco_origem
        );

        if (transacoes_pendentes_carteira.length > 0) {
            const saldoTotalPendente = transacoes_pendentes_carteira
                .map(transacao => transacao.valor)
                .reduce((prev, curr) => prev + curr);
            
            const saldoTotal = saldoTotalPendente + transacao.valor;
            if (saldoTotal > saldo_carteira_origem) {
                throw new Error('Saldo total das transacoes pendentes e maior que o saldo da carteira.');
            }

            this.transacoes_pendentes.push(transacao);
            debug('Transacao adicionada: %s', transacao);
        }
    }

    getSaldoEndereco(endereco) {
        let saldo = 0;

        for (const bloco of this.cadeia_blocos) {
            for (const transacao of bloco.transacoes) {
                if (transacao.endereco_origem === endereco) {
                    saldo -= transacao.valor;
                }

                if (transacao.endereco_destino === endereco) {
                    saldo += transacao.valor;
                }
            }
        }

        debug('Saldo do endereco: %s', saldo);
        return saldo;
    }

    getTodasTransacoesCarteira(endereco) {
        const transacoes = [];

        for (const bloco of this.cadeia_blocos) {
            for (const transacao of bloco.transacoes) {
                if (transacao.endereco_origem === endereco || transacao.endereco_destino === endereco)
                    transacoes.push(transacao);
            }
        }

        debug('O numero de transacoes da carteira e: %s', transacoes.length);
        return transacoes;
    }


    validarCadeiaBlocos() {
        const blocoGenesisOriginal = JSON.stringify(this.criarBlocoGenesis());

        if (blocoGenesisOriginal !== JSON.stringify(this.cadeia_blocos[0])) {
            return false;
        }

        for (let i = 1; i < this.cadeia_blocos.length; i++) {
            const bloco_atual = this.cadeia_blocos[i];
            const bloco_anterior = this.cadeia_blocos[i - 1];

            if (bloco_anterior.hash !== bloco_atual.hash_bloco_anterior)
                return false;
            
            if (!bloco_atual.verificarValidadeTransacoes())
                return false;
            
            if (bloco_atual.hash !== bloco_atual.calcularHash())
                return false;
        }

        return true;
    }
}

module.exports = BlockChain;