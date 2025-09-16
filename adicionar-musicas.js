// Arquivo para adicionar músicas ao sistema
// Este arquivo contém funções para gerenciar a adição de novos hinos

class AdicionarMusicas {
    constructor() {
        this.db = null;
        this.initializeFirebase();
    }

    async initializeFirebase() {
        // Aguardar Firebase ser inicializado
        if (window.firebase && window.firebase.firestore) {
            this.db = firebase.firestore();
        } else {
            setTimeout(() => this.initializeFirebase(), 100);
        }
    }

    // Função para adicionar um novo hino
    async adicionarHino(dadosHino) {
        try {
            const novoHino = {
                number: dadosHino.number,
                title: dadosHino.title,
                filename: dadosHino.filename,
                audioURL: dadosHino.audioURL,
                coverURL: dadosHino.coverURL || this.gerarCapaPadrao(dadosHino.number),
                duration: dadosHino.duration || 0,
                category: dadosHino.category || 'Geral',
                lyrics: dadosHino.lyrics || '',
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Adicionar ao Firebase
            if (this.db) {
                const docRef = await this.db.collection('hymns').add(novoHino);
                novoHino.id = docRef.id;
                console.log('Hino adicionado com sucesso:', novoHino);
                return novoHino;
            } else {
                throw new Error('Firebase não inicializado');
            }
        } catch (error) {
            console.error('Erro ao adicionar hino:', error);
            throw error;
        }
    }

    // Função para adicionar múltiplos hinos de uma vez
    async adicionarMultiplosHinos(listaHinos) {
        const resultados = [];
        for (const hino of listaHinos) {
            try {
                const hinoAdicionado = await this.adicionarHino(hino);
                resultados.push({ sucesso: true, hino: hinoAdicionado });
            } catch (error) {
                resultados.push({ sucesso: false, erro: error.message, hino });
            }
        }
        return resultados;
    }

    // Gerar capa padrão para o hino
    gerarCapaPadrao(numeroHino) {
        return `https://via.placeholder.com/300x300/1db954/ffffff?text=Hino+${numeroHino}`;
    }

    // Validar dados do hino antes de adicionar
    validarDadosHino(dados) {
        const erros = [];

        if (!dados.number || dados.number <= 0) {
            erros.push('Número do hino é obrigatório e deve ser maior que 0');
        }

        if (!dados.title || dados.title.trim() === '') {
            erros.push('Título do hino é obrigatório');
        }

        if (!dados.filename || dados.filename.trim() === '') {
            erros.push('Nome do arquivo é obrigatório');
        }

        if (!dados.audioURL || dados.audioURL.trim() === '') {
            erros.push('URL do áudio é obrigatória');
        }

        return erros;
    }

    // Função para adicionar hino com validação
    async adicionarHinoComValidacao(dadosHino) {
        const erros = this.validarDadosHino(dadosHino);
        
        if (erros.length > 0) {
            throw new Error('Dados inválidos: ' + erros.join(', '));
        }

        return await this.adicionarHino(dadosHino);
    }

    // Função para importar hinos de um arquivo JSON
    async importarHinosDeJSON(arquivoJSON) {
        try {
            const hinos = JSON.parse(arquivoJSON);
            if (!Array.isArray(hinos)) {
                throw new Error('O arquivo deve conter um array de hinos');
            }

            const resultados = await this.adicionarMultiplosHinos(hinos);
            return resultados;
        } catch (error) {
            console.error('Erro ao importar hinos:', error);
            throw error;
        }
    }

    // Função para adicionar hinos de exemplo (para teste)
    async adicionarHinosDeExemplo() {
        const hinosExemplo = [
            {
                number: 1,
                title: 'Santo, Santo, Santo',
                filename: 'Hino 01.mp3',
                audioURL: './hinos/Hino 01.mp3',
                duration: 210,
                category: 'Adoração',
                lyrics: 'Santo, Santo, Santo, Senhor Deus Todo-Poderoso...'
            },
            {
                number: 50,
                title: 'Quão Grande És Tu',
                filename: 'Hino 50.mp3',
                audioURL: './hinos/Hino 50.mp3',
                duration: 245,
                category: 'Louvor',
                lyrics: 'Senhor meu Deus, quando eu maravilhado...'
            },
            {
                number: 100,
                title: 'Jesus Me Ama',
                filename: 'Hino 100.mp3',
                audioURL: './hinos/Hino 100.mp3',
                duration: 180,
                category: 'Amor de Deus',
                lyrics: 'Jesus me ama, bem o sei, pois que a Bíblia diz...'
            }
        ];

        return await this.adicionarMultiplosHinos(hinosExemplo);
    }

    // Função para verificar se um hino já existe
    async verificarHinoExiste(numeroHino) {
        try {
            if (!this.db) return false;
            
            const snapshot = await this.db.collection('hymns')
                .where('number', '==', numeroHino)
                .get();
            
            return !snapshot.empty;
        } catch (error) {
            console.error('Erro ao verificar hino:', error);
            return false;
        }
    }

    // Função para atualizar um hino existente
    async atualizarHino(id, novosDados) {
        try {
            if (!this.db) throw new Error('Firebase não inicializado');

            const dadosAtualizacao = {
                ...novosDados,
                updatedAt: new Date()
            };

            await this.db.collection('hymns').doc(id).update(dadosAtualizacao);
            console.log('Hino atualizado com sucesso:', id);
            return true;
        } catch (error) {
            console.error('Erro ao atualizar hino:', error);
            throw error;
        }
    }

    // Função para remover um hino
    async removerHino(id) {
        try {
            if (!this.db) throw new Error('Firebase não inicializado');

            await this.db.collection('hymns').doc(id).delete();
            console.log('Hino removido com sucesso:', id);
            return true;
        } catch (error) {
            console.error('Erro ao remover hino:', error);
            throw error;
        }
    }
}

// Exportar a classe para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdicionarMusicas;
} else {
    window.AdicionarMusicas = AdicionarMusicas;
}

// Exemplo de uso:
/*
const gerenciadorMusicas = new AdicionarMusicas();

// Adicionar um hino
gerenciadorMusicas.adicionarHinoComValidacao({
    number: 123,
    title: 'Exemplo de Hino',
    filename: 'Hino 123.mp3',
    audioURL: './hinos/Hino 123.mp3',
    duration: 200,
    category: 'Louvor'
}).then(hino => {
    console.log('Hino adicionado:', hino);
}).catch(error => {
    console.error('Erro:', error);
});

// Adicionar hinos de exemplo
gerenciadorMusicas.adicionarHinosDeExemplo().then(resultados => {
    console.log('Resultados:', resultados);
});
*/