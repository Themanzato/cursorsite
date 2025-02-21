document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const glitchSound = new Audio('assets/glitch.mp3');
    const analyzeSound = new Audio('assets/glitch2.mp3');
    
    const validCommands = {
        'help': 'Available commands: help, listen, analyze, decrypt, connect',
        'listen': 'Playing corrupted audio signal...',
        'analyze': 'Analyzing signal patterns...\nDetected: Frequency modulation required',
        'decrypt': 'Decryption attempt failed. Required format: FREQ-KEY',
        'connect': 'Connection failed. Sequence incomplete.'
    };

    let hasListened = false;
    let hasAnalyzed = false;
    let decryptAttempts = 0;
    const correctFrequency = '4824';
    const correctKey = 'TMSIGNAL';

    const glitchPatterns = [
        { text: 'x8xx', class: 'frequency-pattern' },
        { text: 'xx24', class: 'frequency-pattern' },
        { text: '4xxx', class: 'frequency-pattern' },
        { text: 'T_S_G__L', class: 'key-pattern' },
        { text: '_M_I_NA_', class: 'key-pattern' }
    ];

    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.toLowerCase().trim();
            processCommand(command);
            commandInput.value = '';
        }
    });

    function processCommand(command) {
        const [mainCommand, ...args] = command.split(' ');
        
        if (validCommands[mainCommand]) {
            addConsoleOutput(validCommands[mainCommand]);
            
            switch(mainCommand) {
                case 'listen':
                    processListenCommand();
                    break;
                case 'analyze':
                    processAnalyzeCommand();
                    break;
                case 'decrypt':
                    processDecryptCommand(args[0]);
                    break;
                case 'connect':
                    processConnectCommand(args[0]);
                    break;
            }
        } else {
            addConsoleOutput('Command not recognized', 'error');
        }
    }

    function processListenCommand() {
        glitchSound.currentTime = 0;
        glitchSound.play();
        hasListened = true;
        
        hackerConsole.classList.remove('active');
        
        showGlitchSequence(glitchPatterns.slice(0, 3));
    }

    function processAnalyzeCommand() {
        if (!hasListened) {
            addConsoleOutput('Error: Must listen to signal first', 'error');
            return;
        }

        hasAnalyzed = true;
        addConsoleOutput('Analysis complete. Detected encrypted key fragments...');
        
        analyzeSound.currentTime = 0;
        analyzeSound.play();
        
        hackerConsole.classList.remove('active');
        
        showGlitchSequence(glitchPatterns.slice(3));
    }

    function processDecryptCommand(code) {
        if (!hasListened || !hasAnalyzed) {
            addConsoleOutput('Error: Must listen and analyze first', 'error');
            return;
        }

        if (!code) {
            addConsoleOutput('Invalid format. Use: FREQ-KEY (Example: 1234-ABCDEFG)', 'error');
            return;
        }
        
        if (!code.includes('-')) {
            addConsoleOutput('Missing separator. Format should be: FREQ-KEY', 'error');
            return;
        }

        const [freq, key] = code.split('-');
        
        if (!freq || !key || freq.length !== 4 || key.length !== 8) {
            addConsoleOutput('Invalid format. Frequency must be 4 digits and key must be 8 letters', 'error');
            return;
        }

        decryptAttempts++;

        if (decryptAttempts >= 3) {
            showHint();
        }

        if (freq === correctFrequency && key.toUpperCase() === correctKey) {
            addConsoleOutput('Decryption successful. System ready for connection.');
            hackerConsole.classList.remove('active');
            setTimeout(() => {
                showSuccessPattern();
            }, 100);
        } else {
            if (freq === correctFrequency) {
                addConsoleOutput('Frequency matched. Key incorrect.');
            } else if (key.toUpperCase() === correctKey) {
                addConsoleOutput('Key matched. Frequency incorrect.');
            } else {
                addConsoleOutput('Both frequency and key incorrect.');
            }
        }
    }

    function processConnectCommand(sequence) {
        if (!sequence) {
            addConsoleOutput('Connection failed. Use format: FREQ-KEY', 'error');
            return;
        }
        
        const [freq, key] = sequence.split('-');
        if (freq === correctFrequency && key.toUpperCase() === correctKey) {
            addConsoleOutput('Connection successful. Initializing sequence...');
            hackerConsole.classList.remove('active');
            setTimeout(() => {
                unlockSecret();
            }, 100);
        } else {
            addConsoleOutput('Connection failed. Verify frequency and key.', 'error');
        }
    }

    function showGlitchSequence(patterns) {
        const container = document.querySelector('.container');
        let index = 0;
        
        const interval = setInterval(() => {
            if (index >= patterns.length) {
                clearInterval(interval);
                return;
            }
            
            const glitchText = document.createElement('div');
            glitchText.className = `glitch-text ${patterns[index].class}`;
            glitchText.textContent = patterns[index].text;
            container.appendChild(glitchText);
            
            setTimeout(() => glitchText.remove(), 1500);
            index++;
        }, 2000);
    }

    function showHint() {
        const hints = [
            'Frequency appears in fragments...',
            'Key spells something meaningful...',
            'T M S I G N A L'
        ];
        const hint = document.createElement('div');
        hint.className = 'hint-text';
        hint.textContent = hints[Math.floor(decryptAttempts/3) % hints.length];
        document.body.appendChild(hint);
        setTimeout(() => hint.remove(), 3000);
    }

    function isValidDecryptFormat(code) {
        return /^\d{4}-[A-Za-z]{8}$/i.test(code);
    }

    function showSuccessPattern() {
        const pattern = document.createElement('div');
        pattern.className = 'success-pattern';
        pattern.textContent = `${correctFrequency}-${correctKey}`;
        document.body.appendChild(pattern);
        setTimeout(() => pattern.remove(), 500);
    }

    function unlockSecret() {
        const glitchSound = new Audio('assets/glitch.mp3');
        const countdownSound = new Audio('assets/countdown.mp3');
        document.querySelector('.container').innerHTML = `
            <div class="secret-terminal">
                <div class="access-granted glitch" data-text="ACCESS_GRANTED">ACCESS_GRANTED</div>
                <div class="secret-content">
                    <h2>// EMO-TIONS SIGNAL RECOVERED //</h2>
                    <div class="message-box">
                        <p>STATUS: DECRYPTED</p>
                        <p>SIGNAL: STABLE</p>
                        <p class="countdown">INITIALIZING: 11</p>
                        <div class="hidden-link">
                            <p>TRANSMISSION READY:</p>
                            <a href="#" class="glitch-link" id="secret-link">BEGIN_SEQUENCE</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.classList.add('intense-glitch');
        
        glitchSound.play();
        glitchSound.loop = true;
        
        countdownSound.play();

        startCountdown(glitchSound, countdownSound);
    }

    function startCountdown(glitchSound, countdownSound) {
        let timeLeft = 11;
        const countdownElement = document.querySelector('.countdown');
        
        const interval = setInterval(() => {
            timeLeft--;
            countdownElement.textContent = `INITIALIZING: ${timeLeft}`;
            
            if (timeLeft <= 0) {
                clearInterval(interval);
                glitchSound.pause();
                countdownSound.pause();
                window.location.href = 'https://youtu.be/GdswkzAHXE4?si=XOOxwjXDkIIvf10t';
            }
        }, 1000);
    }

    const consoleBtn = document.createElement('button');
    consoleBtn.className = 'hacker-console-toggle';
    consoleBtn.innerHTML = '> TERMINAL_';
    document.body.appendChild(consoleBtn);

    const hackerConsole = document.createElement('div');
    hackerConsole.className = 'hacker-console';
    hackerConsole.innerHTML = `
        <div class="console-header">
            <span class="console-title">TERMINAL v1.99x</span>
            <button class="console-close">&times;</button>
        </div>
        <div class="console-output"></div>
        <div class="console-input-wrap">
            <span class="console-prompt">&gt;</span>
            <input type="text" class="console-input" placeholder="ENTER_COMMAND" />
            <button class="console-send">SEND</button>
        </div>
    `;
    document.body.appendChild(hackerConsole);

    document.querySelector('.terminal-input').style.display = 'none';

    consoleBtn.addEventListener('click', () => {
        hackerConsole.classList.add('active');
        document.querySelector('.console-input').focus();
    });

    document.querySelector('.console-close').addEventListener('click', () => {
        hackerConsole.classList.remove('active');
    });

    function addConsoleOutput(text, type = 'response') {
        const output = document.querySelector('.console-output');
        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    const mobileInput = hackerConsole.querySelector('.console-input');
    const sendButton = hackerConsole.querySelector('.console-send');

    function processMobileCommand() {
        const command = mobileInput.value.toLowerCase().trim();
        if (command) {
            addConsoleOutput(`> ${command}`, 'command');
            processCommand(command);
            mobileInput.value = '';
        }
    }

    mobileInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processMobileCommand();
        }
    });

    sendButton.addEventListener('click', processMobileCommand);
}); 