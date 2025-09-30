const express = require('express');
const cors = require('cors');

const alunosRoutes = require('./routes/alunos');
const professoresRoutes = require('./routes/professores');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/alunos', alunosRoutes);         // Membro 1
app.use('/professores', professoresRoutes);     // Membro 2


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

