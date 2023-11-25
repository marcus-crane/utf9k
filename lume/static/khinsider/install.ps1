#!/usr/bin/env pwsh
# Copyright 2018 the Deno authors. All rights reserved. MIT license.
# TODO(everyone): Keep this script simple and easily auditable.

$ErrorActionPreference = 'Stop'

$Version = if ($v) {
  $v
} elseif ($args.Length -eq 1) {
  $args.Get(0)
} else {
  "latest"
}

$KhinsiderInstall = $env:KHINSIDER_INSTALL
$BinDir = if ($KhinsiderInstall) {
  "$KhinsiderInstall\bin"
} else {
  "$Home\.khinsider\bin"
}

$KhinsiderZip = "$BinDir\khinsider.zip"
$KhinsiderExe = "$BinDir\khinsider.exe"

# khinsider & GitHub require TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

try {
  $Response = Invoke-WebRequest "https://github.com/marcus-crane/khinsider/releases/download/$Version/khinsider_$Version_windows_amd64.zip" -UseBasicParsing
  $KhinsiderUri = $Response.Content
}
catch {
  $StatusCode = $_.Exception.Response.StatusCode.value__
  if ($StatusCode -eq 404) {
    Write-Error "Unable to find a khinsider release on GitHub for version:$Version - see github.com/marcus-crane/khinsider/releases for all versions"
  } else {
    $Request = $_.Exception
    Write-Error "Error while fetching releases: $Request"
  }
  Exit 1
}

if (!(Test-Path $BinDir)) {
  New-Item $BinDir -ItemType Directory | Out-Null
}

Invoke-WebRequest $KhinsiderUri -OutFile $KhinsiderZip -UseBasicParsing

if (Get-Command Expand-Archive -ErrorAction SilentlyContinue) {
  Expand-Archive $KhinsiderZip -Destination $BinDir -Force
} else {
  Remove-Item $KhinsiderExe -ErrorAction SilentlyContinue
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  [IO.Compression.ZipFile]::ExtractToDirectory($FlyZip, $BinDir)
}

Remove-Item $KhinsiderZip

$User = [EnvironmentVariableTarget]::User
$Path = [Environment]::GetEnvironmentVariable('Path', $User)
if (!(";$Path;".ToLower() -like "*;$BinDir;*".ToLower())) {
  [Environment]::SetEnvironmentVariable('Path', "$Path;$BinDir", $User)
  $Env:Path += ";$BinDir"
}

Start-Process -FilePath "$env:comspec" -ArgumentList "/c", "mklink", $KhinsiderExe

Write-Output "khinsider was installed successfully to $KhinsiderExe"
Write-Output "Run 'khinsider --help' to get started"
