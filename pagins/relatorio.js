// relatorio.js - conecta frontend ao backend para relatório

document.getElementById('form-relatorio').addEventListener('submit', async function(e) {
  e.preventDefault();
  const inicio = document.getElementById('data-inicio').value;
  const fim = document.getElementById('data-fim').value;
  const tipo = document.getElementById('tipo').value;

  // Recupera token salvo (ajuste se o nome da chave for diferente)
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Você precisa estar logado para gerar relatórios.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/relatorios', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Erro ao buscar relatório');
    const dados = await response.json();
    // Aqui você pode filtrar os dados conforme o filtro do formulário
    // Exemplo: filtrar por data/tipo se os dados retornados tiverem esses campos
    // Atualiza a tabela
    const tbody = document.querySelector('#tabela-relatorio tbody');
    tbody.innerHTML = '';
    if (!dados.producoes || dados.producoes.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">Nenhum dado encontrado para o filtro selecionado.</td></tr>';
    } else {
      dados.producoes.forEach(item => {
        // Ajuste os campos conforme o backend
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${item.data || ''}</td><td>${item.produto || ''}</td><td>${item.tipo || ''}</td><td>${item.quantidade || ''}</td><td>${item.responsavel || ''}</td>`;
        tbody.appendChild(tr);
      });
    }
  } catch (err) {
    alert('Erro ao gerar relatório: ' + err.message);
  }
});
