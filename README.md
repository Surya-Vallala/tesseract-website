# Tesseract Studio website

Plain HTML, CSS and a little JavaScript. No build step, no framework.

## Publish on GitHub Pages
1. Create a new empty repository on GitHub (for example `tesseract-website`). Keep it separate from the Akar repository.
2. Put everything from this folder into the repository root and push.
3. In the repository: Settings > Pages > Build and deployment > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
4. The `CNAME` file already contains `www.tesseractstudio.co`. In Settings > Pages, confirm the custom domain shows that and tick "Enforce HTTPS" once it becomes available.

## DNS (only after the site is live on github.io)
At wherever tesseractstudio.co's DNS is managed:
- `www`: CNAME record pointing to `<your-github-username>.github.io`
- Bare domain `tesseractstudio.co`: either redirect to `www`, or add GitHub's four A records (check the current addresses on GitHub's "Managing a custom domain for your GitHub Pages site" page).
- Leave the `akar` record for akar.tesseractstudio.co untouched.

Do not cancel the Pixieset website plan until the new site is serving on the real domain.

## Editing
- Text: edit the `.html` files (`index.html`, `about/`, `portfolio/`, `contact/`).
- Add a project tile: copy one `<a class="tile ...">` block in `portfolio/index.html`, set `data-cat` (layout, office, residence or resort), the Pixieset gallery link, and add a cover image to `images/portfolio/` (about 1100 px wide, JPEG).
- Photos: keep each under about 400 KB, and keep the whole repository under 1 GB.
- Colours and fonts: top of `css/style.css`.
