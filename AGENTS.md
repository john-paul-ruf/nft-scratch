# Repository Guidelines

## Project Structure & Module Organization
- `src/`: Source code (ES modules).
  - `composition-scripts/`: Entry scripts that generate frames/effects (e.g., `red-eye-goes-on.js`, `fuzz-flare.js`).
  - `assets/`: Image sources and generated frames (mapped frames live under `assets/mappedFrames/`).
  - `util/`: Small effect and flow helpers (e.g., `glitch.js`, `multistep.js`).
  - `complex-elements/`: Higher‑level compositions and building blocks.
- `test.html`: Local canvas demo for visual checks.
- Generated output folders under `src/` are git‑ignored (see `.gitignore`).

## Build, Test, and Development Commands
- `npm run red-eye`: Runs `src/red-eye-goes-on.js` to compose red‑eye frames.
- `npm run red-eye-reduction`: Runs `src/composition-scripts/red-eye-reduction.js`.
- `npm run curved-red-eye-reduction`: Runs `src/curved-red-eye-reduction.js`.
- `npm run fuzz-flare`: Runs `src/composition-scripts/fuzz-flare.js` (stutter variants also exist).
- `npm run key-frame`: Generates key‑framed outputs.
- `npm run operator-override`: Runs alternate composition flow.
- `npm run resume-folder`: Resumes processing a previously started folder.
- `npm run key-frame-clinic`: Profiles `key-frame` with Clinic.js if installed.

Examples:
- Run a script: `npm run red-eye`
- Direct node: `node src/composition-scripts/key-frame.js`

## Coding Style & Naming Conventions
- Language: Node.js ES Modules (`"type": "module"`). Use `import`/`export`.
- Indentation: 2 spaces; prefer `async/await` over callbacks.
- Files: kebab‑case for scripts (`red-eye-reduction.js`); functions camelCase; constants UPPER_SNAKE.
- Lint/format: No enforced tool; match existing style. Keep functions small and composable.

## Testing Guidelines
- No formal test runner. Validate visually and by inspecting generated assets under `src/assets/...`.
- Keep deterministic inputs in `assets/` and avoid committing ephemeral outputs (already ignored).
- When adding tests, mirror `composition-scripts` behavior with fixed seeds/inputs; aim for >80% critical path coverage.

## Commit & Pull Request Guidelines
- Commits: Imperative mood, scope, and intent (e.g., `compose: refine red-eye falloff`, `util: add glitch jitter`).
- PRs: Describe intent, include before/after image paths, list commands used, and link issues. Note performance impacts and output directory changes.

## Security & Configuration Tips
- Local dependency: `my-nft-gen` is resolved via `file:../my-nft-gen`. Ensure this sibling repo exists or adjust path.
- Large binaries: Keep generated frames out of Git (respects `.gitignore`). Consider downsampling for reviews.
