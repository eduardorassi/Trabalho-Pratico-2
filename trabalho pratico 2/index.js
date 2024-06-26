document.addEventListener('DOMContentLoaded', () => {
    carregarPerfilGitHub();
    carregarRepositoriosGitHub();
    carregarConteudoSugerido();
    carregarColegasTrabalho();
});

async function carregarPerfilGitHub() {
    try {
        const response = await fetch('https://api.github.com/users/eduardorassi');
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados do perfil do GitHub');
        }
        const data = await response.json();
        const perfilUsuario = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${data.avatar_url}" class="img-fluid rounded-circle mb-3" alt="Avatar">
                </div>
                <div class="col-md-8">
                    <h3>${data.name}</h3>
                    <p>${data.bio}</p>
                    <p>
                        <a href="mailto:${data.email}" class="me-3"><i class="bi bi-envelope"></i></a>
                        <a href="${data.html_url}" target="_blank"><i class="bi bi-github"></i></a>
                        <!-- Adicionar outros links conforme necessário, por exemplo: -->
                        <!-- <a href="${data.linkedin_url}" target="_blank"><i class="bi bi-linkedin"></i></a> -->
                    </p>
                </div>
            </div>
        `;
        document.getElementById('perfil').innerHTML = perfilUsuario;
    } catch (error) {
        console.error('Erro ao carregar perfil do GitHub:', error.message);
    }
}

async function carregarRepositoriosGitHub() {
    try {
        const response = await fetch('https://api.github.com/users/eduardorassi/repos');
        if (!response.ok) {
            throw new Error('Não foi possível obter os repositórios do GitHub');
        }
        const data = await response.json();
        const repoCards = data.slice(0, 3).map(repo => `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text">${repo.description}</p>
                        <a href="repo.html?id=${repo.id}" class="btn btn-primary">Detalhes</a>
                    </div>
                </div>
            </div>
        `).join('');
        document.getElementById('repo-cards').innerHTML = repoCards;
    } catch (error) {
        console.error('Erro ao carregar repositórios do GitHub:', error.message);
    }
}

async function carregarConteudoSugerido() {
    try {
        const response = await fetch('http://localhost:3000/conteudosSugeridos');
        if (!response.ok) {
            throw new Error('Não foi possível obter os conteúdos sugeridos');
        }
        const data = await response.json();
        const conteudosCarousel = data.map(conteudo => `
            <div class="carousel-item">
                <a href="${conteudo.urlConteudo}" target="_blank">
                    <img src="${conteudo.urlImagem}" class="d-block w-100" alt="${conteudo.titulo}">
                </a>
                <div class="carousel-caption d-none d-md-block">
                    <h5>${conteudo.titulo}</h5>
                    <p>${conteudo.descricao}</p>
                </div>
            </div>
        `).join('');
        document.getElementById('carousel-content').innerHTML = conteudosCarousel;
        document.querySelector('.carousel-item').classList.add('active');
    } catch (error) {
        console.error('Erro ao carregar conteúdo sugerido:', error.message);
    }
}

async function carregarColegasTrabalho() {
    try {
        const response = await fetch('http://localhost:3000/colegasTrabalho');
        if (!response.ok) {
            throw new Error('Não foi possível obter os colegas de trabalho');
        }
        const data = await response.json();
        const colegasCards = data.map(colega => `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${colega.urlFoto}" class="card-img-top" alt="${colega.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${colega.nome}</h5>
                        <a href="${colega.urlGitHub}" class="btn btn-primary" target="_blank">Perfil GitHub</a>
                    </div>
                </div>
            </div>
        `).join('');
        document.getElementById('colegas-grid').innerHTML = colegasCards;
    } catch (error) {
        console.error('Erro ao carregar colegas de trabalho:', error.message);
    }
}
