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

  // Show immediate thinking message
  const thinkingDiv = document.createElement("div");
  thinkingDiv.className = "bot";
  thinkingDiv.textContent = "Doraemon is thinking 🤖...";
  chat.appendChild(thinkingDiv);
  chat.scrollTop = chat.scrollHeight;

  fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  })
    .then((res) => res.json())
    .then((data) => {
      // Replace thinking message with actual reply
      if (data.reply) {
        thinkingDiv.textContent = `Doraemon: ${data.reply}`;
      } else if (data.error) {
        thinkingDiv.textContent = `❌ ${data.error}`;
      } else {
        thinkingDiv.textContent = "❌ Unexpected response from Doraemon.";
      }
    })
    .catch((err) => {
      console.error(err);
      thinkingDiv.textContent = "❌ Error connecting to Doraemon.";
    });
}
