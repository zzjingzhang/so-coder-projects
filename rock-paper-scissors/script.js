document.addEventListener('DOMContentLoaded', function() {
    // 游戏状态
    const gameState = {
        playerScore: 0,
        computerScore: 0,
        choices: ['rock', 'paper', 'scissors'],
        isPlaying: false
    };

    // DOM元素
    const elements = {
        playerScoreEl: document.getElementById('player-score'),
        computerScoreEl: document.getElementById('computer-score'),
        choicesSection: document.getElementById('choices-section'),
        resultSection: document.getElementById('result-section'),
        resultText: document.getElementById('result-text'),
        playerChoiceIcon: document.getElementById('player-choice'),
        computerChoiceIcon: document.getElementById('computer-choice'),
        playAgainBtn: document.getElementById('play-again-btn'),
        gameCanvas: document.getElementById('game-canvas')
    };

    // Canvas上下文
    const canvas = elements.gameCanvas;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;

    // 初始化游戏
    function initGame() {
        setupEventListeners();
        setupCanvas();
        updateScoreDisplay();
    }

    // 设置事件监听器
    function setupEventListeners() {
        // 游戏选择按钮
        const choiceButtons = document.querySelectorAll('.choice-btn');
        choiceButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (!gameState.isPlaying) {
                    const playerChoice = this.getAttribute('data-choice');
                    playGame(playerChoice);
                }
            });
        });

        // 再玩一次按钮
        elements.playAgainBtn.addEventListener('click', resetGame);
    }

    // 设置Canvas
    function setupCanvas() {
        // 适配高DPI屏幕
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
    }

    // 粒子类
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 10 + 2;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * 6 - 3;
            this.color = color;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= this.decay;
            this.size *= 0.98;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // 创建粒子效果
    function createParticles(x, y, color, count = 50) {
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].alpha <= 0 || particles[i].size <= 0.5) {
                particles.splice(i, 1);
            }
        }
        
        if (particles.length > 0 || gameState.isPlaying) {
            animationId = requestAnimationFrame(animate);
        }
    }

    // 播放胜利动画
    function playWinAnimation() {
        const centerX = canvas.width / 2 / (window.devicePixelRatio || 1);
        const centerY = canvas.height / 2 / (window.devicePixelRatio || 1);
        
        // 创建多种颜色的粒子
        const colors = ['#2ecc71', '#27ae60', '#f1c40f', '#e67e22', '#3498db', '#9b59b6'];
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const color = colors[Math.floor(Math.random() * colors.length)];
                createParticles(centerX + (Math.random() - 0.5) * 200, 
                               centerY + (Math.random() - 0.5) * 200, 
                               color, 30);
            }, i * 100);
        }
        
        animate();
    }

    // 播放失败动画
    function playLoseAnimation() {
        const centerX = canvas.width / 2 / (window.devicePixelRatio || 1);
        const centerY = canvas.height / 2 / (window.devicePixelRatio || 1);
        
        // 创建红色和灰色的粒子
        const colors = ['#e74c3c', '#c0392b', '#95a5a6', '#7f8c8d'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const color = colors[Math.floor(Math.random() * colors.length)];
                createParticles(centerX + (Math.random() - 0.5) * 150, 
                               centerY + (Math.random() - 0.5) * 150, 
                               color, 20);
            }, i * 150);
        }
        
        animate();
    }

    // 播放平局动画
    function playDrawAnimation() {
        const centerX = canvas.width / 2 / (window.devicePixelRatio || 1);
        const centerY = canvas.height / 2 / (window.devicePixelRatio || 1);
        
        // 创建黄色和橙色的粒子
        const colors = ['#f39c12', '#e67e22', '#d35400', '#f1c40f'];
        
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const color = colors[Math.floor(Math.random() * colors.length)];
                createParticles(centerX + (Math.random() - 0.5) * 100, 
                               centerY + (Math.random() - 0.5) * 100, 
                               color, 15);
            }, i * 200);
        }
        
        animate();
    }

    // 开始游戏
    function playGame(playerChoice) {
        gameState.isPlaying = true;
        
        // 电脑随机选择
        const computerChoice = getComputerChoice();
        
        // 判定胜负
        const result = determineWinner(playerChoice, computerChoice);
        
        // 更新分数
        updateScore(result);
        
        // 显示结果
        showResult(playerChoice, computerChoice, result);
        
        // 播放动画
        playResultAnimation(result);
        
        gameState.isPlaying = false;
    }

    // 电脑随机选择
    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * gameState.choices.length);
        return gameState.choices[randomIndex];
    }

    // 判定胜负
    function determineWinner(player, computer) {
        if (player === computer) {
            return 'draw';
        }
        
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'win';
        }
        
        return 'lose';
    }

    // 更新分数
    function updateScore(result) {
        if (result === 'win') {
            gameState.playerScore++;
        } else if (result === 'lose') {
            gameState.computerScore++;
        }
        updateScoreDisplay();
    }

    // 更新分数显示
    function updateScoreDisplay() {
        elements.playerScoreEl.textContent = gameState.playerScore;
        elements.computerScoreEl.textContent = gameState.computerScore;
        
        // 添加分数更新动画
        elements.playerScoreEl.classList.add('fade-in');
        elements.computerScoreEl.classList.add('fade-in');
        
        setTimeout(() => {
            elements.playerScoreEl.classList.remove('fade-in');
            elements.computerScoreEl.classList.remove('fade-in');
        }, 500);
    }

    // 显示结果
    function showResult(playerChoice, computerChoice, result) {
        // 隐藏选择区域
        elements.choicesSection.style.display = 'none';
        
        // 设置选择图标
        const playerImg = elements.playerChoiceIcon.querySelector('img');
        const computerImg = elements.computerChoiceIcon.querySelector('img');
        
        playerImg.src = `assets/svg/${playerChoice}.svg`;
        computerImg.src = `assets/svg/${computerChoice}.svg`;
        
        // 设置结果文本
        let resultMessage = '';
        let resultClass = '';
        
        if (result === 'win') {
            resultMessage = '你赢了！';
            resultClass = 'win';
        } else if (result === 'lose') {
            resultMessage = '你输了！';
            resultClass = 'lose';
        } else {
            resultMessage = '平局！';
            resultClass = 'draw';
        }
        
        elements.resultText.textContent = resultMessage;
        elements.resultText.className = 'result-text ' + resultClass;
        
        // 添加获胜者动画
        elements.playerChoiceIcon.classList.remove('winner');
        elements.computerChoiceIcon.classList.remove('winner');
        
        if (result === 'win') {
            elements.playerChoiceIcon.classList.add('winner');
        } else if (result === 'lose') {
            elements.computerChoiceIcon.classList.add('winner');
        }
        
        // 显示结果区域并添加动画
        elements.resultSection.style.display = 'flex';
        elements.resultSection.classList.add('fade-in');
        
        // 为选择图标添加入场动画
        setTimeout(() => {
            elements.playerChoiceIcon.parentElement.classList.add('slide-in-left');
            elements.computerChoiceIcon.parentElement.classList.add('slide-in-right');
        }, 100);
    }

    // 播放结果动画
    function playResultAnimation(result) {
        if (result === 'win') {
            playWinAnimation();
        } else if (result === 'lose') {
            playLoseAnimation();
        } else {
            playDrawAnimation();
        }
    }

    // 重置游戏
    function resetGame() {
        // 停止动画
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        particles = [];
        
        // 清除Canvas
        ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
        
        // 移除动画类
        elements.resultSection.classList.remove('fade-in');
        elements.playerChoiceIcon.parentElement.classList.remove('slide-in-left');
        elements.computerChoiceIcon.parentElement.classList.remove('slide-in-right');
        elements.playerChoiceIcon.classList.remove('winner');
        elements.computerChoiceIcon.classList.remove('winner');
        
        // 隐藏结果区域，显示选择区域
        elements.resultSection.style.display = 'none';
        elements.choicesSection.style.display = 'flex';
        
        // 为选择区域添加淡入动画
        elements.choicesSection.classList.add('fade-in');
        setTimeout(() => {
            elements.choicesSection.classList.remove('fade-in');
        }, 500);
    }

    // 窗口大小改变时重新设置Canvas
    window.addEventListener('resize', function() {
        setupCanvas();
    });

    // 初始化游戏
    initGame();

    // 游戏API（可通过控制台访问）
    window.gameAPI = {
        getScore: function() {
            return {
                player: gameState.playerScore,
                computer: gameState.computerScore
            };
        },
        resetScore: function() {
            gameState.playerScore = 0;
            gameState.computerScore = 0;
            updateScoreDisplay();
            console.log('分数已重置');
        },
        play: function(choice) {
            if (['rock', 'paper', 'scissors'].includes(choice) && !gameState.isPlaying) {
                playGame(choice);
            } else {
                console.error('无效的选择，请使用: rock, paper, 或 scissors');
            }
        }
    };

    console.log('石头剪子布游戏已加载！使用 gameAPI 对象可以通过控制台控制游戏。');
    console.log('例如: gameAPI.play("rock") 或 gameAPI.resetScore()');
});