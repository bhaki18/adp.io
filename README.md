# 🌌 ADP.io — Premium Developer Portfolio & Hub

Benvenuto nella repository ufficiale di **[adp.io](https://bhaki18.github.io/adp.io)**, il portfolio professionale di **Angelo Del Piano (ADP)**, sviluppatore Web & Game di 16 anni residente in Italia.

Questo progetto è stato creato da zero per offrire un'esperienza visiva premium, fluida e ricca di animazioni, incorporando l'integrazione in tempo reale delle repository di GitHub, un riproduttore di giochi integrato e una sezione contatti dinamica.

---

## ✨ Caratteristiche Principali

- **🌀 Particle Network Canvas:** Un canvas interattivo in background che risponde in tempo reale al movimento e alla velocità del mouse creando connessioni tra nodi.
- **✨ Cursor Glow & Magnetic Buttons:** Effetto bagliore del cursore personalizzato e pulsanti magnetici con micro-animazioni ad alta fedeltà.
- **📊 Integrazione API GitHub:** Carica dinamicamente le repository pubbliche di GitHub, applicando stili e colori personalizzati in base al linguaggio di programmazione principale (con sistema di fallback offline per evitare rate-limiting).
- **📄 Lettore di README Dinamico:** Integra `marked.js` e `DOMPurify` per scaricare, compilare in HTML e mostrare in un modal sicuro i file README.md delle repository direttamente dal sito.
- **🎮 Playable Project Modal:** Consente di giocare alle demo e ai giochi Phaser/HTML5 caricandoli in sicurezza all'interno di un iframe interattivo completo di loader grafico.
- **📬 Modulo Contatti EmailJS:** Invio di email in tempo reale direttamente dal client tramite le API di EmailJS, integrando validazione dei dati e protezione antispam honeypot.
- **📱 Design Dark Glassmorphism:** Interfaccia responsive, moderna e accessibile basata su variabili CSS personalizzate e layout flessibili.

---

## 🛠️ Tecnologie Utilizzate

- **Core:** HTML5, Vanilla JavaScript (ES6)
- **Stile:** CSS3 custom (Design system con variabili CSS, sfocature di sfondo, animazioni e transizioni cubiche)
- **Librerie esterne:**
  - [EmailJS SDK](https://www.emailjs.com/) per l'invio delle email dal client.
  - [Marked.js](https://marked.js.org/) per il parsing dei file Markdown.
  - [DOMPurify](https://github.com/cure53/DOMPurify) per la sanificazione del codice HTML generato dai README.

---

## 📁 Struttura della Directory

```text
adp.io/
├── assets/                    # Asset multimediali, immagini e icone
├── css/
│   └── style.css              # Foglio di stile principale e design system
├── html/
│   ├── index.html             # Pagine statiche di supporto
│   ├── cyberpunch67-readme.md # Cache locale del README per cyberPunch67
│   └── phaser-3D-readme.md    # Cache locale del README per phaser-3D
├── js/
│   └── main.js                # Logica applicativa, interazioni e chiamate API
├── index.html                 # Punto di ingresso dell'applicazione (Home Page)
├── README.md                  # Questo file di documentazione
└── googledd97ba5b4e405806.html# Verifica di Google Search Console
```

---

## 🚀 Avvio Locale

Puoi visualizzare e testare il sito localmente utilizzando **Vite** senza alcuna configurazione complessa.

Esegui il server di sviluppo tramite:

```bash
npx vite
```

Apri l'indirizzo mostrato nel terminale (solitamente `http://localhost:5173`) sul tuo browser.

---

## 📬 Contatti e Info

- **Sviluppatore:** Angelo Del Piano
- **Età:** 16 anni
- **Nazionalità:** Italiana 🇮🇹
- **Email:** [angelodelpiano2317@gmail.com](mailto:angelodelpiano2317@gmail.com)
- **GitHub:** [@bhaki18](https://github.com/bhaki18)
