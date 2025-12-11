const tg = window.Telegram.WebApp;
tg.expand();

// Отримуємо дані користувача
const user = tg.initDataUnsafe.user || {id: 0, first_name: "Anonymous"};
document.getElementById("username").innerText = user.first_name;

// Отримання балансу з бекенду
async function getBalance() {
    const res = await fetch("/get_balance", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user_id: user.id, initData: tg.initData})
    });
    const data = await res.json();
    document.getElementById("balance").innerText = data.balance || 0;
}

// Рулетка
async function spinRoulette() {
    const res = await fetch("/spin", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user_id: user.id, initData: tg.initData})
    });
    const data = await res.json();
    document.getElementById("prize").innerText = `🎉 Виграш: ${data.prize} 🏆`;
    document.getElementById("balance").innerText = data.balance;
}

document.getElementById("spinBtn").addEventListener("click", spinRoulette);

// Перший запит балансу при завантаженні
getBalance();
