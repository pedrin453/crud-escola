const express = require('express')
const router = express.Router()

let alunos = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com', cpf: '12345678900', telefone: '11999999999', dataNascimento: '2000-05-10' },
  { id: 2, nome: 'Maria Souza', email: 'maria@email.com', cpf: '98765432100', telefone: '11988888888', dataNascimento: '1999-11-25' }
]

// GET - Listar todos os alunos
router.get('/', (req, res) => {
  res.json(alunos)
})

// GET - Buscar aluno por ID
router.get('/:id', (req, res) => {
  const aluno = alunos.find(a => a.id === parseInt(req.params.id))
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' })
  res.json(aluno)
})

// POST - Criar novo aluno
router.post('/', (req, res) => {
  const { nome, email, cpf, telefone, dataNascimento } = req.body
  if (!nome || !email || !cpf) {
    return res.status(400).json({ message: 'Nome, email e CPF são obrigatórios' })
  }

  const existe = alunos.find(a => a.cpf === cpf || a.email === email)
  if (existe) return res.status(400).json({ message: 'Aluno já cadastrado' })

  const novoAluno = {
    id: alunos.length ? alunos[alunos.length - 1].id + 1 : 1,
    nome,
    email,
    cpf,
    telefone,
    dataNascimento
  }

  alunos.push(novoAluno)
  res.status(201).json(novoAluno)
})

// PUT - Atualizar aluno
router.put('/:id', (req, res) => {
  const aluno = alunos.find(a => a.id === parseInt(req.params.id))
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' })

  const { nome, email, cpf, telefone, dataNascimento } = req.body
  aluno.nome = nome || aluno.nome
  aluno.email = email || aluno.email
  aluno.cpf = cpf || aluno.cpf
  aluno.telefone = telefone || aluno.telefone
  aluno.dataNascimento = dataNascimento || aluno.dataNascimento

  res.json(aluno)
})

// DELETE - Deletar aluno
router.delete('/:id', (req, res) => {
  const index = alunos.findIndex(a => a.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Aluno não encontrado' })

  alunos.splice(index, 1)
  res.json({ message: 'Aluno removido com sucesso' })
})

module.exports = router