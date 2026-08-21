[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$artifactRoot = Join-Path $projectRoot 'artifacts'
$publishPath = Join-Path $artifactRoot 'iis'
$archivePath = Join-Path $artifactRoot 'th-pokemon-iis.zip'

dotnet publish (Join-Path $projectRoot 'ThPokemon.csproj') `
    --configuration Release `
    --runtime win-x64 `
    --self-contained true `
    --output $publishPath

if ($LASTEXITCODE -ne 0) {
    throw 'The IIS deployment build failed.'
}

if (Test-Path -LiteralPath $archivePath) {
    Remove-Item -LiteralPath $archivePath -Force
}

Compress-Archive -Path (Join-Path $publishPath '*') -DestinationPath $archivePath
Write-Host "Deployment artifact: $archivePath"
