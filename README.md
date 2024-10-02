## LinkedIn Script

## Descrição
O **LinkedIn Script** é um script automatizado em **JavaScript** que facilita o envio de solicitações de conexão no LinkedIn. Ele navega pelas páginas de resultados de pesquisa ou sugestões de conexão, encontra os botões de "Conectar", e os clica automaticamente. O script também pode enviar convites sem nota adicional de forma contínua até o limite de 50 páginas.

## Funcionalidades
- **Envio Automático de Conexões:** O script identifica e clica nos botões "Conectar" nas páginas do LinkedIn.
- **Envio Sem Nota:** Após clicar em "Conectar", o script também localiza o botão para enviar a solicitação sem uma nota.
- **Navegação Automática:** Ele pode navegar por até 50 páginas de resultados, enviando solicitações de conexão em cada uma.
- **Atraso Controlado:** Intervalos de tempo entre os cliques e entre as páginas para evitar problemas de sobrecarga e garantir que a página e modais carreguem corretamente.

## Utilização
1. Copie o código para utilizar.
2. Abra o LinkedIn no seu navegador.
3. Acesse a página de resultados de pesquisa ou sugestões de pessoas para se conectar.
4. Abra o console de desenvolvedor no seu navegador:
   - **Chrome**: `Ctrl + Shift + J` ou `Cmd + Option + J` no Mac.
   - **Firefox**: `Ctrl + Shift + K` ou `Cmd + Option + K` no Mac.
5. Cole o código do script no console e pressione **Enter** para iniciar.

## Execução do Script
- O script irá:
  1. Detectar automaticamente os botões "Conectar".
  2. Clicar em cada botão "Conectar" da página atual.
  3. Enviar a solicitação sem nota adicional.
  4. Navegar para a próxima página, repetindo o processo por até 50 páginas.

## Tecnologias Utilizadas
- **JavaScript**: Linguagem usada para criar o script e manipular o DOM.
- **MutationObserver**: Para monitorar mudanças no DOM e detectar quando os botões "Conectar" aparecem na página.
- **Promises e Async/Await**: Para garantir que as ações no script ocorram em uma sequência controlada, com atrasos apropriados entre os cliques.