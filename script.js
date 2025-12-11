const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe.user || {first_name: "Anonymous"};
document.getElementById("username").innerText = user.first_name;

async function getBalance() {
    const res = await fetch("/get_balance", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user_id: user.id, initData: tg.initData})
    });
    const data = await res.json();
    document.getElementById("balance").innerText = data.balance || 0;
}

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

getBalance();
