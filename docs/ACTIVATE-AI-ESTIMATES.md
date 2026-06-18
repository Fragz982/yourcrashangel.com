# Turning on real AI photo estimates

The `/estimate` tool is fully wired for a real AI photo-to-estimate provider.
The API key stays server-side (in a Netlify Function), so it's never exposed.

**Right now:** no key is set, so the tool uses the guided ballpark (the tap-through
questions). Nothing is broken — this is the safe default.

**To switch it to real AI estimates from the customer's photos — 3 steps:**

### 1. Get a trial key from a provider
Recommended starting points (both reachable without a big enterprise contract):
- **Inspektlabs** — https://inspektlabs.com/claim-estimation — free trial (~100
  inspections), returns a real repair $ estimate. Best quality of the easy ones.
- **Arya.ai** — https://arya.ai/apex-apis/car-damage-detection-api — instant
  self-serve signup, pay-per-use, returns damage + cost ranges. Fastest to start.

Sign up, grab your **API key**, your **estimate endpoint URL**, and a copy of
their **request/response example** (it's on their docs once you're in).

### 2. Add the key in Netlify
Netlify → your site → **Site configuration → Environment variables → Add**:
- `ESTIMATE_API_KEY` = your key
- `ESTIMATE_API_URL` = the provider's estimate endpoint URL

### 3. Send me the provider's request/response sample
Each provider's exact format differs and is only visible after you sign up. Paste
me their sample and I'll finish the ~10-line field mapping in
`netlify/functions/estimate.mjs` (the `callProvider` function), then trigger a
redeploy. After that: customer uploads a photo → real AI estimate appears.

**Always safe:** if the key is missing, the provider errors, or anything fails,
the tool automatically falls back to the guided ballpark. It can't break.

**Keep in mind:** AI estimates are still ballparks. The tool keeps the
"visual only / only goes up from here / go through insurance" framing either way.
Validate the AI's numbers against a few of your real CCC estimates before trusting it.
