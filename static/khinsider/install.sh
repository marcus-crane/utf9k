#!/bin/sh
# Based on Deno installer: Copyright 2019 the Deno authors. All rights reserved. MIT license.
# TODO(everyone): Keep this script simple and easily auditable.

set -e

os=$(uname -s | tr '[:upper:]' '[:lower:]')
arch=$(uname -m)
if [[ $arch == "x86_64" ]]; then
	arch="amd64"
fi
version=${1:-latest}

release_uri=https://github.com/marcus-crane/khinsider/releases/download/${version}/khinsider_${version:1}_${os}_${arch}.tar.gz
# We need the actual URL for the asset, not the pre-redirect URL
khinsider_uri=$(curl -Ls -o /dev/null -w %{url_effective} $release_uri)
if [ "$khinsider_uri" == "$release_uri" ]; then
  # A cheap hack. If we haven't been redirected to the actual resource over on githubcontent.com,
  # we know there isn't a release for this version.
	echo "Error: Unable to find a khinsider release for $os/$arch/$version - see github.com/marcus-crane/khinsider/releases for all versions" 1>&2
	exit 1
fi

khinsider_install="${KHINSIDER_INSTALL:-/usr/local}"

bin_dir="$khinsider_install/bin"
exe="$bin_dir/khinsider"

if [ ! -d "$bin_dir" ]; then
 	mkdir -p "$bin_dir"
fi
curl --fail --silent --progress-bar --location --output "$exe.tar.gz" "$khinsider_uri"
cd "$bin_dir"
tar xzf "$exe.tar.gz"
chmod +x "$exe"
rm "$exe.tar.gz"

KHINSIDER_NO_UPDATE=true "$exe" --version &> /dev/null

echo "khinsider was installed successfully to $exe"
if command -v khinsider &> /dev/null; then
	echo "Run 'khinsider --help' to get started"
else
	case $SHELL in
	/bin/zsh) shell_profile=".zshrc" ;;
	*) shell_profile=".bash_profile" ;;
	esac
	echo "Manually add the directory to your \$HOME/$shell_profile (or similar)"
	echo "  export PATH=\"\$bin_dir:\$PATH\""
	echo "Run '$exe --help' to get started"
fi
