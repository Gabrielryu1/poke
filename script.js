let correctPokemon;
let options = [];
let level = 1;
let score = 0;
let timer;
const timeLimit = 15;

// Área do jogo 
document.getElementById('loginButton').onclick = () => {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        document.getElementById('loginArea').style.display = 'none';
        document.getElementById('gameArea').style.display = 'block';
        document.getElementById('levelDisplay').innerText = level;
        document.getElementById('scoreDisplay').innerText = score;
        generateQuestion();
    }
};

// Obter um Pokémon aleatório da API
async function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 150) + 1;
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) throw new Error('Erro na resposta da API');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
        alert('Houve um problema ao buscar o Pokémon. Tente novamente.');
        return null;
    }
}

// Gera uma nova pergunta
async function generateQuestion() {
    options = [];
    correctPokemon = await getRandomPokemon();
    if (!correctPokemon) return;

    options.push(correctPokemon);

    while (options.length < 4) {
        const randomPokemon = await getRandomPokemon();
        if (randomPokemon && !options.some(option => option.name === randomPokemon.name)) {
            options.push(randomPokemon);
        }
    }

    options.sort(() => Math.random() - 0.5);
    displayQuestion();
    startTimer();
}

// Exibe a pergunta e as opções
function displayQuestion() {
    const pokemonImage = document.getElementById('pokemonImage');
    pokemonImage.src = correctPokemon.sprites.front_default;
    pokemonImage.style.display = 'block';

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = capitalizeFirstLetter(option.name);
        button.classList.add('btn', 'btn-pokemon');
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });

    document.getElementById('result').innerHTML = '';
}

// Inicia o temporizador
function startTimer() {
    let timeRemaining = timeLimit;
    const timerDiv = document.getElementById('timer');
    timerDiv.innerHTML = `Tempo restante: ${timeRemaining} segundos`;

    timer = setInterval(() => {
        timeRemaining--;
        timerDiv.innerHTML = `Tempo restante: ${timeRemaining} segundos`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            checkAnswer(null);
        }
    }, 1000);
}

// Verifica a resposta do jogador
function checkAnswer(selected) {
    clearInterval(timer);
    const resultDiv = document.getElementById('result');

    if (selected && selected.name === correctPokemon.name) {
        score++;
        resultDiv.innerHTML = `<p>Correto!</p>`;
    } else {
        resultDiv.innerHTML = `<p>Incorreto! O Pokémon era ${capitalizeFirstLetter(correctPokemon.name)}.</p>`;
    }

    // Atualiza a barra de nível
    if (score % 5 === 0) {
        level++;
        resultDiv.innerHTML += `<p>Você subiu para o nível ${level}!</p>`;
    }

    // Atualiza exibições
    document.getElementById('levelDisplay').innerText = level;
    document.getElementById('scoreDisplay').innerText = score;
    document.getElementById('currentLevelBar').style.width = `${(level / 10) * 100}%`; 

    localStorage.setItem('score', score);
    localStorage.setItem('level', level);

    document.getElementById('nextButton').style.display = 'block';
}

// Inicia a próxima pergunta
document.getElementById('nextButton').onclick = () => {
    document.getElementById('result').innerHTML = '';
    document.getElementById('nextButton').style.display = 'none';
    generateQuestion();
};


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//  funcionalidade de sair
document.getElementById('logoutButton').onclick = () => {
    const username = localStorage.getItem('username');
    const userScore = score;
    const userLevel = level;

    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ username, score: userScore, level: userLevel });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Exibir a tabela de resultados
    const leaderboardTable = document.getElementById('leaderboardTable');
    leaderboardTable.style.display = 'table';
    leaderboard.forEach(entry => {
        const row = leaderboardTable.insertRow();
        row.insertCell(0).innerText = entry.username;
        row.insertCell(1).innerText = entry.score;
        row.insertCell(2).innerText = entry.level;
    });

    alert(`Obrigado por jogar, ${username}! Sua pontuação: ${userScore}, Nível: ${userLevel}`);
    localStorage.removeItem('username');
    location.reload();
};
