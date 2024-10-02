// Função para observar mudanças no DOM e esperar os botões "Conectar" aparecerem
function waitForConnectButtons() {
    return new Promise((resolve) => {
        // Função para verificar se os botões "Conectar" estão na página
        function checkForConnectButtons() {
            const buttons = document.querySelectorAll('button');
            const connectButtons = Array.from(buttons).filter(button => button.innerText === 'Conectar');

            if (connectButtons.length > 0) {
                console.log(`Encontrados ${connectButtons.length} botões "Conectar".`);
                resolve(connectButtons);  // Resolve a promessa quando os botões forem encontrados
                return true;
            }
            return false;
        }

        // Tenta verificar se os botões já estão na página
        if (checkForConnectButtons()) {
            return;
        }

        // Se não houver botões "Conectar", cria um MutationObserver para monitorar o DOM
        const observer = new MutationObserver(() => {
            if (checkForConnectButtons()) {
                observer.disconnect();  // Para de observar quando os botões forem encontrados
            }
        });

        // Inicia a observação do corpo da página para mudanças
        observer.observe(document.body, { childList: true, subtree: true });
    });
}

// Função para clicar nos botões "Conectar" e "Enviar sem nota"
async function autoConnectOnPage() {
    // Espera até que os botões "Conectar" apareçam na página
    const connectButtons = await waitForConnectButtons();

    // Percorre os botões "Conectar" e clica em cada um
    for (let index = 0; index < connectButtons.length; index++) {
        const button = connectButtons[index];
        
        // Adiciona um pequeno atraso entre os cliques para evitar problemas de carregamento
        await new Promise(resolve => setTimeout(resolve, index * 3000)); // 3 segundos de atraso entre cliques
        button.click();
        console.log(`Cliquei no botão Conectar ${index + 1} de ${connectButtons.length}`);

        // Adiciona um atraso para garantir que o modal seja carregado antes de clicar no botão "Enviar sem nota"
        await new Promise(resolve => setTimeout(resolve, 1500));  // Espera 1.5 segundos antes de clicar no modal

        // Busca o botão "Enviar agora" ou "Enviar sem nota" no modal
        const sendButton = document.querySelector('button[aria-label="Enviar agora"], button[aria-label="Enviar sem nota"]');
        if (sendButton) {
            sendButton.click();
            console.log(`Cliquei no botão Enviar sem nota para a conexão ${index + 1}`);
        }

        // Adiciona um atraso após o envio para evitar sobrecarregar o sistema
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

// Função para navegar entre páginas (limitado a 50 páginas)
async function navigatePages() {
    let currentPage = 1;
    const totalPages = 50;  // Limite de 50 páginas

    // Função para clicar no número da próxima página
    async function goToNextPage() {
        const nextPageButton = document.querySelector(`button[aria-label="Página ${currentPage + 1}"]`);
        
        if (nextPageButton) {
            nextPageButton.click();
            console.log(`Navegando para a página ${currentPage + 1}`);
            currentPage++;
            return true;  // Retorna true indicando que há uma próxima página
        }
        return false;  // Retorna false se não houver mais páginas
    }

    // Executa o processo em cada página até atingir o limite de 50 páginas ou não houver mais páginas
    let hasNextPage = true;
    while (currentPage <= totalPages && hasNextPage) {
        await autoConnectOnPage();  // Conecta em todos na página atual
        hasNextPage = await goToNextPage();  // Navega para a próxima página
        await new Promise(resolve => setTimeout(resolve, 5000));  // Espera 5 segundos antes de prosseguir
    }

    console.log("Processo concluído. Processadas até 50 páginas.");
}

// Inicia o processo
navigatePages();