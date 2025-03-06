// Variável para armazenar a pontuação do usuário
let pontos = 0;

// Dados fictícios do ranking (serão substituídos por dados reais do backend)
const ranking = [
    { nome: "Andre Dornelas", pontos: 1500 },
    { nome: "Gabriel Silva", pontos: 1200 },
    { nome: "Gilvan Daniel", pontos: 1000 },
    { nome: "Oscar Alho", pontos: 800 },
    { nome: "Paula Tejano", pontos: 500 },
];

// Função para registrar litros reciclados
document.getElementById('form-pontuacao').addEventListener('submit', function (event) {
    event.preventDefault();
    const litros = parseInt(document.getElementById('litros').value);
    pontos += litros;
    document.getElementById('total-pontos').textContent = `Total de pontos: ${pontos}`;
    alert(`${litros} litros registrados!`);
});

// Função para enviar denúncias
document.getElementById('form-denuncia').addEventListener('submit', function (event) {
    event.preventDefault();
    const localizacao = document.getElementById('localizacao').value;
    const descricao = document.getElementById('descricao').value;
    alert(`Denúncia enviada!\nLocalização: ${localizacao}\nDescrição: ${descricao}`);
});

// Função para exibir o ranking
function exibirRanking() {
    const tbody = document.querySelector('#tabela-ranking tbody');
    tbody.innerHTML = '';

    ranking.sort((a, b) => b.pontos - a.pontos); // Ordena por pontos (decrescente)

    ranking.forEach((usuario, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.pontos}</td>
        `;
        tbody.appendChild(row);
    });
}

// Exibir o ranking ao carregar a página
document.addEventListener('DOMContentLoaded', exibirRanking);


function initMap() {
    // Coordenadas de Manaus
    const manaus = { lat: -3.119027, lng: -60.021731 };

    // Cria o mapa
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: manaus,
    });

    // Marcadores das empresas
    const empresas = [
        { nome: 'EcoEntulho', lat: -3.119027, lng: -60.021731 },
        { nome: 'PilhasVerdes', lat: -3.110000, lng: -60.030000 },
        { nome: 'TechRecicla', lat: -3.125000, lng: -60.015000 },
    ];

    // Adiciona os marcadores ao mapa
    empresas.forEach(empresa => {
        new google.maps.Marker({
            position: { lat: empresa.lat, lng: empresa.lng },
            map: map,
            title: empresa.nome,
        });
    });
}


function ordenarRanking() {
    const tbody = document.querySelector('#tabela-ranking tbody');
    const linhas = Array.from(tbody.querySelectorAll('tr'));

    linhas.sort((a, b) => {
        const pontosA = parseInt(a.querySelector('td:nth-child(3)').textContent);
        const pontosB = parseInt(b.querySelector('td:nth-child(3)').textContent);
        return pontosB - pontosA; // Ordena do maior para o menor
    });

    tbody.innerHTML = '';
    linhas.forEach(linha => tbody.appendChild(linha));
}

// Exibir o ranking ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    exibirRanking();
    ordenarRanking();
});

// Função para exibir mensagens de feedback
function exibirMensagem(mensagem, tipo = 'sucesso') {
    const divMensagem = document.createElement('div');
    divMensagem.className = `mensagem ${tipo}`;
    divMensagem.textContent = mensagem;

    document.body.appendChild(divMensagem);

    setTimeout(() => {
        divMensagem.remove();
    }, 3000);
}

// Exemplo de uso no formulário de pontuação
document.getElementById('form-pontuacao').addEventListener('submit', function (event) {
    event.preventDefault();

    const litros = parseInt(document.getElementById('litros').value);

    if (isNaN(litros)) {
        exibirMensagem('Por favor, insira um número válido.', 'erro');
        return;
    }

    pontos += litros;
    document.getElementById('total-pontos').textContent = `Total de pontos: ${pontos}`;
    exibirMensagem(`${litros} litros registrados!`, 'sucesso');
    document.getElementById('litros').value = '';
});