# Walkwise 🚶‍♂️

Walkwise is a crowdsourced route recommendation system built using Google Maps. Instead of only showing the fastest route, it displays multiple paths with real user feedback—like scenic quality, walking difficulty, and road conditions—using color-coded paths.

---

## 🌟 Features

- Display all possible walking routes with color codes:
  - 🟢 Green – Scenic and peaceful
  - 🔵 Blue – Fastest route
  - 🔴 Red – Difficult/bad road or unsafe
  - 🟡 Yellow – Balanced route (average across all factors)
  - 🟠 Orange – Poor or outdated route (low user satisfaction or not recently updated)
  - 🟣 Violet – Less traveled / experimental route (low usage, needs more data)
- Feedback form to rate route quality, time taken, and delay reasons
- Community-driven: Routes improve dynamically based on input
- Google Maps integration for visualizing paths

---

## 🧰 Tech Stack

- Frontend: HTML, CSS, JavaScript (or React), Google Maps JavaScript API
- Backend: Node.js, Express
- Database: MongoDB Atlas (or Firebase)

---

## 🛠️ Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/walkwise.git
cd walkwise

