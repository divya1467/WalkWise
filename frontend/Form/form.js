let startTime;
let googleEtaInMinutes = 1; // Simulated ETA

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
  const actualTime = (endTime - startTime) / 60000; // in minutes
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

// Handle Delay Feedback Form
delayForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(delayForm));
  delayForm.classList.add("hidden");
  showToast("Thanks for the delay feedback!");
  // Optional: send data to server
});

// Handle No Delay Feedback Form
noDelayForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(noDelayForm));
  noDelayForm.classList.add("hidden");
  showToast("Thanks for your rating!");
  // Optional: send data to server
});

// Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 4000);
}
