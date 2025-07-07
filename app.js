const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");

sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function addMessage(content, className) {
  const div = document.createElement("div");
  div.className = className;
  div.textContent = content;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  addMessage(`You: ${userMessage}`, "user");
  messageInput.value = "";

  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.reply) {
        addMessage(`Doraemon: ${data.reply}`, "bot");
      } else if (data.error) {
        addMessage(`❌ ${data.error}`, "bot");
      } else {
        addMessage("❌ Unexpected response from Doraemon.", "bot");
      }
    })
    .catch((err) => {
      console.error(err);
      addMessage("❌ Error connecting to Doraemon.", "bot");
    });
}
