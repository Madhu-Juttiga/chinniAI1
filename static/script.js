// Function to handle sending the message
async function sendMessage() {
    const inputField = document.getElementById("promptInput");
    const userMessage = inputField.value.trim().toLowerCase(); // Convert to lowercase for case-insensitive match

    if (userMessage) {
        const chatContainer = document.getElementById("chatContainer");

        // Create a new chat box for this conversation
        const chatBox = document.createElement("div");
        chatBox.classList.add("chat-box");

        // Display the user's message
        const userMessageDiv = document.createElement("div");
        userMessageDiv.classList.add("message", "user");
        userMessageDiv.textContent = `You: ${userMessage}`;
        chatBox.appendChild(userMessageDiv);

        // Append the chat box to the chat container
        chatContainer.appendChild(chatBox);

        // Scroll to the latest message
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Clear the input field
        inputField.value = "";

        // Add a loading spinner for AI's response
        const loadingSpinnerDiv = document.createElement("div");
        loadingSpinnerDiv.classList.add("message", "ai", "loading-spinner");
        loadingSpinnerDiv.innerHTML = `<div class="spinner"></div>`; // Spinner HTML
        chatBox.appendChild(loadingSpinnerDiv);

        let aiResponse = "";

        // Predefined responses for specific queries
        const predefinedResponses = {
            "who developed chinni ai": `
                <strong>Name:</strong> Madhu Venkata Satish Juttiga <br>
                <strong>College:</strong> Aditya RJY <br>
                <strong>Email:</strong> madhujuttiga1924@gmail.com <br>
                <strong>Google Devop ID:</strong> g.dev/madhu6969
            `,
            "who created chinni ai": `
                <strong>Name:</strong> Madhu Venkata Satish Juttiga <br>
                <strong>College:</strong> Aditya RJY <br>
                <strong>Email:</strong> madhujuttiga1924@gmail.com <br>
                <strong>Google Devop ID:</strong> g.dev/madhu6969
            `,
            "who invented chinni ai": `
                <strong>Name:</strong> Madhu Venkata Satish Juttiga <br>
                <strong>College:</strong> Aditya RJY <br>
                <strong>Email:</strong> madhujuttiga1924@gmail.com <br>
                <strong>Google Devop ID:</strong> g.dev/madhu6969
            `,
            "creator of chinni ai": `
                <strong>Name:</strong> Madhu Venkata Satish Juttiga <br>
                <strong>College:</strong> Aditya RJY <br>
                <strong>Email:</strong> madhujuttiga1924@gmail.com <br>
                <strong>Google Devop ID:</strong> g.dev/madhu6969
            `,
            "who are you": `
                Hi, I am Chinni AI! I am an exclusive chat model developed by Madhu Juttiga. 
                My main goal is to assist you in solving any problem you might have. 
                Feel free to ask me anything!
            `,
            "who r u": `
                Hi, I am Chinni AI! I am an exclusive chat model developed by Madhu Juttiga. 
                My main goal is to assist you in solving any problem you might have. 
                Feel free to ask me anything!
            `,
            "who is chinni ai": `
                Hi, I am Chinni AI! I am an exclusive chat model developed by Madhu Juttiga. 
                My main goal is to assist you in solving any problem you might have. 
                Feel free to ask me anything!
            `,
            "model of chinni ai": `Hi, I am Chinni AI version "Chinni AI Quantum 1.0"`,
            "chinni ai model": `Hi, I am Chinni AI version "Chinni AI Quantum 1.0"`,
            "which model chinni ai use": `Hi, I am Chinni AI version "Chinni AI Quantum 1.0"`,
            "version of chinni": `Hi, I am Chinni AI version "Chinni AI Quantum 1.0"`,
            "model of chinni": `Hi, I am Chinni AI version "Chinni AI Quantum 1.0"`
        };

        if (predefinedResponses[userMessage]) {
            aiResponse = predefinedResponses[userMessage];
        } else {
            try {
                const response = await fetch("https://chinniai1.onrender.com/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: userMessage }),
                });

                const data = await response.json();
                aiResponse = data.response || "Sorry, no response received."; // Fallback response
            } catch (error) {
                console.error("Error:", error);
                aiResponse = "Error connecting to the server. Please try again.";
            }
        }

        // Replace loading spinner with AI's response
        loadingSpinnerDiv.remove();
        const aiMessageDiv = document.createElement("div");
        aiMessageDiv.classList.add("message", "ai");
        aiMessageDiv.innerHTML = `<span class="animate-charcter">Chinni AI:</span> ${aiResponse}`;
        chatBox.appendChild(aiMessageDiv);

        // Add Copy Button
        const copyBtn = document.createElement("button");
        copyBtn.classList.add("copy-btn");
        copyBtn.textContent = "Copy";
        copyBtn.onclick = () => copyToClipboard(aiMessageDiv);
        chatBox.appendChild(copyBtn);

        // Scroll to the latest message
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// Function to copy AI response to clipboard
function copyToClipboard(element) {
    const text = element.innerText.replace("Chinni AI: ", ""); // Remove "Chinni AI: " prefix
    navigator.clipboard.writeText(text)
        .then(() => showCopyNotification())
        .catch((err) => {
            console.error("Failed to copy:", err);
            alert("Failed to copy text.");
        });
}

// Function to show copy notification
function showCopyNotification() {
    const notification = document.createElement("div");
    notification.classList.add("copy-notification");
    notification.textContent = "Copied to clipboard!";

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add("show"), 10);
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => document.body.removeChild(notification), 500);
    }, 2000);
}

// Event Listeners
document.querySelector(".send-button").addEventListener("click", sendMessage);
document.getElementById("promptInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("welcome-popup");
    const closeBtn = document.getElementById("close-popup");

    // Show the popup when the page loads
    popup.classList.add("show");

    // Close the popup when the close button is clicked
    closeBtn.addEventListener("click", () => {
        popup.classList.remove("show");

        // Wait for the animation to complete before hiding the popup
        setTimeout(() => {
            popup.style.display = "none";
        }, 300); // Match this duration with the CSS transition duration
    });
});

// Adjust UI elements on window resize
window.addEventListener("resize", () => {
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.scrollTop = chatContainer.scrollHeight;
});
