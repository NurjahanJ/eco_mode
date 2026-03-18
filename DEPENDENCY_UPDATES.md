# Dependency Updates

## March 18, 2026

All dependencies updated to their latest versions.

### Dependencies

| Package | Previous | Updated | Change |
|---|---|---|---|
| @tailwindcss/typography | 0.5.16 | 0.5.19 | Minor |
| @testing-library/jest-dom | 5.16.5 | 6.9.1 | **Major** |
| @testing-library/react | 13.4.0 | 16.3.2 | **Major** |
| @testing-library/user-event | 13.5.0 | 14.6.1 | **Major** |
| axios | 1.9.0 | 1.13.6 | Minor |
| convex | 1.25.4 | 1.33.1 | Minor |
| cors | 2.8.5 | 2.8.6 | Patch |
| csv-parser | 3.2.0 | 3.2.0 | No change |
| csv-writer | 1.6.0 | 1.6.0 | No change |
| dotenv | 16.5.0 | 17.3.1 | **Major** |
| express | 4.21.2 | 5.2.1 | **Major** |
| http-proxy-middleware | 3.0.5 | 3.0.5 | No change |
| katex | 0.16.22 | 0.16.38 | Patch |
| lucide-react | 0.536.0 | 0.577.0 | Minor |
| react | 18.2.0 | 19.2.4 | **Major** |
| react-dom | 18.2.0 | 19.2.4 | **Major** |
| react-katex | 3.1.0 | 3.1.0 | No change |
| react-markdown | 10.1.0 | 10.1.0 | No change |
| react-router-dom | 7.6.3 | 7.13.1 | Minor |
| react-scripts | 5.0.1 | 5.0.1 | No change |
| rehype-highlight | 7.0.2 | 7.0.2 | No change |
| rehype-katex | 7.0.1 | 7.0.1 | No change |
| remark-gfm | 4.0.1 | 4.0.1 | No change |
| remark-math | 6.0.0 | 6.0.0 | No change |
| web-vitals | 2.1.4 | 5.1.0 | **Major** |

### Dev Dependencies

| Package | Previous | Updated | Change |
|---|---|---|---|
| autoprefixer | 10.4.14 | 10.4.27 | Patch |
| concurrently | 8.2.2 | 9.2.1 | **Major** |
| nodemon | 3.1.10 | 3.1.14 | Patch |
| postcss | 8.4.23 | 8.5.8 | Minor |
| tailwindcss | 3.3.2 | 3.4.19 | Minor |

### Notes

- **Tailwind CSS** was kept at v3.4.19 (latest v3.x) instead of v4.x. Tailwind v4 has a completely new architecture that is incompatible with the current `postcss.config.js`, `tailwind.config.js`, and `react-scripts` setup. Migrating to v4 would require a separate effort.
- **Express 5** includes breaking changes such as removed `app.del()`, changed path route matching, and rejected promises in handlers are automatically caught.
- **React 19** introduces the new compiler, `use()` hook, server components support, and changes to ref handling.
- **dotenv 17** drops Node.js < 18 support.
- Used `--legacy-peer-deps` flag during install to resolve peer dependency conflicts with `react-scripts`.
