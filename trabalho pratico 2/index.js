document.addEventListener('DOMContentLoaded', () => {
    carregarConteudoSugerido();
    carregarColegasTrabalho();
    carregarPerfilGitHub();
    carregarRepositoriosGitHub();
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
        const response = await fetch('https://c51bc587-35be-4d8f-859d-bd47fa6d52a0-00-1vehhynfpbfzl.picard.replit.dev/conteudos');
        if (!response.ok) {
            throw new Error('Não foi possível obter os conteúdos sugeridos');
        }
        const data = await response.json();
        const conteudosCarousel = data.map(conteudo => `
                <div class="slide slide_1">
                    <div class="slide-content">
                        <iframe width="914" height="514" src="${conteudo.videos}" title="COMO EU COMEÇARIA HOJE NA PROGRAMAÇÃO. MUDE ISSO AGORA!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
        `).join('');
        document.getElementById('carousel-content').innerHTML = conteudosCarousel;
        document.querySelector('.slide_1').classList.add('active');
    } catch (error) {
        console.error('Erro ao carregar conteúdo sugerido:', error.message);
    }
}

async function carregarColegasTrabalho() {
    try {
        const response = await fetch('https://c51bc587-35be-4d8f-859d-bd47fa6d52a0-00-1vehhynfpbfzl.picard.replit.dev/colegas');
        if (!response.ok) {
            throw new Error('Não foi possível obter os colegas de trabalho');
        }
        const data = await response.json();
        const colegasCards = data.map(colega => `
            <div class="col-md-3 col-sm-6 mb-4 mx-5">
                <div class="card h-100">
                    <img src="${colega.imagem}" alt="${colega.nome}" />
                    <div class="card__content">
                        <p class="card__title">${colega.nome}</p>
                        <a href="${colega.github}" class="card__title">Perfil No GitHub</a>
                        <p class="card__description">Perfis</p>
                    </div>
                </div>
            </div>
        `).join('');
        document.getElementById('colegas-grid').innerHTML = colegasCards;
    } catch (error) {
        console.error('Erro ao carregar colegas de trabalho:', error.message);
    }
}
