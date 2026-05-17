# A Quiet Cosmology

A six-chapter visual letter. Black canvas, wine-red rose, the actual photos.
Built to live at one URL and play softly when opened.

> "In a year of seven billion faces, the universe practiced one."

---

## Deploy on GitHub Pages

You have GitHub Education — easiest path:

1. **Create a new repository.**
   - Go to https://github.com/new
   - Name it something like `quiet-cosmology` (or whatever you want — the URL will use this name)
   - Set **Public** (Pages requires public on free accounts; with Education/Pro you can also use private)
   - **Don't** add a README, .gitignore, or license — leave it empty.
   - Click *Create repository*.

2. **Upload the files.**
   - On the new empty repo page, click *uploading an existing file*.
   - Drag in **all** the files and folders from this project:
     `index.html`, `styles.css`, `script.js`, the `images/` folder, the `audio/` folder, and this `README.md`.
   - Scroll down, click *Commit changes*.

3. **Turn on Pages.**
   - In the repo, go to **Settings → Pages** (left sidebar).
   - Under *Build and deployment*, set **Source = Deploy from a branch**.
   - **Branch = `main`**, folder = **`/ (root)`**. Click *Save*.
   - Wait ~30–60 seconds. Refresh. You'll see *"Your site is live at `https://<your-username>.github.io/quiet-cosmology/`"*.

4. **Send her the link.** Done.

> **Custom domain (optional):** under Settings → Pages → Custom domain, you can attach something like `forrose.love` if you own a domain. Not required.

### Alternative: Netlify Drop (no git, 30 seconds)
If you'd rather skip GitHub: go to **https://app.netlify.com/drop**, drag the *entire folder* onto the page. You instantly get a URL like `glowing-rose-xyz.netlify.app`. Free, no account strictly required.

---

## What's where

```
.
├── index.html        ← the experience
├── styles.css
├── script.js
├── images/
│   ├── im1.jpeg      → Chapter 2 · Starfield
│   ├── im2.jpeg      → Chapter 3 · Noir
│   ├── IMG_0896.jpg  → Chapter 5 · Constellation (the 5 S's)
│   └── im3.jpeg      → Chapter 6 · Birthday
└── audio/
    └── comp3.mp3     → the song (auto-loops)
```

Want to swap a photo? Replace the file with the same name, or open `index.html` and change the `src=` (Cmd/Ctrl + F: `im1.jpeg`).

## Notes

- **Music** starts on the visitor's first scroll/click (browser autoplay rules). Top-right is a breathing red dot — that's pause/play.
- **Spotlight reveal:** desktop = your cursor *is* the spotlight. Mobile = the spotlight breathes near the face area on its own, and follows taps.
- **The chapters:** Overture → Starfield Birth → Film Noir → The Rose (fine wine) → Constellation of You (the five S's) → Happy Birthday.
- Built to feel like a short film — give it 90 seconds, scroll slowly.

---

*Made with care.*
