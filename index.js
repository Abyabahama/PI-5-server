const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql')


app.use(cors())

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pck2301',
  database: 'meu_banco'
}); 

app.use(bodyParser.json());

// >> INSERINDO DADOS - adaptado para a tabela aplicador_PJ
app.post('/aplicador/pj/cadastro', (req, res) => {
  // Extrai os dados do corpo da requisição 
  const {
    RG, nome, nacionalidade, estCivil, profissao, CPF, email,
    endereco, cidade, telefone, UF, curriculo, URL, linkedin, 
    portfolio, lattes, valor, empresa, CNPJ, CNAE, 
    nomeResponsavel, emailResponsavel, CPFResponsavel
  } = req.body; 
  // Validação para garantir que os campos obrigatórios estejam preenchidos
  if (!RG || !nome || !CPF) {
    return res.status(400).json({ error: 'Os campos RG, Nome e CPF são obrigatórios.' });
  }
  const sql = `REPLACE INTO aplicador_PJ (RG, Nome, Nacionalidade, EstCivil, Profissao, CPF, Email, Endereco, Cidade, Telefone, UF, Curriculo, URL, Linkedin, Portfolio, Lattes, Valor, Empresa, CNPJ, CNAE, NomeResponsavel, EmailResponsavel, CPFResponsavel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  // Array de valores para preencher os placeholders no comando SQL
  const values = [
    RG, nome, nacionalidade, estCivil, profissao, CPF, email,
    endereco, cidade, telefone, UF, curriculo, URL, linkedin, 
    portfolio, lattes, valor, empresa, CNPJ, CNAE, 
    nomeResponsavel, emailResponsavel, CPFResponsavel
  ];
  // Executando o SQL
  db.query(sql, values, (err, results) => {
    if (err) { 
      console.error('Erro ao inserir dados:', err);
  
      return res.status(500).json({ error: 'Erro ao inserir dados.' });
    }

    return res.status(201).json({ message: 'Dados inseridos com sucesso!' });
    
  }); 
});

app.post('/aplicador/rpa/cadastro', (req, res) => {
    // Extrai os dados do corpo da requisição 
    const {
      RG, nome, nacionalidade, estCivil, profissao, CPF, email,
      endereco, cidade, telefone, UF, curriculo, URL, linkedin, 
      portfolio, lattes
    } = req.body; 
    // Validação para garantir que os campos obrigatórios estejam preenchidos
    if (!RG || !nome || !CPF) {
      return res.status(400).json({ error: 'Os campos RG, Nome e CPF são obrigatórios.' });
    }
    const sql = `REPLACE INTO aplicador_rpa (RG, Nome, Nacionalidade, EstCivil, Profissao, CPF, Email, Endereco, Cidade, Telefone, UF, Curriculo, URL, Linkedin, Portfolio, Lattes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    // Array de valores para preencher os placeholders no comando SQL
    const values = [
      RG, nome, nacionalidade, estCivil, profissao, CPF, email,
      endereco, cidade, telefone, UF, curriculo, URL, linkedin, 
      portfolio, lattes
    ];
    // Executando o SQL
    db.query(sql, values, (err, results) => {
      if (err) { 
        console.error('Erro ao inserir dados:', err);
    
        return res.status(500).json({ error: 'Erro ao inserir dados.' });
      }
  
      return res.status(201).json({ message: 'Dados inseridos com sucesso!' });
      
    }); 
})

app.post('/aplicador/imt/cadastro', (req, res) => {
  // Extrai os dados do corpo da requisição 
  const {
    RG, email
  } = req.body; 
  // Validação para garantir que os campos obrigatórios estejam preenchidos
  if (!RG || !email) {
    return res.status(400).json({ error: 'Os campos RG e E-mail são brigatorios' });
  }
  const sql = `REPLACE INTO aplicador_maua (RG, Email) VALUES (?, ?)`
  // Array de valores para preencher os placeholders no comando SQL
  const values = [
    RG, email
  ];
  // Executando o SQL
  db.query(sql, values, (err, results) => {
    if (err) { 
      console.error('Erro ao inserir dados:', err);
  
      return res.status(500).json({ error: 'Erro ao inserir dados.' });
    }

    return res.status(201).json({ message: 'Dados inseridos com sucesso!' });
    
  }); 
})
 
app.listen(4000, () => {
  console.log("Aplicadores. Porta 4000")
})  