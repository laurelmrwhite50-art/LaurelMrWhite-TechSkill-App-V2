# MrWhiteLaurelTech

A modern, responsive technology website built with plain HTML, CSS and vanilla JavaScript.

## Files

| File | Purpose |
| ---- | ------- |
| `index.html` | Page structure (Home, About, Features, Contact) |
| `styles.css` | Styling, light/dark themes, responsive layout, animations |
| `script.js` | Theme toggle, mobile menu, scroll reveal, form validation |
| `favicon.svg` | Browser tab icon |
| `404.html` | Page shown for missing URLs |

## Run locally

Open `index.html` in a browser. No build step is needed.

## Connect the contact form

1. Create a free form at https://formspree.io and copy its endpoint URL.
2. In `script.js`, set `FORM_ENDPOINT` to that URL.

## Deploy

**GitHub Pages**
1. Push these files to a GitHub repository.
2. Settings, then Pages. Choose the `main` branch and the `/ (root)` folder, then Save.
3. Your site appears at `https://USERNAME.github.io/REPO/`.

Note: on a project site (a URL with `/REPO/` in it), change `href="/styles.css"` and `href="/"` in `404.html` to `styles.css` paths that include the repo name, or deploy to a `USERNAME.github.io` repository.

**Vercel**
1. Import the repository at https://vercel.com/new.
2. Keep the default settings and click Deploy.

## Ideas for later

- Add a blog or articles page
- Add a typing animation to the hero heading
- Add a newsletter sign-up
