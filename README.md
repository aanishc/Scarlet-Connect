# 🟥 Scarlet Connect — Demo Frontend

This is a demo frontend app for **Scarlet Connect**, built using **React**, **Vite**, **TailwindCSS**, and **Leaflet**.  
The theme is inspired by **Rutgers University** colors — scarlet red and black.

Scarlet Connect is a Rutgers-specific friend-making app that uses Verizon Smart Campus Concepts to help students naturally connect with people they already spend time around. By using NetID login and campus WiFi signals, the app detects how long users spend in Rutgers academic buildings (never dorms or off-campus) and anonymously matches students with others who share similar study spots, class locations, and schedules.

**Students can opt in or out at any time, and all location data appears only as anonymous “pings,” ensuring privacy while still enabling matches—similar to TikTok’s viewer profile system. The demo showcases real-time building pings, match percentages, and examples of how students with overlapping campus habits can become study buddies or friends.
**---

## ⚙️ How to Run the App Locally

### 1️⃣ Make sure Node.js is installed
Check that Node and npm are installed:
```bash
node -v
npm -v
```
If not, [download Node.js](https://nodejs.org/) (LTS version recommended).

---

### 2️⃣ Navigate to the project folder
In your terminal:
```bash
cd Scarlet-Connect
```

---

### 3️⃣ Install all dependencies
This will install React, Vite, Tailwind, and Leaflet (from your `package.json`):
```bash
npm install
```
You’ll see a `node_modules` folder appear — that’s where everything gets installed.

---

### 4️⃣ Start the development server
Run:
```bash
npm run dev
```
After a few seconds, you should see output like:
```
VITE v5.4.0  ready in 500ms

➜  Local:   http://localhost:5173/
```

---

### 5️⃣ Open the app in your browser
Go to:
```
http://localhost:5173/
```
You should see:
- A navbar with **Scarlet Connect**
- Rutgers scarlet/black theme
- A button to open the campus map

Click **“Open Campus Map”** or the “Map” link — you’ll see an interactive map with demo people markers on Rutgers–New Brunswick.

---

### 6️⃣ Stop the server (when you’re done)
Press:
```
Ctrl + C
```
in the terminal to stop the local development server.

---

### ✅ Optional: Build for production
If you want to create a production-ready build (for deployment or sharing):
```bash
npm run build
```
Preview the build locally:
```bash
npm run preview
```

---

### 📦 Quick Commands Recap

| Command | Description |
|----------|--------------|
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local development server |
| `npm run build` | Builds for production |
| `npm run preview` | Previews built app |
