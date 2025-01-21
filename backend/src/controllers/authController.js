import 'dotenv/config'; // Carregar variáveis de ambiente do arquivo .env
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authController = {
  // Função de login
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.login(username, password);

      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas: usuário ou senha incorretos' });
      }

      // Gerar token JWT
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, username: user.usuario, isAdmin: user.isAdmin } });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ message: 'Erro ao realizar o login. Por favor, tente novamente mais tarde.' }); 
    }
  },

  // Função para criar um novo usuário
  async createUser(req, res) {
    const { usuario, senha, nome, sobrenome, email, nivel, lente_a_maior, lente_a_x_eps, lente_a_y_eps, lente_a_x_cliente, lente_a_y_cliente, lente_b_menor, lente_b_x_eps, lente_b_y_eps, lente_b_x_cliente, lente_b_y_cliente, armacao, tolerancia } = req.body;

    try {
      const userId = await User.createUser(
        { usuario, senha, nome, sobrenome, email, nivel },
        { lente_a_maior, lente_a_x_eps, lente_a_y_eps, lente_a_x_cliente, lente_a_y_cliente, lente_b_menor, lente_b_x_eps, lente_b_y_eps, lente_b_x_cliente, lente_b_y_cliente, armacao, tolerancia }
      );

      res.status(201).json({ message: 'Usuário criado com sucesso', userId });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro ao criar usuário. Por favor, tente novamente mais tarde.' });
    }
  },

  async historicoUser(req, res) {
    const userId = req.params.id;
    try {
      const historico = await User.historicoUser(userId);
      res.json(historico);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      res.status(500).json({ error: 'Erro ao buscar histórico' });
    }
  },

  async getAllMedicoes(req, res) {
    try {
      const medicoes = await User.getAllMedicoes();
      res.json(medicoes);
    } catch (error) {
      console.error('Erro ao buscar todas as medições:', error);
      res.status(500).json({ error: 'Erro ao buscar todas as medições' });
    }
  }
};

export default authController;