<script>
const initData = Telegram.WebApp.initData;

fetch("/profile", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ initData })
})
.then(r => r.json())
.then(data => {
  if (data.error) {
    alert(data.error);
    return;
  }

  document.getElementById("name").innerText = data.first_name;
  document.getElementById("balance").innerText = data.balance;
});
</script>
