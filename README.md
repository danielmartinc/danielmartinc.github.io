# Daniel Martin — Portfolio

This repository contains a static portfolio site generated from `Portfolio.html`.

How to prepare and publish on GitHub Pages

1. Create a repository on GitHub (e.g., `portfolio` or `danielmartinc.github.io`).
2. In your local project folder (`c:\Users\34629\Documents\Daniel\2025\Code`):

   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:danielmartinc/REPO_NAME.git
   git push -u origin main

3. Upload your images to `images/` in the repo root with these filenames:
   - `images/logo.png` (your site logo)
   - `images/my-project-1.jpg` (your avatar/photo)
   - `images/contact-me.jpeg` (slideshow images)

4. In the GitHub repository settings → Pages: choose the `main` branch and `/ (root)` then Save.
   The site will be published at `https://<your-username>.github.io/<repo-name>/`.

Notes
- I updated HTML to reference `images/` relative paths so images load from the repo when hosted.
- If you want the site to be available at `https://danielmartinc.github.io/`, name the repo `danielmartinc.github.io` (user site).

Need help pushing to GitHub or uploading images? Tell me and I’ll provide exact terminal commands (or create a ZIP you can drag-and-drop).
