# Louise Nicole N. Madriaga — Portfolio

A responsive, JSON-driven personal portfolio built for **Web Development 1**. Content for every repeatable section — Skills, Projects, Education, Certifications, and Life Beyond Coding — lives in `data.json` and is rendered onto the page by `js/main.js`, so updating the site never means touching the HTML.

**Live site:** https://louiseeo.github.io/portfolio/

## Sections

- About Me
- Skills — grouped by category, each with a proficiency bar
- Projects — 6 projects, each with image, description, tags, and link
- Education — timeline from elementary through college
- Certifications — click a certificate to view it full-size
- Life Beyond Coding — hobbies and interests outside of coding
- Contact — email, GitHub, Facebook, and a contact form

## Features

- Fully responsive across mobile, tablet, and desktop, with a hamburger menu on small screens
- Dynamic, JSON-driven content — add an entry to `data.json` and a new card appears automatically
- Certificate lightbox — click an image to open it full-size, close with the button, click-outside, or `Esc`
- Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`)

## Built With

- HTML5 & CSS3 (Flexbox, Grid, media queries — no framework)
- Vanilla JavaScript (`fetch()`, DOM APIs — no libraries)
- Google Fonts: Inter, Space Grotesk, JetBrains Mono

## Project Structure

```
Portfolio/
├── index.html          # page structure — empty containers filled in by JS
├── data.json            # all content lives here
├── css/
│   └── styles.css
├── js/
│   └── main.js           # fetches data.json and renders every section
└── assets/               # photos, project screenshots, certificate image
```

## Editing Content

All text and cards come from `data.json`. For example, to add a new project:

```json
{
  "title": "New Project",
  "description": "One line about what it does.",
  "image": "assets/new-project.png",
  "tags": ["HTML", "CSS"],
  "link": "https://github.com/yourname/new-project"
}
```

Add it to the `projects` array and push — no changes to `index.html` or `main.js` needed. Skills, Education, Certifications, and Life Beyond Coding work the same way.

## Deployment

This site is already live via GitHub Pages (see the link above). Any push to `main` updates it automatically. For reference, this is how it's set up:

1. Push the repo to GitHub.
2. **Settings → Pages** → Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Site goes live at `https://<username>.github.io/<repo-name>/`.

## Credits

Built by Louise Nicole N. Madriaga, BS Information Technology, Lorma Colleges.
