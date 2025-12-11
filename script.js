const tg = window.Telegram.WebApp;
tg.expand();

// --- Отримуємо користувача ---
let user;
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    // Якщо відкрито в Telegram Mini App
    user = tg.initDataUnsafe.user;
} else {
    // Локальна розробка: тестовий user
    user = { id: 123456789, first_name: "LocalUser", username: "localuser" };
}

// Виводимо ім’я користувача
document.getElementById("username").innerText = user.first_name;

// --- Функція отримання балансу ---
async function getBalance() {
    try {
        const res = await fetch("/get_balance", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ user_id: user.id, initData: "" })
        });
        const data = await res.json();
        document.getElementById("balance").innerText = data.balance || 0;
    } catch (e) {
        console.error("Помилка отримання балансу:", e);
        document.getElementById("balance").innerText = 0;
    }
}

// --- Функція рулетки ---
async function spinRoulette() {
    try {
        const res = await fetch("/spin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ user_id: user.id, initData: tg.initData || "" })
        });
        const data = await res.json();
        document.getElementById("prize").innerText = `🎉 Виграш: ${data.prize} 🏆`;
        document.getElementById("balance").innerText = data.balance;
    } catch (e) {
        console.error("Помилка рулетки:", e);
        document.getElementById("prize").innerText = "Помилка!";
    }
}

// --- Обробники ---
document.getElementById("spinBtn").addEventListener("click", spinRoulette);

// --- Перший запит балансу при завантаженні ---
getBalance();
