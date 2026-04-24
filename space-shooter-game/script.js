class SpaceShooter {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.gameState = 'start';
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        
        this.player = {
            x: 0,
            y: 0,
            width: 50,
            height: 60,
            speed: 8,
            invincible: false,
            invincibleTime: 0
        };
        
        this.bullets = [];
        this.enemies = [];
        this.explosions = [];
        this.powerUps = [];
        this.stars = [];
        this.enemyBullets = [];
        
        this.keys = {};
        this.touchControls = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        
        this.shootTimer = 0;
        this.enemySpawnTimer = 0;
        this.powerUpTimer = 0;
        this.lastTime = 0;
        
        this.powerUpActive = {
            rapidFire: false,
            wideShot: false,
            shield: false,
            powerUpTime: 0
        };
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createStars();
        this.bindEvents();
        this.gameLoop(0);
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const header = document.querySelector('.game-header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        const maxWidth = Math.min(window.innerWidth, 600);
        const maxHeight = Math.min(window.innerHeight - headerHeight - 20, 800);
        
        this.canvas.width = maxWidth;
        this.canvas.height = maxHeight;
        
        this.player.x = this.canvas.width / 2 - this.player.width / 2;
        this.player.y = this.canvas.height - this.player.height - 20;
        
        this.updateStars();
    }
    
    createStars() {
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    updateStars() {
        this.stars.forEach(star => {
            star.x = Math.random() * this.canvas.width;
        });
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Escape' && this.gameState === 'playing') {
                this.pauseGame();
            } else if (e.code === 'Escape' && this.gameState === 'paused') {
                this.resumeGame();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.gameState === 'playing') {
                const rect = this.canvas.getBoundingClientRect();
                const scaleX = this.canvas.width / rect.width;
                const scaleY = this.canvas.height / rect.height;
                
                this.player.x = (e.clientX - rect.left) * scaleX - this.player.width / 2;
                this.player.y = (e.clientY - rect.top) * scaleY - this.player.height / 2;
            }
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.gameState === 'playing' && e.touches.length > 0) {
                const rect = this.canvas.getBoundingClientRect();
                const scaleX = this.canvas.width / rect.width;
                const scaleY = this.canvas.height / rect.height;
                
                this.player.x = (e.touches[0].clientX - rect.left) * scaleX - this.player.width / 2;
                this.player.y = (e.touches[0].clientY - rect.top) * scaleY - this.player.height / 2;
            }
        }, { passive: false });
        
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('restartBtn').addEventListener('click', () => this.startGame());
        document.getElementById('resumeBtn').addEventListener('click', () => this.resumeGame());
        
        this.setupMobileControls();
    }
    
    setupMobileControls() {
        const controls = ['up', 'down', 'left', 'right'];
        controls.forEach(dir => {
            const btn = document.getElementById(`${dir}Btn`);
            if (btn) {
                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.touchControls[dir] = true;
                }, { passive: false });
                
                btn.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this.touchControls[dir] = false;
                }, { passive: false });
            }
        });
    }
    
    startGame() {
        this.gameState = 'playing';
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        
        this.player.x = this.canvas.width / 2 - this.player.width / 2;
        this.player.y = this.canvas.height - this.player.height - 20;
        this.player.invincible = false;
        
        this.bullets = [];
        this.enemies = [];
        this.explosions = [];
        this.powerUps = [];
        this.enemyBullets = [];
        
        this.powerUpActive = {
            rapidFire: false,
            wideShot: false,
            shield: false,
            powerUpTime: 0
        };
        
        this.updateUI();
        this.hideOverlay();
    }
    
    pauseGame() {
        this.gameState = 'paused';
        document.getElementById('pauseScreen').style.display = 'flex';
    }
    
    resumeGame() {
        this.gameState = 'playing';
        document.getElementById('pauseScreen').style.display = 'none';
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        document.getElementById('gameOverScreen').style.display = 'flex';
    }
    
    hideOverlay() {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('pauseScreen').style.display = 'none';
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        
        let livesHtml = '';
        for (let i = 0; i < this.lives; i++) {
            livesHtml += '❤';
        }
        document.getElementById('lives').textContent = livesHtml || '💔';
    }
    
    update(deltaTime) {
        if (this.gameState !== 'playing') return;
        
        this.updatePlayer();
        this.updateBullets();
        this.updateEnemies();
        this.updateEnemyBullets();
        this.updateExplosions();
        this.updatePowerUps();
        this.updateStars();
        this.checkCollisions();
        this.checkLevelUp();
        
        this.shootTimer += deltaTime;
        const shootInterval = this.powerUpActive.rapidFire ? 80 : 200;
        if (this.shootTimer > shootInterval) {
            this.shoot();
            this.shootTimer = 0;
        }
        
        this.enemySpawnTimer += deltaTime;
        const spawnInterval = Math.max(500, 2000 - this.level * 100);
        if (this.enemySpawnTimer > spawnInterval) {
            this.spawnEnemy();
            this.enemySpawnTimer = 0;
        }
        
        this.powerUpTimer += deltaTime;
        if (this.powerUpTimer > 10000) {
            this.spawnPowerUp();
            this.powerUpTimer = 0;
        }
        
        if (this.powerUpActive.powerUpTime > 0) {
            this.powerUpActive.powerUpTime -= deltaTime;
            if (this.powerUpActive.powerUpTime <= 0) {
                this.powerUpActive.rapidFire = false;
                this.powerUpActive.wideShot = false;
                this.powerUpActive.shield = false;
            }
        }
        
        if (this.player.invincible) {
            this.player.invincibleTime -= deltaTime;
            if (this.player.invincibleTime <= 0) {
                this.player.invincible = false;
            }
        }
    }
    
    updatePlayer() {
        let moveX = 0;
        let moveY = 0;
        
        if (this.keys['ArrowLeft'] || this.touchControls.left) moveX -= 1;
        if (this.keys['ArrowRight'] || this.touchControls.right) moveX += 1;
        if (this.keys['ArrowUp'] || this.touchControls.up) moveY -= 1;
        if (this.keys['ArrowDown'] || this.touchControls.down) moveY += 1;
        
        if (moveX !== 0 && moveY !== 0) {
            moveX *= 0.707;
            moveY *= 0.707;
        }
        
        this.player.x += moveX * this.player.speed;
        this.player.y += moveY * this.player.speed;
        
        this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.width, this.player.x));
        this.player.y = Math.max(0, Math.min(this.canvas.height - this.player.height, this.player.y));
    }
    
    shoot() {
        const bulletSpeed = -12;
        const centerX = this.player.x + this.player.width / 2;
        const topY = this.player.y;
        
        if (this.powerUpActive.wideShot) {
            this.bullets.push({
                x: centerX - 15,
                y: topY,
                width: 6,
                height: 20,
                speed: bulletSpeed,
                dx: -2
            });
            this.bullets.push({
                x: centerX - 3,
                y: topY,
                width: 6,
                height: 20,
                speed: bulletSpeed,
                dx: 0
            });
            this.bullets.push({
                x: centerX + 9,
                y: topY,
                width: 6,
                height: 20,
                speed: bulletSpeed,
                dx: 2
            });
        } else {
            this.bullets.push({
                x: centerX - 3,
                y: topY,
                width: 6,
                height: 20,
                speed: bulletSpeed,
                dx: 0
            });
        }
    }
    
    spawnEnemy() {
        const types = ['normal', 'fast', 'big'];
        const type = types[Math.floor(Math.random() * (this.level > 3 ? 3 : 2))];
        
        let enemy = {
            x: Math.random() * (this.canvas.width - 40),
            y: -50,
            type: type,
            shootTimer: 0
        };
        
        switch (type) {
            case 'normal':
                enemy.width = 40;
                enemy.height = 40;
                enemy.speed = 2 + this.level * 0.2;
                enemy.hp = 1;
                enemy.score = 10;
                enemy.color = '#ff6b6b';
                break;
            case 'fast':
                enemy.width = 30;
                enemy.height = 30;
                enemy.speed = 4 + this.level * 0.3;
                enemy.hp = 1;
                enemy.score = 15;
                enemy.color = '#feca57';
                break;
            case 'big':
                enemy.width = 60;
                enemy.height = 60;
                enemy.speed = 1 + this.level * 0.1;
                enemy.hp = 3;
                enemy.score = 30;
                enemy.color = '#ee5a24';
                break;
        }
        
        this.enemies.push(enemy);
    }
    
    spawnPowerUp() {
        const types = ['rapidFire', 'wideShot', 'shield', 'life'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        this.powerUps.push({
            x: Math.random() * (this.canvas.width - 30),
            y: -40,
            width: 30,
            height: 30,
            speed: 2,
            type: type
        });
    }
    
    updateBullets() {
        this.bullets = this.bullets.filter(bullet => {
            bullet.y += bullet.speed;
            bullet.x += bullet.dx || 0;
            return bullet.y > -bullet.height && 
                   bullet.x > -bullet.width && 
                   bullet.x < this.canvas.width;
        });
    }
    
    updateEnemies() {
        this.enemies = this.enemies.filter(enemy => {
            enemy.y += enemy.speed;
            enemy.shootTimer += 1;
            
            if (enemy.shootTimer > 60 && Math.random() < 0.02) {
                this.enemyBullets.push({
                    x: enemy.x + enemy.width / 2 - 3,
                    y: enemy.y + enemy.height,
                    width: 6,
                    height: 15,
                    speed: 5
                });
                enemy.shootTimer = 0;
            }
            
            if (enemy.y > this.canvas.height) {
                this.score = Math.max(0, this.score - 5);
                this.updateUI();
                return false;
            }
            return true;
        });
    }
    
    updateEnemyBullets() {
        this.enemyBullets = this.enemyBullets.filter(bullet => {
            bullet.y += bullet.speed;
            return bullet.y < this.canvas.height;
        });
    }
    
    updateExplosions() {
        this.explosions = this.explosions.filter(explosion => {
            explosion.frame++;
            explosion.radius += 2;
            explosion.opacity -= 0.05;
            return explosion.opacity > 0;
        });
    }
    
    updatePowerUps() {
        this.powerUps = this.powerUps.filter(powerUp => {
            powerUp.y += powerUp.speed;
            return powerUp.y < this.canvas.height;
        });
    }
    
    createExplosion(x, y, color = '#ffcc00') {
        this.explosions.push({
            x: x,
            y: y,
            radius: 5,
            frame: 0,
            opacity: 1,
            color: color
        });
        
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            this.explosions.push({
                x: x + Math.cos(angle) * 10,
                y: y + Math.sin(angle) * 10,
                radius: 3,
                frame: 0,
                opacity: 0.8,
                color: color
            });
        }
    }
    
    checkCollisions() {
        this.bullets.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (this.isColliding(bullet, enemy)) {
                    this.bullets.splice(bulletIndex, 1);
                    enemy.hp--;
                    
                    if (enemy.hp <= 0) {
                        this.createExplosion(
                            enemy.x + enemy.width / 2,
                            enemy.y + enemy.height / 2,
                            enemy.color
                        );
                        this.enemies.splice(enemyIndex, 1);
                        this.score += enemy.score;
                        this.updateUI();
                    }
                }
            });
        });
        
        if (!this.player.invincible) {
            this.enemies.forEach((enemy, index) => {
                if (this.isColliding(this.player, enemy)) {
                    if (this.powerUpActive.shield) {
                        this.powerUpActive.shield = false;
                        this.createExplosion(
                            enemy.x + enemy.width / 2,
                            enemy.y + enemy.height / 2,
                            enemy.color
                        );
                        this.enemies.splice(index, 1);
                    } else {
                        this.hitPlayer();
                    }
                }
            });
            
            this.enemyBullets.forEach((bullet, index) => {
                if (this.isColliding(this.player, bullet)) {
                    this.enemyBullets.splice(index, 1);
                    if (this.powerUpActive.shield) {
                        this.powerUpActive.shield = false;
                    } else {
                        this.hitPlayer();
                    }
                }
            });
        }
        
        this.powerUps.forEach((powerUp, index) => {
            if (this.isColliding(this.player, powerUp)) {
                this.activatePowerUp(powerUp.type);
                this.powerUps.splice(index, 1);
            }
        });
    }
    
    hitPlayer() {
        this.lives--;
        this.player.invincible = true;
        this.player.invincibleTime = 2000;
        this.updateUI();
        
        if (this.lives <= 0) {
            this.gameOver();
        }
    }
    
    activatePowerUp(type) {
        switch (type) {
            case 'rapidFire':
                this.powerUpActive.rapidFire = true;
                this.powerUpActive.powerUpTime = 8000;
                break;
            case 'wideShot':
                this.powerUpActive.wideShot = true;
                this.powerUpActive.powerUpTime = 8000;
                break;
            case 'shield':
                this.powerUpActive.shield = true;
                this.powerUpActive.powerUpTime = 10000;
                break;
            case 'life':
                if (this.lives < 5) {
                    this.lives++;
                    this.updateUI();
                }
                break;
        }
    }
    
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    checkLevelUp() {
        const newLevel = Math.floor(this.score / 200) + 1;
        if (newLevel > this.level && newLevel <= 10) {
            this.level = newLevel;
            this.updateUI();
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawStars();
        
        if (this.gameState === 'playing' || this.gameState === 'paused') {
            this.drawPowerUps();
            this.drawBullets();
            this.drawEnemies();
            this.drawEnemyBullets();
            this.drawPlayer();
            this.drawExplosions();
            this.drawPowerUpIndicators();
        }
    }
    
    drawStars() {
        this.stars.forEach(star => {
            star.y += star.speed;
            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }
            
            this.ctx.save();
            this.ctx.globalAlpha = star.opacity;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    drawPlayer() {
        this.ctx.save();
        
        if (this.player.invincible && Math.floor(Date.now() / 100) % 2 === 0) {
            this.ctx.globalAlpha = 0.5;
        }
        
        if (this.powerUpActive.shield) {
            this.ctx.beginPath();
            this.ctx.arc(
                this.player.x + this.player.width / 2,
                this.player.y + this.player.height / 2,
                this.player.width * 0.7,
                0,
                Math.PI * 2
            );
            this.ctx.strokeStyle = 'rgba(74, 158, 255, 0.6)';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        }
        
        const x = this.player.x;
        const y = this.player.y;
        const w = this.player.width;
        const h = this.player.height;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 2, y);
        this.ctx.lineTo(x + w, y + h);
        this.ctx.lineTo(x + w * 0.7, y + h * 0.7);
        this.ctx.lineTo(x + w / 2, y + h * 0.9);
        this.ctx.lineTo(x + w * 0.3, y + h * 0.7);
        this.ctx.lineTo(x, y + h);
        this.ctx.closePath();
        
        const gradient = this.ctx.createLinearGradient(x, y, x, y + h);
        gradient.addColorStop(0, '#4a9eff');
        gradient.addColorStop(0.5, '#2a6ecf');
        gradient.addColorStop(1, '#1a4a8a');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#88ccff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(x + w / 2, y + h * 0.3, w * 0.15, 0, Math.PI * 2);
        this.ctx.fillStyle = '#88ccff';
        this.ctx.fill();
        
        const flameHeight = 15 + Math.random() * 10;
        this.ctx.beginPath();
        this.ctx.moveTo(x + w * 0.3, y + h);
        this.ctx.lineTo(x + w / 2, y + h + flameHeight);
        this.ctx.lineTo(x + w * 0.7, y + h);
        this.ctx.closePath();
        
        const flameGradient = this.ctx.createLinearGradient(x + w / 2, y + h, x + w / 2, y + h + flameHeight);
        flameGradient.addColorStop(0, '#ffcc00');
        flameGradient.addColorStop(0.5, '#ff8800');
        flameGradient.addColorStop(1, 'rgba(255, 68, 0, 0)');
        this.ctx.fillStyle = flameGradient;
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawBullets() {
        this.bullets.forEach(bullet => {
            this.ctx.save();
            
            const gradient = this.ctx.createLinearGradient(
                bullet.x, bullet.y,
                bullet.x, bullet.y + bullet.height
            );
            gradient.addColorStop(0, '#4a9eff');
            gradient.addColorStop(1, '#88ccff');
            
            this.ctx.fillStyle = gradient;
            this.ctx.shadowColor = '#4a9eff';
            this.ctx.shadowBlur = 10;
            
            this.ctx.beginPath();
            this.ctx.roundRect(bullet.x, bullet.y, bullet.width, bullet.height, 3);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    drawEnemyBullets() {
        this.enemyBullets.forEach(bullet => {
            this.ctx.save();
            
            const gradient = this.ctx.createLinearGradient(
                bullet.x, bullet.y,
                bullet.x, bullet.y + bullet.height
            );
            gradient.addColorStop(0, '#ff4a4a');
            gradient.addColorStop(1, '#ff8888');
            
            this.ctx.fillStyle = gradient;
            this.ctx.shadowColor = '#ff4a4a';
            this.ctx.shadowBlur = 8;
            
            this.ctx.beginPath();
            this.ctx.roundRect(bullet.x, bullet.y, bullet.width, bullet.height, 3);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    drawEnemies() {
        this.enemies.forEach(enemy => {
            this.ctx.save();
            
            const x = enemy.x;
            const y = enemy.y;
            const w = enemy.width;
            const h = enemy.height;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x + w / 2, y + h);
            this.ctx.lineTo(x + w, y);
            this.ctx.lineTo(x + w * 0.7, y + h * 0.3);
            this.ctx.lineTo(x + w / 2, y + h * 0.1);
            this.ctx.lineTo(x + w * 0.3, y + h * 0.3);
            this.ctx.lineTo(x, y);
            this.ctx.closePath();
            
            const gradient = this.ctx.createLinearGradient(x, y, x, y + h);
            gradient.addColorStop(0, enemy.color);
            gradient.addColorStop(1, this.darkenColor(enemy.color, 0.5));
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            this.ctx.strokeStyle = this.lightenColor(enemy.color, 0.3);
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.arc(x + w / 2, y + h * 0.5, w * 0.12, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffff88';
            this.ctx.fill();
            
            if (enemy.type === 'big' && enemy.hp > 1) {
                const hpBarWidth = w;
                const hpBarHeight = 4;
                const hpPercent = enemy.hp / 3;
                
                this.ctx.fillStyle = '#333';
                this.ctx.fillRect(x, y - 10, hpBarWidth, hpBarHeight);
                
                this.ctx.fillStyle = '#4ade80';
                this.ctx.fillRect(x, y - 10, hpBarWidth * hpPercent, hpBarHeight);
            }
            
            this.ctx.restore();
        });
    }
    
    drawExplosions() {
        this.explosions.forEach(explosion => {
            this.ctx.save();
            this.ctx.globalAlpha = explosion.opacity;
            
            this.ctx.beginPath();
            this.ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = explosion.color;
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.arc(explosion.x, explosion.y, explosion.radius * 0.6, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    drawPowerUps() {
        this.powerUps.forEach(powerUp => {
            this.ctx.save();
            
            let color;
            let icon;
            
            switch (powerUp.type) {
                case 'rapidFire':
                    color = '#ffcc00';
                    icon = '⚡';
                    break;
                case 'wideShot':
                    color = '#ff6b9d';
                    icon = '◆';
                    break;
                case 'shield':
                    color = '#4ade80';
                    icon = '🛡';
                    break;
                case 'life':
                    color = '#ff4a4a';
                    icon = '❤';
                    break;
            }
            
            this.ctx.beginPath();
            this.ctx.arc(
                powerUp.x + powerUp.width / 2,
                powerUp.y + powerUp.height / 2,
                powerUp.width / 2,
                0,
                Math.PI * 2
            );
            this.ctx.fillStyle = color;
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 15;
            this.ctx.fill();
            
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            this.ctx.shadowBlur = 0;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(
                icon,
                powerUp.x + powerUp.width / 2,
                powerUp.y + powerUp.height / 2
            );
            
            this.ctx.restore();
        });
    }
    
    drawPowerUpIndicators() {
        const indicators = [];
        
        if (this.powerUpActive.rapidFire) {
            indicators.push({ text: '快速射击', color: '#ffcc00' });
        }
        if (this.powerUpActive.wideShot) {
            indicators.push({ text: '三连发', color: '#ff6b9d' });
        }
        if (this.powerUpActive.shield) {
            indicators.push({ text: '护盾', color: '#4ade80' });
        }
        
        indicators.forEach((indicator, index) => {
            this.ctx.save();
            
            const x = 10;
            const y = 10 + index * 25;
            const width = 80;
            const height = 20;
            
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.beginPath();
            this.ctx.roundRect(x, y, width, height, 5);
            this.ctx.fill();
            
            this.ctx.strokeStyle = indicator.color;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            
            this.ctx.fillStyle = indicator.color;
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(indicator.text, x + width / 2, y + height / 2);
            
            this.ctx.restore();
        });
    }
    
    darkenColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, parseInt(hex.substr(0, 2), 16) * amount);
        const g = Math.max(0, parseInt(hex.substr(2, 2), 16) * amount);
        const b = Math.max(0, parseInt(hex.substr(4, 2), 16) * amount);
        return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
    }
    
    lightenColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + 255 * amount);
        const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + 255 * amount);
        const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + 255 * amount);
        return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
    }
    
    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.update(deltaTime);
        this.draw();
        
        requestAnimationFrame((t) => this.gameLoop(t));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SpaceShooter();
});
