// Configuração do Firebase
// IMPORTANTE: Substitua estas configurações pelas suas próprias credenciais do Firebase
// Obtenha essas informações no Console do Firebase (https://console.firebase.google.com/)

const firebaseConfig = {
  // Substitua pelos seus dados do Firebase
  apiKey: "AIzaSyBsmmQh9IwkyNsHIg8NdCdLRvuk41s1K5s",
    authDomain: "tocahino.firebaseapp.com",
    databaseURL: "https://tocahino-default-rtdb.firebaseio.com",
    projectId: "tocahino",
    storageBucket: "tocahino.firebasestorage.app",
    messagingSenderId: "485140138796",
    appId: "1:485140138796:web:af84e5a10de16ae5973a89",
    measurementId: "G-YHMGP7FG3W"
  };

// Inicializar Firebase
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);

// Exportar serviços do Firebase
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

// Instruções para configuração:
// 1. Acesse https://console.firebase.google.com/
// 2. Crie um novo projeto ou selecione um existente
// 3. Vá em "Configurações do projeto" > "Geral"
// 4. Na seção "Seus apps", clique em "Adicionar app" e selecione "Web"
// 5. Registre o app e copie as configurações
// 6. Substitua os valores acima pelas suas configurações reais
// 7. Ative o Firebase Storage e Firestore Database no console
// 8. Configure as regras de segurança conforme necessário