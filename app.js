document.getElementById("send").addEventListener("click", sendMessage);
document.getElementById("message").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(text, sender) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value.trim();
  if (!message) return;

  addMessage(`You: ${message}`, "user");
  messageInput.value = "";
  addMessage("Doraemon is thinking… 🤔", "bot");

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    document.querySelector("#chat .bot:last-child").textContent = `Doraemon: ${data.reply || "No reply"}`;
  } catch (err) {
    document.querySelector("#chat .bot:last-child").textContent = "Doraemon is busy right now. ❌";
  }
}
