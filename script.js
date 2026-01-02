fetch("https://projectproero.vercel.app/balance", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        initData: Telegram.WebApp.initData
    })
})
.then(r => r.json())
.then(d => {
    document.getElementById("balance").innerText = d.balance;
});
