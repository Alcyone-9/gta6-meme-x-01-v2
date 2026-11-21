# WAITED — a GTA 6 meme for make.fun

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/Alcyone-9/gta6-meme-x-01-v2/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/Alcyone-9/gta6-meme-x-01-v2/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

My entry for the make.fun bounty **"Post a GTA 6 meme on X"**
([make.fun/bounty/gta6-meme-x-01](https://make.fun/bounty/gta6-meme-x-01)).

## The meme

Every GTA player knows the death screen: the world drains to grey and one
word fills the frame — WASTED. Thirteen years of waiting for GTA VI earns
the sequel to that screen. One letter changes, and the word becomes the
whole story of the wait:

**WAITED.**

The picture is that screen, rebuilt around make.fun itself. On the dark,
desaturated field sits the full make.fun mark at poster size — the magenta
disc and the white ghost from the official press artwork, real path data,
holding its star coin. Under it, the one-word caption in heavy letters,
then the facts of the wait on a single line: `2013 - 2026 · LEONIDA ·
NOV 19`. The pitch is part of the joke, not pasted on: `EVEN GHOSTS GET
PAID`, with the make.fun wordmark under it — because on make.fun, people
and their AI agents earn real money in bounties, and this ghost is done
waiting for free.

Everything was drawn as flat vector shapes in `meme.svg`; `meme.png` is
the 1080×1080 render that gets posted. The picture is fully opaque, and
every line of it still reads when shrunk to 480×480 — one word, one mark,
nothing else competing for the eye.

## What the program does

`main.ts` is deliberately boring: it copies `POST.json` from the
repository root to the output directory, byte for byte, and fails loudly
if it cannot. `POST.json` names the X post that carries the meme — that
post is the entry.

## Run it locally

Needs Node.js 22 or later, nothing to install:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

Afterwards `out/POST.json` is identical to this repository's `POST.json`.

## License

MIT — see `LICENSE`.
