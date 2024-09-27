README - Pokémon Quiz Game
Descrição
O Pokémon Quiz Game é um jogo interativo onde os jogadores testam seus conhecimentos sobre Pokémon. O objetivo é adivinhar o Pokémon correto entre quatro opções apresentadas com base na imagem do Pokémon mostrado.

Funcionalidades
Login de Usuário: Os jogadores podem se identificar antes de começar o jogo.
Perguntas Aleatórias: O jogo faz perguntas sobre Pokémon, gerando opções aleatórias a partir da API do Pokémon.
Sistema de Pontuação e Nível: Os jogadores ganham pontos ao responder corretamente e podem subir de nível.
Temporizador: Cada pergunta tem um limite de tempo para responder.
Tabela de Classificação: Os jogadores podem visualizar suas pontuações e níveis após o término do jogo.
Tecnologias Utilizadas
HTML
CSS
JavaScript
Fetch API para acessar dados da PokeAPI
Estrutura do Código
Variáveis
correctPokemon: Armazena o Pokémon correto para a pergunta atual.
options: Array que contém as opções de resposta.
level: Nível do jogador, inicializado em 1.
score: Pontuação do jogador, inicializada em 0.
timer: Controla o temporizador da pergunta.
timeLimit: Limite de tempo para responder (15 segundos).
Principais Funções
getRandomPokemon(): Busca um Pokémon aleatório da API.
generateQuestion(): Gera uma nova pergunta com opções de resposta.
displayQuestion(): Exibe a imagem do Pokémon e as opções de resposta na tela.
startTimer(): Inicia o temporizador e atualiza a exibição do tempo restante.
checkAnswer(selected): Verifica se a resposta do jogador está correta e atualiza a pontuação e nível.
capitalizeFirstLetter(string): Capitaliza a primeira letra de uma string.
logout(): Registra o desempenho do jogador e exibe a tabela de classificação.
Instruções de Uso
Abra o arquivo HTML em um navegador.
Insira seu nome de usuário na área de login.
Clique no botão de login para iniciar o jogo.
Tente adivinhar o Pokémon correto dentro do tempo limite.
Após a última pergunta, visualize sua pontuação e nível na tabela de classificação.
Contribuições
Contribuições são bem-vindas! Se você deseja melhorar o jogo ou corrigir bugs, sinta-se à vontade para abrir uma pull request.

Licença
Este projeto é de código aberto e pode ser utilizado e modificado livremente.

