class HinoPlayer {
    constructor() {
        this.songs = [];
        this.currentSongIndex = -1;
        this.isPlaying = false;
        this.isShuffleOn = false;
        this.isRepeatOn = false;
        this.previousVolume = 0.5;
        this.audio = new Audio();
        this.audio.preload = 'metadata';
        
        // Aguardar Firebase estar disponível
        this.waitForFirebase().then(() => {
            this.initializeElements();
            this.setupEventListeners();
            this.loadSongs();
        });
    }

    // Funções removidas - funcionalidade de adicionar hino removida
    // handleCoverSelect, handleAudioSelect, clearForm removidas

    // Exemplos de hinos para demonstração
    getExampleHymns() {
        return [
            {
                id: 'hino-03',
                number: 3,
                title: 'Santo! Santo! Santo!',
                filename: 'Hino-03.mp3',
                audioURL: './hinos/Hino-03.mp3',
                coverURL: './images/hino-03.svg',
                duration: 180,
                createdAt: new Date('2024-01-01')
            },
            {
                id: 'hino-06',
                number: 6,
                title: 'Vem, Alma Sedenta',
                filename: 'Hino 06.mp3',
                audioURL: './hinos/Hino 06.mp3',
                coverURL: './images/hino-06.svg',
                duration: 195,
                createdAt: new Date('2024-01-02')
            },
            {
                id: 'hino-35',
                number: 35,
                title: 'Ó Vem, Pecador',
                filename: 'Hino 35.mp3',
                audioURL: './hinos/Hino 35.mp3',
                coverURL: './images/hino-35.svg',
                duration: 210,
                createdAt: new Date('2024-01-03')
            },
            {
                id: 'hino-91',
                number: 91,
                title: 'Caminhando para Sião',
                filename: 'Hino-91.mp3',
                audioURL: './hinos/Hino-91.mp3',
                coverURL: './images/hino-91.svg',
                duration: 225,
                createdAt: new Date('2024-01-04')
            },
            {
                id: 'hino-99',
                number: 99,
                title: 'Vou Seguir a Jesus Cristo',
                filename: 'Hino 99.mp3',
                audioURL: './hinos/Hino 99.mp3',
                coverURL: './images/hino-99.svg',
                duration: 200,
                createdAt: new Date('2024-01-05')
            },
            {
                id: 'hino-140',
                number: 140,
                title: 'Ó Desce, Fogo Santo',
                filename: 'Hino 140.mp3',
                audioURL: './hinos/Hino 140.mp3',
                coverURL: './images/hino-140.svg',
                duration: 240,
                createdAt: new Date('2024-01-06')
            },
            {
                id: 'hino-234',
                number: 234,
                title: 'Que Segurança',
                filename: 'Hino 234.mp3',
                audioURL: './hinos/Hino 234.mp3',
                coverURL: './images/hino-234.svg',
                duration: 252,
                createdAt: new Date('2024-01-07')
            },
            {
                id: 'hino-249',
                number: 249,
                title: 'Vencendo Vem Jesus',
                filename: 'Hino 249.mp3',
                audioURL: './hinos/Hino 249.mp3',
                coverURL: './images/hino-249.svg',
                duration: 215,
                createdAt: new Date('2024-01-08')
            },
            {
                id: 'hino-283',
                number: 283,
                title: 'Castelo Forte',
                filename: 'Hino 283.mp3',
                audioURL: './hinos/Hino 283.mp3',
                coverURL: './images/hino-283.svg',
                duration: 208,
                createdAt: new Date('2024-01-09')
            },
            {
                id: 'hino-334',
                number: 334,
                title: 'Lindo País',
                filename: 'Hino-334-.mp3',
                audioURL: './hinos/Hino-334-.mp3',
                coverURL: './images/hino-334.svg',
                duration: 230,
                createdAt: new Date('2024-01-10')
            },
            {
                id: 'hino-337',
                number: 337,
                title: 'Além do Rio Jordão',
                filename: 'Hino-337.mp3',
                audioURL: './hinos/Hino-337.mp3',
                coverURL: './images/hino-337.svg',
                duration: 245,
                createdAt: new Date('2024-01-11')
            },
            {
                id: 'hino-360',
                number: 360,
                title: 'Mais Perto Quero Estar',
                filename: 'Hino 360.mp3',
                audioURL: './hinos/Hino 360.mp3',
                coverURL: './images/hino-360.svg',
                duration: 195,
                createdAt: new Date('2024-01-12')
            },
            {
                id: 'hino-395',
                number: 395,
                title: 'Jerusalém, Meu Lar Feliz',
                filename: 'Hino-395.mp3',
                audioURL: './hinos/Hino-395.mp3',
                coverURL: './images/hino-395.svg',
                duration: 220,
                createdAt: new Date('2024-01-13')
            },
            {
                id: 'hino-414',
                number: 414,
                title: 'Doce Comunhão',
                filename: 'Hino 414.mp3',
                audioURL: './hinos/Hino 414.mp3',
                coverURL: './images/hino-414.svg',
                duration: 240,
                createdAt: new Date('2024-01-14')
            },
            {
                id: 'hino-416',
                number: 416,
                title: 'Ó Que Doce Melodia',
                filename: 'Hino-416.mp3',
                audioURL: './hinos/Hino-416.mp3',
                coverURL: './images/hino-416.svg',
                duration: 235,
                createdAt: new Date('2024-01-15')
            }
        ];
    }

