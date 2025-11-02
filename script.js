console.log("Script loaded successfully");

async function generateQuiz() {
  const topicInput = document.getElementById("topicInput");
  const chatBox = document.getElementById("chat-box");
  const topic = topicInput.value.trim();

  if (!topic) {
    chatBox.innerHTML = "<p>Please enter a topic first!</p>";
    return;
  }

  chatBox.innerHTML = "<p>Generating quiz, please wait...</p>";

  try {
    const response = await fetch("/generate_quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    const data = await response.json();

    if (data.quiz) {
      // ✅ Correct use of backticks for HTML
      chatBox.innerHTML = <pre>${data.quiz}</pre>;
    } else {
      chatBox.innerHTML = <p style="color:red;">Error: ${data.error || "Something went wrong"}</p>;
    }
  } catch (error) {
    chatBox.innerHTML = "<p style='color:red;'>Failed to connect to server.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateBtn");
  btn.addEventListener("click", generateQuiz);
});