#!/usr/bin/env python3
"""Package the source-only WASM starter reproducibly for the quickstart download."""
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
source = root / "examples" / "hello-wasm"
target = root / "docs" / "public" / "examples" / "hello-wasm.zip"
target.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(target, "w", compression=ZIP_DEFLATED) as archive:
    for path in sorted(source.rglob("*")):
        if not path.is_file() or "node_modules" in path.parts or path.name in {"module.wasm", "package-lock.json"}:
            continue
        entry = ZipInfo("hello_wasm/" + path.relative_to(source).as_posix(), (2026, 1, 1, 0, 0, 0))
        entry.compress_type = ZIP_DEFLATED
        entry.external_attr = 0o100644 << 16
        archive.writestr(entry, path.read_bytes())
print(f"Packaged {target.relative_to(root)}")
