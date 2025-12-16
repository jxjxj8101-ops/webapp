const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe?.user || {
    id: 123456789,
    first_name: "LocalUser"
};

async function loadProfile() {
    const res = await fetch("/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: user.id,
            initData: tg.initData || ""
        })
    });

    const data = await res.json();

    document.getElementById("username").innerText =
        data.first_name || "Без імені";

    document.getElementById("balance").innerText =
        data.cups;
}

loadProfile();
