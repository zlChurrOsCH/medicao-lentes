import express from 'express';
import cors from 'cors';
import authController from './controllers/authController.js';

const app = express();
app.use(cors()); // Habilitar CORS
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Rota para login
app.post('/api/login', authController.login);

// Rota para criar usuário
app.post('/api/criarusuario', authController.createUser);

// Rota para obter o Histórico baseado no ID
app.get('/api/historico/:id', authController.historicoUser)

// Rota para obter todas as medições se o usuário for administrador
app.get('/api/medicoes', authController.getAllMedicoes);

export default app;