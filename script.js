fetch("https://projectproero.vercel.app/balance", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        initData: Telegram.WebApp.initData
    })
})
.then(r => r.json())
.then(data => {
    document.getElementById("balance").innerText = data.balance;
})
.catch(err => {
    console.error("Balance error:", err);
});
