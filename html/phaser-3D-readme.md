# ⚡ Phaser 3D Engine v1.1.0

Un software rasterizer 3D nativo e leggero con motore fisico integrato, sviluppato appositamente per **Phaser 3**. Questo progetto implementa un intero motore grafico 3D e fisico da zero, senza dipendere da WebGL o librerie esterne tranne Phaser per il canvas di rendering 2D.

---

## 🚀 Caratteristiche Principali

### 📐 Motore Grafico (Software Rasterizer)
* **Proiezione 3D Nativa:** Trasformazione matematica e proiezione dei vertici dallo spazio 3D allo spazio schermo 2D.
* **Depth Buffering (Z-Buffer):** Gestione corretta della sovrapposizione e profondità delle facce dei modelli 3D.
* **Backface Culling:** Algoritmo per scartare le facce dei poligoni non rivolte verso la telecamera, migliorando drasticamente le prestazioni.
* **Mappatura Textures & UV:** Supporto per il campionamento delle texture Phaser 3 sulle facce dei poligoni.
* **Livello di Dettaglio (LOD - Level of Detail):** Sostituzione dinamica delle mesh a seconda della distanza dalla camera per ottimizzare il budget dei triangoli.

### 🍎 Motore Fisico 3D Integrato
* **Risoluzione delle Collisioni:** Supporto per collisioni sferiche (`Sphere-Sphere`) e AABB (`Axis-Aligned Bounding Box`).
* **Gravità e Dinamica dei Corpi Rigidi:** Integrazione lineare di impulsi e forze applicate per simulare dinamiche fisiche realistiche.

---

## 📁 Struttura del Progetto

La cartella è organizzata in modo pulito e modulare:

```text
phaser-3D/
│
├── phaser3D/                  # Core Engine
│   ├── js/                    # Moduli matematici e di rendering
│   │   ├── Camera.js          # Gestione telecamera virtuale (posizione, rotazione, fov)
│   │   ├── Math3D.js          # Funzioni matematiche di proiezione, normali e visibilità
│   │   ├── Mesh.js            # Definizione geometrie (vertici, facce, LOD) e costruttori (box, cubi)
│   │   ├── Render.js          # Rasterizzatore software principale e gestione framebuffer
│   │   └── Vector3.js         # Classe per vettori 3D e relative operazioni algebriche
│   │
│   ├── physics/               # Moduli di simulazione fisica
│   │   ├── collision.js       # Rilevamento e calcolo delle collisioni 3D (AABB, sfere)
│   │   ├── PhysicsWorld.js    # Gestione del mondo fisico e dei passi temporali (stepping)
│   │   ├── RigidBody.js       # Proprietà fisiche (massa, attrito, bounciness) per le mesh
│   │
│   └── demo.html              # Sandbox interattivo 3D (Play Demo)
│   └── .nojekyll              # File di configurazione per il deploy statico
│
├── examples/                  # Snippet di codice di esempio per l'apprendimento delle API
├── index.html                 # Applicazione Web interattiva per la visualizzazione della documentazione
├── app.js                     # Logica dell'applicazione di documentazione
├── style.css                  # Foglio di stile moderno per la documentazione
├── viewer.html                # Renderizzatore iframe dinamico per gli esempi interattivi
└── phaser3D_v1.1.0.zip        # Archivio del pacchetto engine scaricabile direttamente
```

---

## 🔌 Come Utilizzare l'Engine nel tuo Gioco Phaser

1. Copia la cartella `phaser3D` all'interno della directory del tuo progetto.
2. Nei tuoi moduli o scene di gioco Phaser 3, importa le classi necessarie:

```javascript
import Vector3 from './phaser3D/js/Vector3.js';
import Camera from './phaser3D/js/Camera.js';
import Mesh from './phaser3D/js/Mesh.js';
import Render from './phaser3D/js/Render.js';

// Se vuoi abilitare il motore fisico:
import PhysicsWorld from './phaser3D/physics/PhysicsWorld.js';
import RigidBody from './phaser3D/physics/RigidBody.js';
```

3. Inizializza la telecamera e il renderizzatore nel metodo `create()` della tua scena:

```javascript
create() {
    // Configura la telecamera virtuale
    this.camera = new Camera(); 
    this.camera.position = new Vector3(0, 5, -30);

    // Inizializza il software rasterizer 3D nativo su Phaser
    // renderScale regola la risoluzione interna (es: 1.0 nativa, 0.5 per retro-style a prestazioni elevate)
    this.renderer = new Render(this, this.camera, { renderScale: 1.0 });

    // Configura il mondo fisico
    this.physicsWorld = new PhysicsWorld(new Vector3(0, -9.8, 0)); // Gravità terrestre
    
    // Crea una mesh e aggiungi un RigidBody
    this.boxMesh = Mesh.createCube(2.0);
    this.boxBody = new RigidBody(this.boxMesh, { mass: 1.0, bounciness: 0.5 });
    
    this.physicsWorld.addBody(this.boxBody);
}
```

4. Esegui il ciclo di calcolo fisico e rendering nel metodo `update()` della tua scena:

```javascript
update(time, delta) {
    // Pulisci il buffer dei colori e della profondità (Z-Buffer)
    this.renderer.clearBuffers();

    // Avanza la simulazione fisica (limita il dt massimo per stabilità)
    const dt = Math.min(delta / 1000, 0.1);
    this.physicsWorld.step(dt);

    // Passa le mesh al rasterizzatore software
    this.renderer.render([this.boxMesh]);
}
```

---

## 📖 Visualizzare la Documentazione e gli Esempi

Il progetto include un'applicazione Web interattiva e moderna per esplorare le API e vedere gli esempi in tempo reale.

Per avviarla localmente:
1. Apri una shell di terminale nella cartella del progetto.
2. Avvia un server web locale (ad esempio usando la comoda estensione Live Server di VS Code, oppure digitando `npx http-server` o `python -m http.server`).
3. Apri l'indirizzo nel browser per navigare tra le classi dell'engine, consultare le API ed eseguire gli esempi interattivi integrati.
