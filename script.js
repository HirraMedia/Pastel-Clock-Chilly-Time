let timerInterval;

// 1. Khởi chạy khi trang tải xong
window.onload = () => {
    createClouds(15);
    setInterval(updateClock, 1000);
    updateClock();

    // Xin quyền gửi thông báo hệ thống (Web Notification)
    if ("Notification" in window) {
        Notification.requestPermission();
    }
};

// 2. Hàm hiện thông báo giữa màn hình + Tiếng chuông
function showAlert() {
    const overlay = document.getElementById('custom-alert-overlay');
    if (overlay) overlay.style.display = 'flex';
    
    const sound = document.getElementById('alarm-sound');
    if (sound) sound.play();
}

// 3. Hàm đóng thông báo
function closeAlert() {
    const overlay = document.getElementById('custom-alert-overlay');
    if (overlay) overlay.style.display = 'none';
    
    const sound = document.getElementById('alarm-sound');
    if (sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}

// 4. Hàm gửi thông báo hệ thống (hiện khi ở web khác)
function sendSystemNotification() {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Hết giờ rồi Vy ơi! 🌸", {
            body: "Mau quay lại kiểm tra đồng hồ nè!",
            icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        });
    }
}

// 5. Quản lý Hẹn giờ (Timer) - ĐÃ CHỈNH SỬA
function startTimer() {
    clearInterval(timerInterval);
    let min = parseInt(document.getElementById('t-min').value) || 0;
    let sec = parseInt(document.getElementById('t-sec').value) || 0;
    let total = min * 60 + sec;

    if (total <= 0) return;

    const display = document.getElementById('timer-display');
    display.style.display = "block";

    timerInterval = setInterval(() => {
        if (total <= 0) {
            clearInterval(timerInterval);
            
            showAlert();               // Hiện giữa màn hình
            sendSystemNotification();  // Báo ở web khác
            
            resetTimer();
            return;
        }
        total--;
        let m = Math.floor(total / 60);
        let s = total % 60;
        display.innerText = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);
}

// --- CÁC HÀM CÒN LẠI GIỮ NGUYÊN ---

function updateClock() {
    const now = new Date();
    const h = now.getHours();
    let greet = "Chào buổi sáng, Hà Vy!";
    if (h >= 12 && h < 18) greet = "Nghỉ trưa thôi, Hà Vy!";
    else if (h >= 18) greet = "Buổi tối vui vẻ, Hà Vy!";

    const greetElement = document.getElementById('greeting');
    if (greetElement) greetElement.innerText = greet;
    
    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('full-date');
    
    if (timeEl) timeEl.innerText = now.toLocaleTimeString('vi-VN');
    if (dateEl) dateEl.innerText = now.toLocaleDateString('vi-VN', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
}

function createClouds(num) {
    const sky = document.getElementById('sky');
    if (!sky) return;
    for (let i = 0; i < num; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.innerText = '☁️';
        cloud.style.cssText = `top:${Math.random()*60}%; font-size:${2+Math.random()*5}rem; animation-duration:${20+Math.random()*50}s; animation-delay:${Math.random()*-100}s; opacity:${0.3+Math.random()*0.4};`;
        sky.appendChild(cloud);
    }
}

function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    if (event) event.currentTarget.classList.add('active');
}

function resetTimer() {
    clearInterval(timerInterval);
    const display = document.getElementById('timer-display');
    if (display) display.style.display = "none";
    document.getElementById('t-min').value = "";
    document.getElementById('t-sec').value = "";
}

function countDays() {
    const targetValue = document.getElementById('special-date').value;
    if(!targetValue) return;
    const target = new Date(targetValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    const resultEl = document.getElementById('day-result');
    if (resultEl) resultEl.innerText = Math.abs(diff);
}

function toggleDarkMode() { 
    document.body.classList.toggle("dark-mode"); 
}