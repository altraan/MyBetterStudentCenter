# 📱 Mobile Access Guide

## Quick Start

### Option 1: Phone Demo Mode on Laptop (For Presentations)

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000 in your browser

3. Click the **"Phone Demo"** button in the top-right corner

4. Your app will now display in a realistic phone mockup! Perfect for hackathon demos.

5. Click **"Desktop"** to switch back to full-screen view

---

### Option 2: Access on Your Actual Phone

1. **Connect your phone to the SAME WiFi network as your laptop**

2. **Find your laptop's IP address:**
   - Windows: Open PowerShell and run:
     ```powershell
     ipconfig
     ```
     Look for "IPv4 Address" under your WiFi adapter (e.g., `192.168.1.100`)

   - Mac/Linux:
     ```bash
     ifconfig | grep "inet "
     ```

3. **Start the dev server with network access:**
   ```bash
   npm run dev -- -H 0.0.0.0
   ```

4. **On your phone, open the browser and go to:**
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   For example: `http://192.168.1.100:3000`

5. **Bookmark it** for quick access during the hackathon!

---

## Features

✅ **Responsive Design** - Works on phones, tablets, and desktops  
✅ **Phone Mockup** - Built-in demo mode for presentations  
✅ **Network Access** - Access from any device on your network  
✅ **Touch-Friendly** - Optimized for mobile interactions

---

## Troubleshooting

**Can't access from phone?**
- Make sure both devices are on the same WiFi network
- Check if your firewall is blocking port 3000
- Try disabling VPN if you're using one

**Phone mockup looks weird?**
- The mockup is designed for laptop/desktop screens
- On mobile, just use the regular view (it's already responsive!)

---

## Tips for Hackathon Demo

1. Use **Phone Demo mode** when presenting on a projector
2. Have the app open on your actual phone as a backup
3. The toggle button is always accessible in the top-right corner
4. Demo mode shows a realistic iPhone-style frame with notch and buttons
