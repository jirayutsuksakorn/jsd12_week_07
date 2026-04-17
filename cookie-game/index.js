let score = 0;
let perSecond = 0;
let ovenPrice = 10;

window.addEventListener('DOMContentLoaded', () => {
    const cookieDisplay = document.getElementById('cookie_score');
    const perSecondDisplay = document.getElementById('per_second_display');
    const cookieImage = document.getElementById('cookie_image');
    const buyOvenBtn = document.getElementById('buy_oven');
    const ghost = document.getElementById('gusteau-ghost');
    const clickSound = document.getElementById('cookie-sound');

    // --- 1. ระบบคลิกคุกกี้ ---
    cookieImage.addEventListener('click', (e) => {
        score++;
        updateDisplay();

        // เล่นเสียง
        if (clickSound) {
            clickSound.pause();
            clickSound.currentTime = 0;
            clickSound.play().catch(err => console.log(err));
        }

        // ตัวเลข +1 ลอยขึ้น
        const clickText = document.createElement('div');
        clickText.innerText = '+1';
        clickText.className = 'floating-number';
        clickText.style.left = `${e.clientX}px`;
        clickText.style.top = `${e.clientY}px`;
        document.body.appendChild(clickText);
        setTimeout(() => { clickText.remove(); }, 2000);

        cookieImage.classList.add('clicked');
        setTimeout(() => { cookieImage.classList.remove('clicked'); }, 80);
    });

    // --- 2. ระบบผีเชฟกุสโต (โผล่ทันที / อยู่ 10 วิ / พัก 5 วิ) ---
    function spawnGhost() {
        // สุ่มตำแหน่งใหม่ (ผีจะค่อยๆ ลอยไปตำแหน่งนี้ตาม CSS Transition)
        const x = Math.random() * (window.innerWidth - 250) + 50;
        const y = Math.random() * (window.innerHeight - 250) + 50;

        ghost.style.left = `${x}px`;
        ghost.style.top = `${y}px`;

        // ปรากฏตัว
        ghost.classList.add('active');

        // แช่อยู่ 10 วินาทีแล้วค่อยจางหาย
        setTimeout(() => {
            ghost.classList.remove('active');
        }, 10000);
    }

    // คลิกที่ผีได้ +100
    ghost.addEventListener('click', () => {
        if (ghost.classList.contains('active')) {
            score += 100;
            updateDisplay();
            ghost.classList.remove('active'); // คลิกแล้วหายทันที

            // แจ้งเตือนโบนัส +100
            const bonusText = document.createElement('div');
            bonusText.innerText = `GUSTEAU'S BLESSING! +100`;
            bonusText.className = 'floating-number';
            bonusText.style.color = '#00fbff';
            bonusText.style.left = ghost.style.left;
            bonusText.style.top = ghost.style.top;
            document.body.appendChild(bonusText);
            setTimeout(() => { bonusText.remove(); }, 2000);
        }
    });

    // เริ่มทำงานทันทีที่โหลดหน้าเว็บ
    spawnGhost();

    // วนลูปทุกๆ 15 วินาที (อยู่ 10 วิ + หายไปพัก 5 วิ)
    setInterval(() => {
        spawnGhost();
    }, 15000);


    // --- 3. ระบบร้านค้าและอัปเกรด ---
    buyOvenBtn.addEventListener('click', () => {
        if (score >= ovenPrice) {
            score -= ovenPrice;
            perSecond += 1;
            ovenPrice = Math.floor(ovenPrice * 1.5);
            updateDisplay();
        } else {
            alert("คุกกี้ไม่พอจ้า! ไปคลิกเพิ่มเร็ว!");
        }
    });

    // เพิ่มแต้มอัตโนมัติตามค่า perSecond
    setInterval(() => {
        if (perSecond > 0) {
            score += perSecond;
            updateDisplay();
        }
    }, 1000);

    // ฟังก์ชันอัปเดตตัวเลขบนหน้าจอ
    function updateDisplay() {
        cookieDisplay.textContent = `${score} Cookies`;
        perSecondDisplay.textContent = `Per second: ${perSecond}`;
        buyOvenBtn.textContent = `Buy Oven (Price: ${ovenPrice})`;

        // ปรับความจางของปุ่มถ้าเงินไม่พอ
        if (score < ovenPrice) {
            buyOvenBtn.style.opacity = "0.6";
        } else {
            buyOvenBtn.style.opacity = "1";
        }
    }
});