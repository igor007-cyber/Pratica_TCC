// Função para buscar a contagem do servidor e exibir no elemento h3
fetch('/contagem')
    .then(response => response.json())
    .then(data => {
        document.getElementById('contagem').innerText = `Número de pessoas que cairam no teste: ${data.visitas}`;
    })
    .catch(error => {
        console.error('Erro ao buscar contagem:', error);
        document.getElementById('contagem').innerText = 'Erro ao carregar visitas.';
    });