    // Função mostrarModalAdicionarMusica removida - funcionalidade de adicionar hino removida

    // Função processarNovaMusica removida - funcionalidade de adicionar hino removida

    async waitForFirebase() {
        // Aguardar Firebase ser inicializado
        while (!window.firebaseStorage || !window.firebaseDb) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Importar funções do Firebase
        const { ref, uploadBytes, getDownloadURL, deleteObject } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js');
        const { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        this.storageRef = ref;
        this.uploadBytes = uploadBytes;
        this.getDownloadURL = getDownloadURL;
        this.deleteObject = deleteObject;
        this.collection = collection;
        this.addDoc = addDoc;
        this.getDocs = getDocs;
        this.deleteDoc = deleteDoc;
        this.doc = doc;
        this.query = query;
        this.orderBy = orderBy;
        
        console.log('Firebase pronto para uso!');
    }
    
    // Implementa busca de hinos
    // Funções de busca removidas - funcionalidade de busca removida
    // searchHymns, renderSearchResults, addSearchEventListeners removidas

    async loadSongs() {
        try {
            // Carregar hinos locais primeiro
            const localHymns = await this.loadLocalHymns();
            
            // Tentar carregar do Firebase também
            const songsCollection = this.collection(window.firebaseDb, 'songs');
            const q = this.query(songsCollection, this.orderBy('createdAt', 'desc'));
            const querySnapshot = await this.getDocs(q);
            
            const firebaseSongs = [];
            querySnapshot.forEach((doc) => {
                const songData = doc.data();
                firebaseSongs.push({
                    id: doc.id,
                    title: songData.title,
                    filename: songData.filename,
                    duration: songData.duration,
                    downloadURL: songData.downloadURL,
                    audioURL: songData.downloadURL,
                    createdAt: songData.createdAt
                });
            });
            
            // Combinar hinos locais com Firebase
            this.songs = [...localHymns, ...firebaseSongs];
            
            // Se não houver nenhum hino, usar exemplos
            if (this.songs.length === 0) {
                this.songs = this.getExampleHymns();
                console.log('Carregando hinos de exemplo...');
            }
            
            // this.renderSongList(); // Removido - lista de hinos removida
            console.log(`Carregadas ${this.songs.length} músicas`);
        } catch (error) {
            console.error('Erro ao carregar músicas:', error);
            // Em caso de erro, usar hinos locais
            this.songs = await this.loadLocalHymns();
            if (this.songs.length === 0) {
                this.songs = this.getExampleHymns();
            }
            // this.renderSongList(); // Removido - lista de hinos removida
            this.showMessage('Erro ao carregar músicas do Firebase. Usando hinos locais.', 'warning');
        }
    }

    async loadLocalHymns() {
        const localHymns = [
            {
                id: 'local-06',
                number: 6,
                title: 'Hino 06',
                filename: 'Hino 06.mp3',
                audioURL: './hinos/Hino 06.mp3',
                downloadURL: './hinos/Hino 06.mp3',
                coverURL: './images/hino-06.svg',
                category: 'Louvor',
                isLocal: true,
                duration: '3:45'
            },
            {
                id: 'local-234',
                number: 234,
                title: 'Hino 234',
                filename: 'Hino 234.mp3',
                audioURL: './hinos/Hino 234.mp3',
                downloadURL: './hinos/Hino 234.mp3',
                coverURL: './images/hino-234.svg',
                category: 'Adoração',
                isLocal: true,
                duration: '4:12'
            },
            {
                id: 'local-283',
                number: 283,
                title: 'Hino 283',
                filename: 'Hino 283.mp3',
                audioURL: './hinos/Hino 283.mp3',
                downloadURL: './hinos/Hino 283.mp3',
                coverURL: './images/hino-283.svg',
                category: 'Gratidão',
                isLocal: true,
                duration: '3:28'
            },
            {
                id: 'local-360',
                number: 360,
                title: 'Hino 360',
                filename: 'Hino 360.mp3',
                audioURL: './hinos/Hino 360.mp3',
                downloadURL: './hinos/Hino 360.mp3',
                coverURL: './images/hino-360.svg',
                category: 'Esperança',
                isLocal: true,
                duration: '4:01'
            },
            {
                id: 'local-414',
                number: 414,
                title: 'Hino 414',
                filename: 'Hino 414.mp3',
                audioURL: './hinos/Hino 414.mp3',
                downloadURL: './hinos/Hino 414.mp3',
                coverURL: './images/hino-414.svg',
                category: 'Paz',
                isLocal: true,
                duration: '3:55'
            }
        ];

        return localHymns;
    }

    initializeElements() {
        // Elementos essenciais
        this.songList = document.getElementById('songList');
        
        // Elementos do player removidos - funcionalidade simplificada
    }

    setupEventListeners() {
        // Player controls removidos - elementos não existem mais
        
        // Audio events básicos
        if (this.audio) {
            this.audio.addEventListener('loadedmetadata', this.updateDuration.bind(this));
            this.audio.addEventListener('timeupdate', this.updateProgress.bind(this));
            this.audio.addEventListener('ended', this.nextSong.bind(this));
        }

        // Search removido
        
        // Elementos de adicionar hino removidos
        
        // Event listener para botões de remoção e clique nos itens
        this.songList.addEventListener('click', (e) => {
            if (e.target.closest('.action-btn')) {
                e.stopPropagation();
                const songId = e.target.closest('.action-btn').dataset.songId;
                this.removeSong(songId);
            } else if (e.target.closest('.song-item')) {
                const songIndex = parseInt(e.target.closest('.song-item').dataset.songIndex);
                this.playSong(songIndex);
            }
        });
        
        // Gerenciador de músicas removido - funcionalidade de adicionar hino removida
        
        // Botão de adicionar música removido - funcionalidade de adicionar hino removida

        // Navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = item.getAttribute('data-section');
                if (sectionId) {
                    this.showSection(sectionId);
                    

                }
            });
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }

        // Adicionar funcionalidades de favoritos
        const favoriteBtn = document.querySelector('.favorite-btn');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', () => {
                this.toggleFavorite();
            });
        }

        // Inicializar playlists
        this.initializePlaylists();
    }





    // Função performSearch removida - funcionalidade de busca removida



    initializePlaylists() {
        // Inicializar favoritos
        if (!localStorage.getItem('favorites')) {
            localStorage.setItem('favorites', JSON.stringify([]));
        }
        
        // Inicializar playlists personalizadas
        if (!localStorage.getItem('playlists')) {
            localStorage.setItem('playlists', JSON.stringify([]));
        }
        
        this.updatePlaylistsUI();
    }

    updatePlaylistsUI() {
        const playlistList = document.querySelector('.playlist-list');
        if (!playlistList) return;

        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');

        // Atualizar contador de favoritos
        const favoritesItem = playlistList.querySelector('.playlist-item');
        if (favoritesItem) {
            const span = favoritesItem.querySelector('span');
            if (span) {
                span.textContent = `Hinos Favoritos (${favorites.length})`;
            }
        }

        // Adicionar event listener para favoritos se ainda não foi adicionado
        if (favoritesItem && !favoritesItem.hasAttribute('data-listener')) {
            favoritesItem.setAttribute('data-listener', 'true');
            favoritesItem.addEventListener('click', () => {
                this.showFavorites();
            });
        }

        // Renderizar playlists personalizadas
        const playlistsContainer = document.querySelector('.playlists-list');
        if (playlistsContainer) {
            playlistsContainer.innerHTML = playlists.map(playlist => `
                <div class="playlist-item" data-playlist-id="${playlist.id}">
                    <i class="fas fa-music"></i>
                    <span>${playlist.name} (${playlist.songs.length})</span>
                    <div class="playlist-actions">
                        <button class="btn-edit-playlist" onclick="player.editPlaylist('${playlist.id}')" title="Editar playlist">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete-playlist" onclick="player.deletePlaylist('${playlist.id}')" title="Excluir playlist">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');

            // Adicionar event listeners para as playlists
            playlists.forEach(playlist => {
                const playlistElement = playlistsContainer.querySelector(`[data-playlist-id="${playlist.id}"]`);
                if (playlistElement && !playlistElement.hasAttribute('data-listener')) {
                    playlistElement.setAttribute('data-listener', 'true');
                    playlistElement.addEventListener('click', (e) => {
                        // Não executar se clicou em um botão de ação
                        if (!e.target.closest('.playlist-actions')) {
                            this.showPlaylist(playlist.id);
                        }
                    });
                }
            });
        }
    }

    // Função para criar nova playlist
    createPlaylist(name, description = '') {
        const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
        const newPlaylist = {
            id: Date.now().toString(),
            name: name,
            description: description,
            songs: [],
            createdAt: new Date().toISOString()
        };
        
        playlists.push(newPlaylist);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        this.updatePlaylistsUI();
        
        return newPlaylist;
    }

    // Função para mostrar playlist específica
    showPlaylist(playlistId) {
        const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
        const playlist = playlists.find(p => p.id === playlistId);
        
        if (!playlist) return;

        this.showSection('home-section');
        const container = document.querySelector('.main-content');
        const mainTitle = document.querySelector('.main-content h1, .content-section.active h1');

        if (playlist.songs.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-music"></i>
                    <h2>Playlist vazia</h2>
                    <p>Adicione hinos à playlist "${playlist.name}" para começar a ouvir.</p>
                </div>
            `;
        } else {
            container.innerHTML = playlist.songs.map((song, index) => `
                <div class="hymn-card" data-song-id="${song.id}">
                    <div class="hymn-cover">
                        <img src="${song.cover}" alt="Capa do Hino ${song.number}" onerror="this.src='https://via.placeholder.com/200x200/1db954/ffffff?text=Hino+${song.number}'">
                        <div class="play-overlay">
                            <button class="play-btn" onclick="player.playSong(${this.songs.findIndex(s => s.id === song.id)})">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                    </div>
                    <div class="hymn-info">
                        <h3>Hino ${song.number}</h3>
                        <p>${song.title}</p>
                        <div class="card-actions">
                            <button class="btn-remove-from-playlist" onclick="player.removeFromPlaylist('${playlistId}', '${song.id}')" title="Remover da playlist">
                                <i class="fas fa-times"></i> Remover
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        if (mainTitle) {
            mainTitle.textContent = `${playlist.name} (${playlist.songs.length})`;
        }
    }

    // Função para adicionar hino à playlist
    addToPlaylist(playlistId, song) {
        const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
        const playlistIndex = playlists.findIndex(p => p.id === playlistId);
        
        if (playlistIndex === -1) return false;

        // Verificar se o hino já está na playlist
        const songExists = playlists[playlistIndex].songs.some(s => s.id === song.id);
        if (songExists) {
            this.showNotification('Este hino já está na playlist!');
            return false;
        }

        playlists[playlistIndex].songs.push(song);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        this.updatePlaylistsUI();
        this.showNotification(`Hino adicionado à playlist "${playlists[playlistIndex].name}"!`);
        
        return true;
    }

    // Função para remover hino da playlist
    removeFromPlaylist(playlistId, songId) {
        const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
        const playlistIndex = playlists.findIndex(p => p.id === playlistId);
        
        if (playlistIndex === -1) return;

        playlists[playlistIndex].songs = playlists[playlistIndex].songs.filter(s => s.id !== songId);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        this.updatePlaylistsUI();
        
        // Atualizar a visualização se estamos vendo esta playlist
        this.showPlaylist(playlistId);
    }

    // Função para editar playlist
    editPlaylist(playlistId) {
        const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
        const playlist = playlists.find(p => p.id === playlistId);
        
        if (!playlist) return;

        const newName = prompt('Novo nome da playlist:', playlist.name);
        if (newName && newName.trim()) {
            playlist.name = newName.trim();
            localStorage.setItem('playlists', JSON.stringify(playlists));
            this.updatePlaylistsUI();
        }
    }

    // Função para excluir playlist
    deletePlaylist(playlistId) {
        if (confirm('Tem certeza que deseja excluir esta playlist?')) {
            const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
            const updatedPlaylists = playlists.filter(p => p.id !== playlistId);
            localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
            this.updatePlaylistsUI();
            this.showNotification('Playlist excluída com sucesso!');
        }
    }

    // Função para abrir modal de adicionar à playlist
    openAddToPlaylistModal(songId) {
        const song = this.songs.find(s => s.id === songId);
        if (!song) return;

        const modal = document.getElementById('addToPlaylistModal');
        const playlistOptions = document.getElementById('playlistOptions');
        
        if (!modal || !playlistOptions) return;

        // Armazenar o hino selecionado
        this.selectedSongForPlaylist = song;

        // Carregar playlists disponíveis
        const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        playlistOptions.innerHTML = `
            <div class="playlist-option" onclick="player.addToFavorites('${song.id}')">
                <i class="fas fa-heart"></i>
                <span>Hinos Favoritos (${favorites.length})</span>
            </div>
            ${playlists.map(playlist => `
                <div class="playlist-option" onclick="player.addToPlaylist('${playlist.id}', player.selectedSongForPlaylist)">
                    <i class="fas fa-music"></i>
                    <span>${playlist.name} (${playlist.songs.length})</span>
                </div>
            `).join('')}
        `;

        modal.classList.add('active');
    }

    // Função para adicionar aos favoritos (compatibilidade)
    addToFavorites(songId) {
        const song = this.songs.find(s => s.id === songId);
        if (!song) return;

        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const songExists = favorites.some(fav => fav.id === song.id);
        
        if (songExists) {
            this.showNotification('Este hino já está nos favoritos!');
        } else {
            favorites.push(song);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.updatePlaylistsUI();
            this.showNotification('Hino adicionado aos favoritos!');
        }
        
        this.closeAddToPlaylistModal();
    }

    showFavorites() {
        // Renderizar apenas favoritos
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        // Como a seção da biblioteca foi removida, vamos mostrar os favoritos na seção principal
        const container = document.getElementById('searchResults') || document.querySelector('.hymn-grid');
        
        if (!container) return;

        if (favorites.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <p>Nenhum hino favorito ainda.</p>
                    <p>Adicione hinos aos favoritos para vê-los aqui!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = favorites.map((song, index) => {
            const hymnNumber = song.number ? song.number : index + 1;
            const songTitle = song.title || song.filename;
            const realIndex = this.songs.findIndex(s => s.id === song.id);
            const isActive = realIndex === this.currentSongIndex ? 'active' : '';
            
            return `
                <div class="hymn-card ${isActive}" data-index="${realIndex}">
                    <div class="hymn-card-image">
                        ${song.coverURL ? 
                            `<img src="${song.coverURL}" alt="${songTitle}">` :
                            `<i class="fas fa-music"></i>`
                        }
                        <button class="play-overlay" onclick="player.playSong(${realIndex})">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                    <div class="hymn-card-title">Hino ${hymnNumber}</div>
                    <div class="hymn-card-info">${songTitle}</div>
                </div>
            `;
        }).join('');

        // Adicionar event listeners para os cards
        const hymnCards = container.querySelectorAll('.hymn-card');
        hymnCards.forEach((card) => {
            card.addEventListener('click', (e) => {
                // Não executa se clicou no botão de play
                if (e.target.closest('.play-overlay')) return;
                
                const index = parseInt(card.getAttribute('data-index'));
                if (index >= 0) {
                    this.playSong(index);
                }
            });
        });

        // Atualizar título da seção principal se existir
        const mainTitle = document.querySelector('.main-content h1, .content-section.active h1');
        if (mainTitle) {
            mainTitle.textContent = `Hinos Favoritos (${favorites.length})`;
        }
    }

    removeFavorite(songId) {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const updatedFavorites = favorites.filter(fav => fav.id !== songId);
        
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        this.showNotification('Removido dos favoritos');
        this.updateFavoriteButton();
        this.updatePlaylistsUI();
        
        // Se estamos na visualização de favoritos, atualizar
        if (document.querySelector('.main-content h1, .content-section.active h1')?.textContent.includes('Favoritos')) {
            this.showFavorites();
        }
    }

    showSection(sectionId) {
        // Ocultar todas as seções
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.classList.remove('active'));
        
        // Mostrar seção específica
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Atualizar navegação
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        
        const targetNavItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
        }
    }

    toggleFavorite() {
        if (this.currentSong) {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            const hymnId = this.currentSong.id;
            const index = favorites.findIndex(fav => fav.id === hymnId);
            
            if (index > -1) {
                favorites.splice(index, 1);
                this.showNotification('Removido dos favoritos');
            } else {
                favorites.push(this.currentSong);
                this.showNotification('Adicionado aos favoritos');
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.updateFavoriteButton();
            this.updatePlaylistsUI();
        }
    }

    updateFavoriteButton() {
        const favoriteBtn = document.querySelector('.favorite-btn');
        if (favoriteBtn && this.currentSong) {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            const isFavorite = favorites.some(fav => fav.id === this.currentSong.id);
            favoriteBtn.classList.toggle('active', isFavorite);
            favoriteBtn.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        }
    }

    // Função renderSongList removida - lista de hinos removida
    
    // Função renderHymnGrid removida - lista de hinos removida

    // Função auxiliar para verificar se um hino é favorito
    isFavorite(songId) {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return favorites.some(fav => fav.id === songId);
    }

    // Função para alternar favorito a partir do card
    toggleFavoriteFromCard(songId) {
        const song = this.songs.find(s => s.id === songId);
        if (!song) return;

        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const index = favorites.findIndex(fav => fav.id === songId);

        if (index > -1) {
            // Remover dos favoritos
            favorites.splice(index, 1);
            this.showNotification('Hino removido dos favoritos!');
        } else {
            // Adicionar aos favoritos
            favorites.push(song);
            this.showNotification('Hino adicionado aos favoritos!');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.updatePlaylistsUI();
        
        // Atualizar o botão no card
        const cardButton = document.querySelector(`[onclick="player.toggleFavoriteFromCard('${songId}')"]`);
        if (cardButton) {
            const isFav = favorites.some(fav => fav.id === songId);
            cardButton.classList.toggle('active', isFav);
            cardButton.title = isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
        }
        
        // Atualizar botão do player se for a música atual
        if (this.currentSong && this.currentSong.id === songId) {
            this.updateFavoriteButton();
        }
    }

    getFilteredSongs() {
        const searchTerm = this.searchInput.value.toLowerCase();
        return this.songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) ||
            song.filename.toLowerCase().includes(searchTerm)
        );
    }

    filterSongs() {
        // this.renderSongList(); // Removido - lista de hinos removida
    }

    async playSong(index) {
        if (index < 0 || index >= this.songs.length) return;

        const song = this.songs[index];
        if (!song.downloadURL) {
            this.showMessage('URL da música não encontrada.', 'error');
            return;
        }

        try {
            this.currentSongIndex = index;
            this.currentSong = song;
            this.audio.src = song.audioURL || song.downloadURL;
            this.audio.load();
            
            this.updatePlayerUI();
            // this.renderSongList(); // Removido - lista de hinos removida
            
            // Sempre iniciar a reprodução quando um hino for selecionado
            await this.audio.play();
            this.isPlaying = true;
            this.updatePlayerUI();
            
        } catch (error) {
            console.error('Erro ao reproduzir música:', error);
            this.showMessage('Erro ao reproduzir música. Verifique sua conexão.', 'error');
        }
    }

    async togglePlay() {
        if (this.currentSongIndex === -1 && this.songs.length > 0) {
            this.playSong(0);
            return;
        }

        if (this.audio.src) {
            try {
                if (this.isPlaying) {
                    this.audio.pause();
                    this.isPlaying = false;
                } else {
                    await this.audio.play();
                    this.isPlaying = true;
                }
                this.updatePlayerUI();
            } catch (error) {
                console.error('Erro ao controlar reprodução:', error);
                this.showMessage('Erro ao controlar reprodução.', 'error');
            }
        }
    }

    previousSong() {
        if (this.isShuffleOn && this.songs.length > 1) {
            // Se shuffle está ativo, escolhe uma música aleatória diferente da atual
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * this.songs.length);
            } while (randomIndex === this.currentSongIndex && this.songs.length > 1);
            this.playSong(randomIndex);
        } else if (this.currentSongIndex > 0) {
            this.playSong(this.currentSongIndex - 1);
        } else if (this.songs.length > 0) {
            this.playSong(this.songs.length - 1);
        }
    }

    nextSong() {
        if (this.isRepeatOn && this.currentSongIndex >= 0) {
            // Se repeat está ativo, repete a música atual
            this.playSong(this.currentSongIndex);
        } else if (this.isShuffleOn && this.songs.length > 1) {
            // Se shuffle está ativo, escolhe uma música aleatória diferente da atual
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * this.songs.length);
            } while (randomIndex === this.currentSongIndex && this.songs.length > 1);
            this.playSong(randomIndex);
        } else if (this.currentSongIndex < this.songs.length - 1) {
            this.playSong(this.currentSongIndex + 1);
        } else if (this.songs.length > 0) {
            this.playSong(0);
        }
    }

    updateVolume() {
        this.audio.volume = this.volumeSlider.value / 100;
    }

    toggleShuffle() {
        this.isShuffleOn = !this.isShuffleOn;
        this.shuffleBtn.classList.toggle('active', this.isShuffleOn);
        this.showNotification(this.isShuffleOn ? 'Modo aleatório ativado' : 'Modo aleatório desativado');
    }

    toggleRepeat() {
        this.isRepeatOn = !this.isRepeatOn;
        this.repeatBtn.classList.toggle('active', this.isRepeatOn);
        this.showNotification(this.isRepeatOn ? 'Repetir ativado' : 'Repetir desativado');
    }

    toggleQueue() {
        // Funcionalidade da fila pode ser implementada futuramente
        this.showNotification('Funcionalidade da fila em desenvolvimento');
    }

    toggleMute() {
        if (this.audio.volume > 0) {
            this.previousVolume = this.audio.volume;
            this.audio.volume = 0;
            this.volumeSlider.value = 0;
            this.volumeBtn.querySelector('i').className = 'fas fa-volume-mute';
        } else {
            this.audio.volume = this.previousVolume || 0.5;
            this.volumeSlider.value = (this.previousVolume || 0.5) * 100;
            this.volumeBtn.querySelector('i').className = 'fas fa-volume-up';
        }
    }

    updateDuration() {
        this.totalTime.textContent = this.formatTime(this.audio.duration);
    }

    updateProgress() {
        if (this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressFill.style.width = progress + '%';
            this.currentTime.textContent = this.formatTime(this.audio.currentTime);
        }
    }

    seekTo(e) {
        if (this.audio.duration) {
            const rect = this.progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audio.currentTime = percent * this.audio.duration;
        }
    }

    async removeSong(songId) {
        try {
            const songIndex = this.songs.findIndex(song => song.id === songId);
            if (songIndex === -1) return;
            
            const song = this.songs[songIndex];
            
            // Remover arquivos do Firebase Storage
            if (song.audioPath || song.storagePath) {
                const audioPath = song.audioPath || song.storagePath;
                const audioRef = this.storageRef(window.firebaseStorage, audioPath);
                await this.deleteObject(audioRef);
            }
            
            if (song.coverPath) {
                const coverRef = this.storageRef(window.firebaseStorage, song.coverPath);
                await this.deleteObject(coverRef);
            }
            
            // Remover do Firestore
            await this.deleteDoc(this.doc(window.firebaseDb, 'songs', songId));
            
            // Atualizar player se necessário
            if (songIndex === this.currentSongIndex) {
                this.audio.pause();
                this.isPlaying = false;
                this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
                this.currentSongIndex = -1;
                this.currentSongTitle.textContent = 'Nenhum hino selecionado';
                this.currentSongInfo.textContent = 'Adicione hinos para começar a ouvir';
            } else if (songIndex < this.currentSongIndex) {
                this.currentSongIndex--;
            }
            
            // Remover da lista local
            this.songs.splice(songIndex, 1);
            // this.renderSongList(); // Removido - lista de hinos removida
            
            this.showMessage('Música removida com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao remover música:', error);
            this.showMessage('Erro ao remover música.', 'error');
        }
    }

    updatePlayerUI() {
        const currentSongTitle = document.getElementById('currentSongTitle');
        const currentSongInfo = document.getElementById('currentSongInfo');
        const currentTrackImage = document.getElementById('currentTrackImage');
        const trackPlaceholder = document.querySelector('.track-placeholder');
        const playButton = document.getElementById('playBtn');
        const currentPlayingElement = document.getElementById('currentPlaying');
        
        if (this.currentSong) {
            const hymnNumber = this.currentSong.number ? this.currentSong.number : this.currentSongIndex + 1;
            const songTitle = this.currentSong.title || this.currentSong.filename;
            
            if (currentSongTitle) {
                currentSongTitle.textContent = `Hino ${hymnNumber} - ${songTitle}`;
            }
            
            if (currentSongInfo) {
                currentSongInfo.textContent = 'Congregação Cristã no Brasil';
            }
            
            // Atualiza a imagem do track
            if (this.currentSong.coverURL) {
                if (currentTrackImage) {
                    currentTrackImage.src = this.currentSong.coverURL;
                    currentTrackImage.style.display = 'block';
                }
                if (trackPlaceholder) {
                    trackPlaceholder.style.display = 'none';
                }
            } else {
                if (currentTrackImage) {
                    currentTrackImage.style.display = 'none';
                }
                if (trackPlaceholder) {
                    trackPlaceholder.style.display = 'flex';
                }
            }
            
            if (currentPlayingElement) {
                currentPlayingElement.textContent = `Hino ${hymnNumber} - ${songTitle}`;
            }
        } else {
            if (currentSongTitle) {
                currentSongTitle.textContent = 'Nenhum hino selecionado';
            }
            
            if (currentSongInfo) {
                currentSongInfo.textContent = 'Adicione hinos para começar a ouvir';
            }
            
            if (currentTrackImage) {
                currentTrackImage.style.display = 'none';
            }
            if (trackPlaceholder) {
                trackPlaceholder.style.display = 'flex';
            }
            
            if (currentPlayingElement) {
                currentPlayingElement.textContent = 'Nenhum';
            }
        }
        
        // Atualiza o botão de play/pause
        if (playButton) {
            const icon = playButton.querySelector('i');
            if (icon) {
                if (this.isPlaying) {
                    icon.className = 'fas fa-pause';
                    playButton.title = 'Pausar';
                } else {
                    icon.className = 'fas fa-play';
                    playButton.title = 'Tocar';
                }
            }
        }
        
        // Atualiza a lista de músicas
        this.updateActiveSong();
        
        // Atualiza botão de favorito
        this.updateFavoriteButton();
    }

    updateActiveSong() {
        const hymnCards = document.querySelectorAll('.hymn-card');
        hymnCards.forEach((card) => {
            const index = parseInt(card.getAttribute('data-index'));
            if (index === this.currentSongIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    




    showMessage(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos inline para a notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 300px;
        `;
        
        // Cores baseadas no tipo
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            info: '#2196F3',
            warning: '#ff9800'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    showNotification(message) {
        // Remover notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Adicionar método para adicionar hino com arquivos locais
    addSimpleHymn(number, title) {
        // Buscar arquivos correspondentes
        const audioFile = this.findAudioFile(number);
        const imageFile = this.findImageFile(number);
        
        // Criar objeto do hino com arquivos locais
        const newHymn = {
            id: `hino-${number}-${Date.now()}`,
            number: parseInt(number),
            title: title,
            filename: audioFile || `Hino ${number}.mp3`,
            audioURL: audioFile ? `hinos/${audioFile}` : null,
            coverURL: imageFile ? `images/${imageFile}` : null,
            duration: 0,
            createdAt: new Date(),
            isLocal: true // Marcador para hinos locais
        };

        // Adicionar à lista de hinos
        this.songs.push(newHymn);
        
        // Atualizar a interface
        this.loadLocalHymns();
        
        // Mostrar notificação com informações dos arquivos encontrados
        let message = `Hino ${number} - "${title}" adicionado com sucesso!`;
        if (audioFile) message += ` (Áudio: ${audioFile})`;
        if (imageFile) message += ` (Imagem: ${imageFile})`;
        
        this.showNotification(message);
        
        return newHymn;
    }

    // Método para encontrar arquivo de áudio correspondente
    findAudioFile(number) {
        const possibleNames = [
            `Hino ${number}.mp3`,
            `Hino-${number}.mp3`,
            `Hino ${number.toString().padStart(2, '0')}.mp3`,
            `Hino-${number.toString().padStart(2, '0')}.mp3`,
            `hino-${number}.mp3`,
            `hino ${number}.mp3`
        ];
        
        // Lista dos arquivos existentes na pasta hinos
        const existingFiles = [
            'Hino 06.mp3', 'Hino 140.mp3', 'Hino 234.mp3', 'Hino 249.mp3', 
            'Hino 283.mp3', 'Hino 35.mp3', 'Hino 360.mp3', 'Hino 414.mp3', 
            'Hino 99.mp3', 'Hino-03.mp3', 'Hino-140.mp3', 'Hino-334-.mp3', 
            'Hino-337.mp3', 'Hino-35.mp3', 'Hino-395.mp3', 'Hino-416.mp3', 
            'Hino-91.mp3', 'Hino-99.mp3'
        ];
        
        for (const name of possibleNames) {
            if (existingFiles.includes(name)) {
                return name;
            }
        }
        
        return null;
    }

    // Método para encontrar arquivo de imagem correspondente
    findImageFile(number) {
        const possibleNames = [
            `hino-${number}.svg`,
            `hino-${number.toString().padStart(2, '0')}.svg`,
            `Hino-${number}.svg`,
            `Hino ${number}.svg`
        ];
        
        // Lista dos arquivos de imagem existentes na pasta images
        const existingImages = [
            'hino-03.svg', 'hino-06.svg', 'hino-140.svg', 'hino-234.svg',
            'hino-249.svg', 'hino-283.svg', 'hino-334.svg', 'hino-337.svg',
            'hino-35.svg', 'hino-360.svg', 'hino-395.svg', 'hino-414.svg',
            'hino-416.svg', 'hino-91.svg', 'hino-99.svg'
        ];
        
        for (const name of possibleNames) {
            if (existingImages.includes(name)) {
                return name;
            }
        }
        
        return null;
    }

    // Verificar se um número de hino já existe
    hymnNumberExists(number) {
        return this.songs.some(song => song.number === parseInt(number));
    }




}







// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando aplicação...');
    
    // Inicializa o player
    window.player = new HinoPlayer();
});

// Navegação entre seções
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active de todos os links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Adiciona active ao link clicado
            link.parentElement.classList.add('active');
            
            // Esconde todas as seções
            sections.forEach(section => section.classList.remove('active'));
            
            // Mostra a seção correspondente
            const targetSection = link.getAttribute('data-section');
            const section = document.getElementById(targetSection + '-section');
            if (section) {
                section.classList.add('active');
            }
        });
    });
}

