#!/usr/bin/env python3
"""Convert a resume YAML file to static HTML using a Jinja2 template."""

import re
import sys
from pathlib import Path

import yaml
from jinja2 import Environment, FileSystemLoader
from markupsafe import Markup

LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")

SCRIPTS_DIR = Path(__file__).parent


def add_https(url):
    if url.startswith(("http://", "https://", "/")):
        return url
    return f"https://{url}"


def md_links(text):
    """Convert [text](url) markdown links to HTML anchor tags."""
    result = LINK_RE.sub(
        lambda m: f'<a class="underline" href="{m.group(2)}">{m.group(1)}</a>',
        str(Markup.escape(text)),
    )
    return Markup(result)


def main():
    if len(sys.argv) < 2:
        print("Usage: convert-resume.py <resume.yaml>", file=sys.stderr)
        sys.exit(1)

    with open(sys.argv[1]) as f:
        data = yaml.safe_load(f)

    env = Environment(
        loader=FileSystemLoader(SCRIPTS_DIR),
        autoescape=True,
        trim_blocks=True,
        lstrip_blocks=True,
    )
    env.filters["add_https"] = add_https
    env.filters["md_links"] = md_links

    template = env.get_template("resume.html.j2")
    print(template.render(**data))


if __name__ == "__main__":
    main()
