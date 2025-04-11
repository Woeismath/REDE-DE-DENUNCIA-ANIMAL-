function showPage(page) {
  let content = '';
  switch (page) {
    case 'denuncia':
      content = `
        <section class="formulario">
          <h2>Formulário de Denúncia</h2>
          <p>Use o formulário abaixo para relatar casos de maus tratos aos animais.</p>
          <form id="denuncia-form">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required>
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" required>
            <label for="mensagem">Mensagem:</label>
            <textarea id="mensagem" name="mensagem" rows="5" required></textarea>
            <button type="submit">ENVIAR</button>
          </form>
          <p id="mensagem-status" style="margin-top: 15px;"></p>
        </section>
      `;
      break;
    case 'leis':
      content = `<section class="leis"><h2>Leis de Proteção Animal</h2><p>Aqui você pode ver as leis locais e nacionais relacionadas à proteção animal.</p><a href="https://www.gov.br/pt-br" target="_blank">Acesse as leis nacionais aqui.</a></section>`;
      break;
    case 'organizacoes':
      content = `<section class="organizacoes"><h2>Organizações de Resgate</h2><p>Encontre abrigos e organizações de resgate de animais na sua área.</p><a href="https://www.abrigos.org.br" target="_blank">Encontre organizações aqui.</a></section>`;
      break;
    default:
      content = `<p>Seção não encontrada.</p>`;
      break;
  }

  document.getElementById('main-content').innerHTML = content;

  if (page === 'denuncia') {
    document.getElementById('denuncia-form').addEventListener('submit', async function (e) {
      e.preventDefault();
      let nome = document.getElementById('nome').value;
      let email = document.getElementById('email').value;
      let mensagem = document.getElementById('mensagem').value;

      try {
        const response = await fetch('/enviar-denuncia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, mensagem })
        });

        const statusText = document.getElementById('mensagem-status');
        if (response.ok) {
          statusText.style.color = 'green';
          statusText.innerText = 'Denúncia enviada com sucesso!';
          document.getElementById('denuncia-form').reset();
        } else {
          statusText.style.color = 'red';
          statusText.innerText = 'Erro ao enviar denúncia. Tente novamente.';
        }
      } catch (error) {
        console.error(error);
        const statusText = document.getElementById('mensagem-status');
        statusText.style.color = 'red';
        statusText.innerText = 'Erro ao conectar com o servidor.';
      }
    });
  }
}

window.onload = function () {
  showPage('denuncia');
};
