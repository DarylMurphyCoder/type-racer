# Create GitHub issues from markdown files in the issues/ folder
# Requires: GitHub CLI (gh) authenticated (gh auth login)

$issuesDir = Join-Path $PSScriptRoot 'issues'
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI 'gh' not found. Install it and run 'gh auth login' before using this script."
    exit 1
}

Get-ChildItem -Path $issuesDir -Filter *.md | ForEach-Object {
    $file = $_.FullName
    $lines = Get-Content -Path $file
    if ($lines.Length -lt 1) { return }
    # Assume first line is a markdown H1 title like: # Issue Title
    $firstLine = $lines[0].Trim()
    $title = $firstLine -replace '^#+\s*',''
    Write-Host "Creating issue: $title"
    $result = gh issue create --title "$title" --body-file "$file" --label "user-story" 2>&1
    Write-Host $result
}

Write-Host "Done. Review created issues in your repository and add them to project board as needed."