// Função initializeModal removida - funcionalidade de adicionar hino removida

// Sistema de busca removido - funcionalidade de busca removida

// Funções para controlar modais de playlist
function openCreatePlaylistModal() {
    const modal = document.getElementById('createPlaylistModal');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('playlistName').focus();
    }
}

function closeCreatePlaylistModal() {
    const modal = document.getElementById('createPlaylistModal');
    if (modal) {
        modal.classList.remove('active');
        document.getElementById('createPlaylistForm').reset();
    }
}

function closeAddToPlaylistModal() {
    const modal = document.getElementById('addToPlaylistModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Funções para controlar modal de adicionar hino
function openAddHymnModal() {
    const modal = document.getElementById('addHymnModal');
    if (modal) {
        modal.classList.add('active');
        // Limpar campos
        document.getElementById('hymnNumber').value = '';
        document.getElementById('hymnTitle').value = '';
        // Esconder preview
        document.getElementById('filePreview').style.display = 'none';
        // Focar no primeiro campo
        document.getElementById('hymnNumber').focus();
    }
}

function closeAddHymnModal() {
    const modal = document.getElementById('addHymnModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Função para atualizar preview dos arquivos
function updateFilePreview(number) {
    if (!number) {
        document.getElementById('filePreview').style.display = 'none';
        return;
    }
    
    const audioFile = player.findAudioFile(number);
    const imageFile = player.findImageFile(number);
    
    const filePreview = document.getElementById('filePreview');
    const audioPreview = document.getElementById('audioPreview');
    const imagePreview = document.getElementById('imagePreview');
    
    // Resetar previews
    audioPreview.style.display = 'none';
    imagePreview.style.display = 'none';
    
    if (audioFile || imageFile) {
        filePreview.style.display = 'block';
        
        if (audioFile) {
            document.getElementById('audioFilename').textContent = audioFile;
            audioPreview.style.display = 'block';
        }
        
        if (imageFile) {
            document.getElementById('imageFilename').textContent = imageFile;
            document.getElementById('previewImage').src = `images/${imageFile}`;
            imagePreview.style.display = 'block';
        }
    } else {
        filePreview.style.display = 'none';
    }
}

// Event listeners adicionais para os modais
document.addEventListener('DOMContentLoaded', function() {
    // Event listener para o botão de criar playlist
    const btnAddPlaylist = document.querySelector('.btn-add-playlist');
    if (btnAddPlaylist) {
        btnAddPlaylist.addEventListener('click', openCreatePlaylistModal);
    }

    // Event listener para o formulário de criar playlist
    const createPlaylistForm = document.getElementById('createPlaylistForm');
    if (createPlaylistForm) {
        createPlaylistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('playlistName').value.trim();
            const description = document.getElementById('playlistDescription').value.trim();
            
            if (name) {
                player.createPlaylist(name, description);
                closeCreatePlaylistModal();
                player.showNotification(`Playlist "${name}" criada com sucesso!`);
            }
        });
    }

    // Event listener para o formulário de adicionar hino
    const addHymnForm = document.getElementById('addHymnForm');
    if (addHymnForm) {
        // Event listener para preview em tempo real
        const hymnNumberInput = document.getElementById('hymnNumber');
        if (hymnNumberInput) {
            hymnNumberInput.addEventListener('input', function(e) {
                const number = e.target.value.trim();
                updateFilePreview(number);
            });
        }
        
        addHymnForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const number = document.getElementById('hymnNumber').value.trim();
            const title = document.getElementById('hymnTitle').value.trim();
            
            // Validação básica
            if (!number || !title) {
                player.showNotification('Por favor, preencha todos os campos!');
                return;
            }
            
            // Verificar se o número já existe
            if (player.hymnNumberExists(number)) {
                player.showNotification(`Já existe um hino com o número ${number}!`);
                return;
            }
            
            // Adicionar o hino
            player.addSimpleHymn(number, title);
            closeAddHymnModal();
        });
    }

    // Fechar modais ao clicar fora deles
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            if (e.target.id === 'createPlaylistModal') {
                closeCreatePlaylistModal();
            } else if (e.target.id === 'addToPlaylistModal') {
                closeAddToPlaylistModal();
            } else if (e.target.id === 'addHymnModal') {
                closeAddHymnModal();
            }
        }
    });
});