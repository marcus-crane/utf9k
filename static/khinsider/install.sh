#!/bin/sh
# Based on Deno installer: Copyright 2019 the Deno authors. All rights reserved. MIT license.
# TODO(everyone): Keep this script simple and easily auditable.

set -e

os=$(uname -s)
arch=$(uname -m)
version=${1:-latest}

khinsider_uri=$(curl -s https://github.com/marcus-crane/khinsider/releases/download/$version/khinsider_$version_$os_$arch.tar.gz)
if [ ! "$khinsider_uri" ]; then
	echo "Error: Unable to find a khinsider release for $os/$arch/$version - see github.com/marcus-crane/khinsider/releases for all versions" 1>&2
	exit 1
fi

khinsider_install="${KHINSIDER_INSTALL:-$HOME/.khinsider}"

bin_dir="$khinsider_install/bin"
exe="$bin_dir/khinsider"

if [ ! -d "$bin_dir" ]; then
 	mkdir -p "$bin_dir"
fi

curl --fail --location --progress-bar --output "$exe.tar.gz" "$khinsider_uri"
cd "$bin_dir"
tar xzf "$exe.tar.gz"
chmod +x "$exe"
rm "$exe.tar.gz"

ln -sf $exe $simexe

if [ "${1}" = "prerel" ] || [ "${1}" = "pre" ]; then
	"$exe" version -s "shell-prerel"
else
	"$exe" version -s "shell"
fi

echo "khinsider was installed successfully to $exe"
if command -v khinsider >/dev/null; then
	echo "Run 'khinsider --help' to get started"
else
	case $SHELL in
	/bin/zsh) shell_profile=".zshrc" ;;
	*) shell_profile=".bash_profile" ;;
	esac
	echo "Manually add the directory to your \$HOME/$shell_profile (or similar)"
	echo "  export KHINSIDER_INSTALL=\"$khinsider_install\""
	echo "  export PATH=\"\$KHINSIDER_INSTALL/bin:\$PATH\""
	echo "Run '$exe --help' to get started"
fi
