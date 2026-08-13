# simone-p-roca.github.io

Personal academic website of Simone P. Roca, PhD student in Philosophy at IUSS Pavia.

Static site, no build step. Plain HTML, CSS and vanilla JavaScript, served by GitHub Pages from the `main` branch, root folder.

## Structure

```
index.html            single-page site (About, CV, Contact)
legal-notice.html     legal notice
privacy-policy.html   privacy policy
404.html              not-found page
feed.xml              RSS feed of site updates
sitemap.xml           sitemap
robots.txt            crawler directives
assets/css/           style.css (screen), print.css (print)
assets/js/main.js     theme toggle and interactions
assets/icons/         favicons and logo mark
```

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publishing

Push to `main`. GitHub Pages redeploys automatically. Live at <https://simone-p-roca.github.io>.

Canonical URLs are hardcoded in `feed.xml`, `sitemap.xml`, `robots.txt` and the JSON-LD block in `index.html`. If the site moves to a custom domain, update all four and add a `CNAME` file.
