const username = "elsam1208";
const githubProjectsContainer = document.getElementById("github-projects");

async function fetchGitHubProjects() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated`
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar repositórios");
        }

        const repos = await response.json();

        githubProjectsContainer.innerHTML = "";

        repos.forEach(repo => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Projeto sem descrição"}</p>
                <p><strong>Linguagem:</strong> ${repo.language || "N/A"} | ⭐ ${repo.stargazers_count}</p>
                <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
            `;

            githubProjectsContainer.appendChild(card);
        });

    } catch (error) {
        githubProjectsContainer.innerHTML = `<p>Não foi possível carregar os projetos.</p>`;
        console.error(error);
    }
}

fetchGitHubProjects();
