// cadastro.js - conecta o formulário de cadastro ao backend

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // O backend espera apenas nome, email, senha (e talvez role)
  // Aqui vamos juntar nome e sobrenome para enviar como nome completo
  const payload = {
    nome: nome + " " + sobrenome,
    email,
    senha,
  };

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      window.location.href = "login.html";
    } else {
      alert(data.msg || "Erro ao cadastrar usuário.");
    }
  } catch (err) {
    alert("Erro ao conectar ao servidor: " + err.message);
  }
});
