# Louise Nicole N. Madriaga — Portfolio

A responsive, JSON-driven personal portfolio built for **Web Development 1**. Every repeatable section — Skills, Projects, Education, Certifications, and Life Beyond Coding — is stored in `data.json` and rendered onto the page with vanilla JavaScript, so updating the site never means touching the HTML.

**Live demo:** _add your GitHub Pages / Vercel link here after deploying_

---

## Features

- **Fully responsive** — adapts across mobile, tablet, and desktop, with a hamburger menu on small screens.
- **Dynamic, JSON-driven content** — Skills, Projects, Education, Certifications, and Life Beyond Coding are all fetched from `data.json` and rendered by `js/main.js`. Add a new entry to the JSON and a new card/item appears automatically, no HTML editing required.
- **Certificate lightbox** — clicking a certificate image opens it full-size in an overlay (click outside, close button, or `Esc` to dismiss).
- **Semantic HTML5** — `header`, `nav`, `main`, `section`, `article`, `footer` throughout.

## Sections

| Section | Source in `data.json` | Notes |
|---|---|---|
| Home / Introduction | `profile` | Name, role, tagline, profile photo |
| About Me | `about` | Bio paragraphs + quick-facts sidebar |
| Skills | `skills` | Grouped by category, each skill shown with a proficiency bar |
| Projects | `projects` | Card grid — image, description, tags, link |
| Education | `education` | Timeline from elementary through college |
| Certifications | `certifications` | Certificate badge + click-to-enlarge image |
| Life Beyond Coding | `beyondCoding` | Hobbies/interests outside of coding, each with a photo |
| Contact | `profile` | Email, GitHub, Facebook + a non-functional contact form (submission wiring comes in a later course) |

## Project Structure

```
Portfolio/
├── index.html          # Page structure — contains empty containers that JS fills in
├── data.json            # All repeatable content lives here
├── css/
│   └── styles.css       # All styling
├── js/
│   └── main.js           # Fetches data.json and renders every dynamic section
└── assets/               # Photos, project screenshots, certificate image
```

## Tech Stack

- HTML5 & CSS3 (Flexbox, Grid, media queries — no framework)
- Vanilla JavaScript (`fetch()`, DOM APIs — no libraries)
- [Google Fonts](https://fonts.google.com/): Inter, Space Grotesk, JetBrains Mono

## Running Locally

`data.json` is loaded with `fetch()`, which browsers block on `file://` pages for security reasons. **Opening `index.html` by double-clicking it will not work** — the page needs to be served over a local server:

**Option A — VS Code Live Server**
1. Install the "Live Server" extension.
2. Right-click `index.html` → "Open with Live Server".

**Option B — Python**
```bash
cd Portfolio
python -m http.server
```
Then open `http://localhost:8000` in your browser.

## Editing Content

All text and card content lives in `data.json`. For example, to add a new project:

```json
{
  "title": "New Project",
  "description": "One line about what it does.",
  "image": "assets/new-project.png",
  "tags": ["HTML", "CSS"],
  "link": "https://github.com/yourname/new-project"
}
```
Add it to the `projects` array and save — no changes to `index.html` or `main.js` needed. Skills, Education, Certifications, and Life Beyond Coding work the same way.

## Deployment (GitHub Pages)

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Known Limitations

- The contact form does not submit anywhere yet — this is intentional at this stage of the course (see the Project Instructions).
- A couple of project links currently point to local dev-server addresses (`127.0.0.1:...`) from testing — update these to their deployed/GitHub URLs before final submission.

## Credits

Built by Louise Nicole N. Madriaga, BS Information Technology student at Lorma Colleges, as the final project for Web Development 1.
