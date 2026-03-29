# Digital Literacy & AI-Ready Learning Studio
**Developed by Mateen Yousuf — School Education Department, Kashmir**

---

## 📁 File Structure

```
digital-literacy-app/
├── index.html          ← Main application (entire app in one file)
├── manifest.json       ← PWA manifest for installability
├── service-worker.js   ← Offline caching
├── author.jpg          ← Your author photo (add this!)
└── README.md           ← This guide
```

---

## 🚀 How to Run Locally

### Option 1: VS Code Live Server (Recommended)
1. Open the `digital-literacy-app` folder in VS Code
2. Install the "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"
4. App opens at `http://127.0.0.1:5500`

### Option 2: Python Local Server
```bash
cd digital-literacy-app
python3 -m http.server 8000
# Open: http://localhost:8000
```

### Option 3: Node.js http-server
```bash
npm install -g http-server
cd digital-literacy-app
http-server -p 8080
# Open: http://localhost:8080
```

---

## 🌐 How to Host for Free

### GitHub Pages (Recommended — Free Forever)
1. Create a GitHub account at github.com
2. Create new repository → Name it `dl-studio`
3. Upload all files from this folder
4. Go to Settings → Pages → Source: "main branch"
5. Your app is live at: `https://yourusername.github.io/dl-studio`

### Netlify (Drag & Drop)
1. Go to netlify.com → Sign up free
2. Drag the entire `digital-literacy-app` folder to the deploy zone
3. App is live in 30 seconds with a free URL

### Cloudflare Pages
1. cloudflare.com → Pages → Connect GitHub repository
2. Build command: (leave empty)
3. Publish directory: `/` (root)

---

## 📱 How to Install as App (PWA)

### On Android (Chrome)
1. Open the app URL in Chrome
2. Tap the three-dot menu → "Add to Home Screen"
3. App installs like a native Android app
4. Works fully offline after first load

### On iPhone (Safari)
1. Open the app URL in Safari
2. Tap the Share button → "Add to Home Screen"
3. App installs on home screen

---

## 📦 Convert to Android APK

### Method 1: TWA (Trusted Web Activity) — Best Quality
```
Requirements: Android Studio + Java SDK

1. Install Android Studio from developer.android.com/studio
2. Create new project → "No Activity"
3. Add TWA dependency to build.gradle:
   implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
4. Configure AndroidManifest.xml with your hosted URL
5. Build → Generate Signed APK
```

### Method 2: WebView Wrapper — Simpler
```java
// MainActivity.java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView webView = new WebView(this);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true); // For LocalStorage
        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.loadUrl("file:///android_asset/index.html");
        setContentView(webView);
    }
}
```

Copy `index.html`, `manifest.json`, and `author.jpg` to: `app/src/main/assets/`

### Method 3: Capacitor (Ionic) — Easiest CLI
```bash
npm install -g @capacitor/cli
npx cap init "DL Studio" "com.mateenyousuf.dlstudio"
npm install @capacitor/android
npx cap add android
cp index.html android/app/src/main/assets/public/
npx cap open android
# Then in Android Studio: Build → Generate Signed APK
```

---

## ⚙️ Adding Your Author Photo

1. Name your photo file exactly: `author.jpg`
2. Place it in the same folder as `index.html`
3. The app will automatically display it on the home screen
4. If not found, a teacher emoji placeholder is shown

---

## 📊 Analytics Formulas (Reference)

```javascript
// Digital Literacy Index (DLI)
DLI = (average of 6 self-check ratings / 5) × 100

// Cyber Safety Score (CSS)
CSS = ((online_safety + password_hygiene) / 2 / 5) × 100

// Cyber Decision Quality Score (CDQS)
CDQS = (correct_scenarios / total_scenarios) × 100

// AI Conceptual Understanding Score (AICS)
AICS = (correct_answers / total_questions) × 100

// Screen Balance Score (SBS)
SBS = (study_ratio × 50) + (physical_activity/2 × 30) + (sleep/8 × 20)

// Digital Fatigue Risk (DFR)
DFR = ((total_screen - 6) / 10 × 60) + ((6 - sleep) / 6 × 40)

// Healthy Use Index (HUI)
HUI = (SBS × 0.6) + ((100 - DFR) × 0.4)

// Overall Digital Readiness
Overall = (DLI + CSS + AAI + SBS) / 4
```

---

## 🔧 Customization

**To change colors:** Edit CSS variables at top of `<style>` section:
```css
:root {
  --navy: #0a1628;  /* Background */
  --cyan: #00d4ff;  /* Accent */
  --gold: #f0c040;  /* Highlights */
}
```

**To add more foundation pages:** Add objects to `FOUNDATIONS_DATA` array in JavaScript.

**To add more scenarios:** Add objects to `SCENARIOS_DATA` array.

**To change author info:** Search for "Mateen Yousuf" in index.html and update.

---

## ✅ Checklist Before Deployment

- [ ] Add `author.jpg` to the folder
- [ ] Test offline mode (disable internet, reload app)
- [ ] Test on an Android phone in Chrome
- [ ] Install via "Add to Home Screen" and verify
- [ ] Test all 4 assessment modules complete correctly
- [ ] Verify report generation works
- [ ] Test print report functionality

---

*Aligned with NEP 2020 | Designed for Offline-First Education | School Education Department Kashmir*
