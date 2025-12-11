// script.js
const tg = window.Telegram.WebApp;
tg.expand();

// Helper to show a message
function setResult(text) {
  document.getElementById("result").innerText = text;
}

// Проверяем, есть ли initData — оно доступно только если WebApp открыт из Telegram
if (!tg.initData) {
  // Показываем подсказку, если открыто не из Telegram
  document.getElementById("username").innerText = "Відкрий через Telegram";
  setResult("Цю сторінку потрібно відкривати тільки з Telegram (через кнопку ботa).");
} else {
  console.log("initData:", tg.initData);
  // Запрос баланса и имени
  async function loadProfile() {
    try {
      const res = await fetch("/get_balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: tg.initData })
      });
      if (!res.ok) {
        const j = await res.json().catch(()=>({detail: "unknown"}));
        setResult("Помилка: " + (j.detail || res.statusText));
        return;
      }
      const data = await res.json();
      document.getElementById("username").innerText = data.name || "Користувач";
      if (data.username) document.getElementById("username-small").innerText = "@" + data.username;
      document.getElementById("balance").innerText = data.balance + " ⭐";
    } catch (err) {
      console.error(err);
      setResult("Помилка при зв'язку з сервером.");
    }
  }

  document.getElementById("spin").addEventListener("click", async () => {
    setResult("Крутимо...");
    try {
      const res = await fetch("/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: tg.initData })
      });
      if (!res.ok) {
        const j = await res.json().catch(()=>({detail: "unknown"}));
        setResult("Помилка: " + (j.detail || res.statusText));
        return;
      }
      const data = await res.json();
      setResult("Результат: " + data.result + (data.added ? ` • +${data.added}⭐` : ""));
      document.getElementById("balance").innerText = data.balance + " ⭐";
    } catch (err) {
      console.error(err);
      setResult("Помилка при виконанні рулетки.");
    }
  });

  loadProfile();
}
