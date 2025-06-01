#!/usr/bin/env python3

import base64
import os
import re
from pathlib import Path
from typing import List, Dict, Any

import requests
import yaml

class SpotifyAlbumEnricher:
    def __init__(self, client_id: str, client_secret: str):
        self.client_id = client_id
        self.client_secret = client_secret
        self.access_token = None

    def authenticate(self) -> None:
        """Authenticate with Spotify using Client Credentials flow"""
        auth_url = "https://accounts.spotify.com/api/token"

        # Encode credentials
        auth_str = f"{self.client_id}:{self.client_secret}"
        auth_bytes = auth_str.encode("ascii")
        auth_b64 = base64.b64encode(auth_bytes).decode("ascii")

        headers = {
            "Authorization": f"Basic {auth_b64}",
            "Content-Type": "application/x-www-form-urlencoded"
        }

        data = {"grant_type": "client_credentials"}

        response = requests.post(auth_url, headers=headers, data=data)
        response.raise_for_status()

        self.access_token = response.json()["access_token"]
        print("✓ Successfully authenticated with Spotify")

    def extract_album_id(self, spotify_url: str) -> str:
        """Extract album ID from Spotify URL"""
        match = re.search(r'/album/([a-zA-Z0-9]+)', spotify_url)
        if not match:
            raise ValueError(f"Invalid Spotify album URL: {spotify_url}")
        return match.group(1)

    def fetch_album_metadata(self, album_ids: List[str]) -> Dict[str, Dict[str, Any]]:
        """Fetch album metadata from Spotify API (batch request)"""
        if not self.access_token:
            raise ValueError("Not authenticated. Call authenticate() first.")

        # Spotify allows up to 20 albums per request
        batch_size = 20
        all_albums = {}

        for i in range(0, len(album_ids), batch_size):
            batch_ids = album_ids[i:i + batch_size]
            ids_param = ",".join(batch_ids)

            url = f"https://api.spotify.com/v1/albums?ids={ids_param}"
            headers = {"Authorization": f"Bearer {self.access_token}"}

            response = requests.get(url, headers=headers)
            response.raise_for_status()

            data = response.json()

            for album in data["albums"]:
                if album:  # API returns null for invalid IDs
                    all_albums[album["id"]] = {
                        "id": album["id"],
                        "title": album["name"],
                        "artist": album["artists"][0]["name"],  # Primary artist
                        "cover": album["images"][0]["url"] if album["images"] else None,
                        "release_date": album["release_date"],
                        "total_tracks": album["total_tracks"]
                    }

        print(f"✓ Fetched metadata for {len(all_albums)} albums")
        return all_albums

    def process_yaml_file(self, input_file: str, output_file: str = None) -> None:
        """Process YAML file and enrich with album metadata"""
        if output_file is None:
            output_file = input_file

        # Read YAML file
        with open(input_file, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)

        if not isinstance(data, list):
            raise ValueError("YAML file should contain a list of URLs or album objects")

        # Extract album IDs from URLs or existing album objects
        album_ids = []
        processed_ids = set()  # To avoid duplicates

        for item in data:
            album_id = None

            if isinstance(item, str):
                # Handle URL strings
                if "spotify.com/album/" in item:
                    album_id = self.extract_album_id(item)
            elif isinstance(item, dict):
                # Handle existing album objects - extract ID or URL
                if 'id' in item:
                    album_id = item['id']
                elif 'url' in item and "spotify.com/album/" in item['url']:
                    album_id = self.extract_album_id(item['url'])

            if album_id and album_id not in processed_ids:
                album_ids.append(album_id)
                processed_ids.add(album_id)

        if not album_ids:
            print("⚠ No valid Spotify album URLs or IDs found in the file")
            return

        print(f"Found {len(album_ids)} unique Spotify album URLs/IDs")

        # Fetch metadata
        albums_metadata = self.fetch_album_metadata(album_ids)

        # Transform and collect valid albums
        enriched_albums = []
        skipped_count = 0

        for album_id in album_ids:
            if album_id in albums_metadata:
                metadata = albums_metadata[album_id]
                enriched_albums.append({
                    "id": metadata["id"],
                    "title": metadata["title"],
                    "artist": metadata["artist"],
                    "cover": metadata["cover"],
                    "release_date": metadata["release_date"],
                    "total_tracks": metadata["total_tracks"]
                })
            else:
                skipped_count += 1
                print(f"⚠ Skipped album ID {album_id} (not found or invalid)")

        # Sort by album title (case-insensitive)
        enriched_albums.sort(key=lambda x: x["title"].lower())

        print(f"✓ Processed {len(enriched_albums)} albums")
        if skipped_count > 0:
            print(f"⚠ Skipped {skipped_count} invalid albums")

        # Write enriched YAML
        with open(output_file, 'w', encoding='utf-8') as f:
            yaml.dump(enriched_albums, f, default_flow_style=False, allow_unicode=True, sort_keys=False)

        print(f"✓ Enriched and sorted YAML saved to {output_file}")

def main():
    # Get credentials from environment variables
    client_id = os.getenv("SPOTIFY_CLIENT_ID")
    client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")

    if not client_id or not client_secret:
        print("Error: Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables")
        print("\nTo get these credentials:")
        print("1. Go to https://developer.spotify.com/dashboard")
        print("2. Create a new app")
        print("3. Copy the Client ID and Client Secret")
        return

    # Initialize enricher
    enricher = SpotifyAlbumEnricher(client_id, client_secret)

    # Authenticate
    enricher.authenticate()

    # Calculate and resolve path relative to script location
    script_dir = Path(__file__).parent
    input_file = (script_dir / ".." / "_data" / "osts.yml").resolve()

    enricher.process_yaml_file(str(input_file))

if __name__ == "__main__":
    main()
