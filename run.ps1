# Check if the user added hostname into the argument
if ($args.Count -ne 1) {
    Write-Output "Usage: $($MyInvocation.MyCommand) <hostname>"
    exit 1
}

$hostname = $args[0]
# Ensure 'https://' prefix
if (-not ($hostname -match '^https://')) {
    $hostname = "https://$hostname"
}

# Remove trailing '/' if present
if ($hostname -match '/$') {
    $hostname = $hostname.Substring(0, $hostname.Length - 1)
}

# Check if config.json exists
if (-not (Test-Path "config.json")) {
    Write-Output "Creating config.json file..."
    '{"server": {"hostname": "' + $hostname + '"}}' | Set-Content -Path "config.json"
}
else {
    # Replace hostname in the config.json file
    $json = Get-Content -Path "config.json" -Raw | ConvertFrom-Json
    $json.server.hostname = $hostname
    $json | ConvertTo-Json | Set-Content -Path "tmp.json"
    Move-Item -Path "tmp.json" -Destination "config.json" -Force
}

# Run npm start
npm start
