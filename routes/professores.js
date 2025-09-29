const express = require('express');
const router = express.Router();

let professores = [
  {
    id: 1,
    nome: 'Carlos Oliveira',
    email: 'carlos@escola.com',
    cpf: '111.222.333-44',
    curso: 'Matemática',
    disciplina: 'Cálculo I'
  },
  {
    id: 2,
    nome: 'Ana Paula',
    email: 'ana@escola.com',
    cpf: '555.666.777-88',
    curso: 'Português',
    disciplina: 'Gramática'
  }
];

// GET todos os professores
router.get('/', (req, res) => {
  res.json(professores);
});

// GET professor por ID
router.get('/:id', (req, res) => {
  const professor = professores.find(p => p.id === parseInt(req.params.id));
  if (!professor) {
    return res.status(404).json({ error: 'Professor não encontrado' });
  }
  res.json(professor);
});

// POST novo professor
router.post('/', (req, res) => {
  const { nome, email, cpf, curso, disciplina } = req.body;

  if (!nome || !email || !cpf || !curso || !disciplina) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const id = professores.length ? professores[professores.length - 1].id + 1 : 1;
  const novoProfessor = { id, nome, email, cpf, curso, disciplina };
  professores.push(novoProfessor);
  res.status(201).json(novoProfessor);
});

// PUT atualizar professor
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ error: 'Professor não encontrado' });
  }

  const { nome, email, cpf, curso, disciplina } = req.body;

  if (!nome || !email || !cpf || !curso || !disciplina) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  professor.nome = nome;
  professor.email = email;
  professor.cpf = cpf;
  professor.curso = curso;
  professor.disciplina = disciplina;

  res.json(professor);
});

// DELETE professor
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = professores.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Professor não encontrado' });
  }

  professores.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
