let tg = window.Telegram.WebApp;
tg.expand();

async function loadProfile() {
    let res = await fetch("http://localhost:8000/get_balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            initData: tg.initData
        })
    });

    let data = await res.json();

    document.getElementById("username").innerText = data.name;
    document.getElementById("balance").innerText = data.balance;
}

document.getElementById("spin").onclick = async () => {
    let res = await fetch("http://localhost:8000/spin", {
        method: "POST"
    });
    let data = await res.json();

    document.getElementById("result").innerText = "Результат: " + data.result;
};

loadProfile();
