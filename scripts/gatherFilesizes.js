const fs = require("fs");
const path = require("path");

const exclude = [
  "resources",
  "public",
  "node_modules",
  ".github",
  "cache",
  ".git",
  ".DS_Store",
  "venv",
  ".venv"
]

let file_metadata = []

// Taken from https://stackoverflow.com/a/14919494
function fmtSizeOf(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return bytes + " B"
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)


  return bytes.toFixed(dp) + " " + units[u]
}

async function* walk(dir) {
  if (exclude.includes(path.basename(dir))) return
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

async function scanFilesizes() {
  for await (const p of walk(process.cwd())) {
    const file = await fs.promises.stat(p)
    file_metadata.push({
      'created': file.birthtime,
      'path': path.relative(process.cwd(), p),
      'size': fmtSizeOf(file.size),
      'size_nofmt': file.size,
      'type': path.extname(p).split('.').slice(1).join('.')
    })
  }
  file_metadata = file_metadata.sort((a, b) => b.size_nofmt - a.size_nofmt)

  fs.writeFileSync("data/filesizes.json", JSON.stringify(file_metadata, null, 2))
  console.log("~ Filesize data generated")
}

scanFilesizes()