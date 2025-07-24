let startTime;
let googleEtaInMinutes = 1;

const startBtn = document.getElementById("startRoute");
const endBtn = document.getElementById("endRoute");
const delayForm = document.getElementById("delayFeedback");
const noDelayForm = document.getElementById("noDelayFeedback");

startBtn.addEventListener("click", () => {
  startTime = new Date();
  startBtn.disabled = true;
  endBtn.disabled = false;
  showToast("Route started. ETA: " + googleEtaInMinutes + " minutes.");
});

endBtn.addEventListener("click", () => {
  const endTime = new Date();
  const actualTime = (endTime - startTime) / 60000;
  const threshold = 1.2;

  if (actualTime > googleEtaInMinutes * threshold) {
    delayForm.classList.remove("hidden");
    showToast("You were delayed. Please share feedback.");
  } else {
    noDelayForm.classList.remove("hidden");
    showToast("You arrived on time! Rate the route.");
  }

  endBtn.disabled = true;
});

// Star rating
document.querySelectorAll(".star-rating").forEach(container => {
  const inputId = container.getAttribute("data-input");
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.innerHTML = "★";
    star.classList.add("star");
    star.dataset.value = i;
    star.addEventListener("click", () => {
      document.getElementById(inputId).value = i;
      updateStars(container, i);
      handleReasonVisibility(inputId, i);
    });
    container.appendChild(star);
  }
});

function updateStars(container, value) {
  container.querySelectorAll(".star").forEach((star, index) => {
    star.style.color = index < value ? "gold" : "#ccc";
  });
}

function handleReasonVisibility(inputId, rating) {
  const formPrefix = inputId.includes("delay") ? "delay" : "noDelay";
  const lowDiv = document.getElementById(`${formPrefix}LowReasons`);
  const highDiv = document.getElementById(`${formPrefix}HighReasons`);

  if (rating >= 4) {
    highDiv.classList.remove("hidden");
    lowDiv.classList.add("hidden");
  } else {
    lowDiv.classList.remove("hidden");
    highDiv.classList.add("hidden");
  }
}

// Delay form submission
delayForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(delayForm);
  const data = {
    source: "Source A",
    destination: "Destination B",
    rating: formData.get("rating"),
    reason: formData.get("reason"),
    context: formData.get("rating") >= 4 ? formData.get("highReasons") : formData.get("lowReasons")
  };
  delayForm.classList.add("hidden");
  showToast("Thanks for the delay feedback!");
  await postFeedback(data);
});

// No delay form submission
noDelayForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(noDelayForm);
  const data = {
    source: "Source A",
    destination: "Destination B",
    rating: formData.get("rating"),
    reason: formData.get("rating") >= 4 ? formData.get("highReasons") : formData.get("lowReasons")
  };
  noDelayForm.classList.add("hidden");
  showToast("Thanks for your rating!");
  await postFeedback(data);
});

async function postFeedback(data) {
  try {
    await fetch("http://localhost:5000/api/save-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error("Failed to save feedback:", error);
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 4000);
}
