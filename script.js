const input = document.querySelector('.inputtext');
const typingtext = document.querySelector('.para');
const time = document.querySelector('.time span');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('.btn');

document.addEventListener('keyup', () => input.focus());
typingtext.addEventListener('click', () => input.focus());
document.addEventListener('keydown', handlekey);

let timer;
let maxTime = 60;
let Timeleft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadparagraph() {
    let paragraph = [
        "Every journey begins with a single step",
        "Each step forward is a victory",
        "No matter how small every effort you make",
        "A testament to your determination and resilience",
        "Progress isnt always about speed",
        "Its about consistency and perseverance",
        "Embrace the challenges",
        "They are the stepping stones to your growth and success",
        "Believe in your abilities",
        "Trust the process and keep pushing forward",
        "You are capable of achieving greatness",
        "With each day you are one step closer to your dreams",
        "Stay focused",
        "Stay positive",
        "Never underestimate the power of your potential"
    ];

    const RandomIndex = Math.floor(Math.random() * paragraph.length);
    typingtext.innerHTML = '';
    for (const char of paragraph[RandomIndex]) {
        typingtext.innerHTML += `<span>${char}</span>`;
    }
    typingtext.querySelectorAll('span')[0].classList.add('Active');
}

function initTyping() {
    const char = typingtext.querySelectorAll('span');
    const inputchar = input.value.charAt(charIndex);

    if (charIndex < char.length && Timeleft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        if (inputchar === '') {
            if (charIndex > 0) {
                char[charIndex].classList.remove('Active');
                charIndex--;
                char[charIndex].classList.remove('correct', 'incorrect');
                char[charIndex].classList.add('Active');
                if (char[charIndex].classList.contains('incorrect')) {
                    mistake--;
                }
            }
        } else {
            if (char[charIndex].innerText === inputchar) {
                char[charIndex].classList.add("correct");
            } else {
                char[charIndex].classList.add('incorrect');
                mistake++;
            }
            char[charIndex].classList.remove('Active');
            charIndex++;
            if (charIndex < char.length) {
                char[charIndex].classList.add('Active');
            }
        }

        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    } else {
        clearInterval(timer);
    }
}

function initTime() {
    if (Timeleft > 0) {
        Timeleft--;
        const wordsperm = Math.round((charIndex - mistake) / 5 / (maxTime - Timeleft) * 60);
        wpm.innerHTML = wordsperm;
        time.innerText = Timeleft;
    } else {
        clearInterval(timer);
    }
}

function handlekey(e) {
    if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        btn.click();
    }
}

btn.addEventListener('click', () => Reset());

function Reset() {
    loadparagraph();
    clearInterval(timer);
    input.value = '';
    maxTime = 60;
    Timeleft = maxTime;
    charIndex = 0;
    mistake = 0;
    time.innerText = Timeleft;
    isTyping = false;
    mistakes.innerHTML = 0;
    wpm.innerHTML = 0;
    cpm.innerHTML = 0;
}

input.addEventListener('input', initTyping);
loadparagraph();
