const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Arquivo para armazenar IPs
const IP_FILE = 'visitas.json';

// Função para carregar IPs armazenados
function carregarIPs() {
    if (fs.existsSync(IP_FILE)) {
        return JSON.parse(fs.readFileSync(IP_FILE, 'utf8'));
    }
    return [];
}

// Função para salvar IPs atualizados
function salvarIPs(ips) {
    fs.writeFileSync(IP_FILE, JSON.stringify(ips));
}

// Middleware para contar visitas
app.use((req, res, next) => {
    let ips = carregarIPs();
    const ipUsuario = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (!ips.includes(ipUsuario)) {
        ips.push(ipUsuario);
        salvarIPs(ips);
    }

    res.locals.visitas = ips.length;
    next();
});

// Servir arquivos estáticos
app.use(express.static('public'));

// Rota para retornar a contagem
app.get('/contagem', (req, res) => {
    res.json({ visitas: res.locals.visitas });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
