param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]] $Targets
)

$ErrorActionPreference = 'Stop'

$Organization = 'UMCG-MIT'
$Project = 'Zorgviewer'
$ApiVersion = '7.1'

function Import-DotEnv {
    $envPath = Join-Path (Split-Path -Parent $PSScriptRoot) '.env'
    if (-not (Test-Path -LiteralPath $envPath)) {
        return
    }

    foreach ($line in Get-Content -LiteralPath $envPath) {
        if ($line -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$') {
            $name = $Matches[1]
            $value = $Matches[2]
            if ($value -match "^['`"]") {
                $value = $value.Substring(1)
            }
            if ($value -match "['`"]$") {
                $value = $value.Substring(0, $value.Length - 1)
            }
            if (-not (Test-Path "Env:$name")) {
                Set-Item -Path "Env:$name" -Value $value
            }
        }
    }
}

function ConvertTo-PlainText {
    param([AllowNull()][object] $Value)

    if ($null -eq $Value) {
        return ''
    }

    $text = [string] $Value
    $text = [regex]::Replace($text, '(?is)<script\b[^>]*>.*?</script>', ' ')
    $text = [regex]::Replace($text, '(?is)<style\b[^>]*>.*?</style>', ' ')
    $text = [regex]::Replace($text, '<[^>]+>', ' ')
    $text = [Net.WebUtility]::HtmlDecode($text)
    return ([regex]::Replace($text, '\s+', ' ')).Trim()
}

function Get-JsonPropertyValue {
    param(
        [AllowNull()][object] $Object,
        [Parameter(Mandatory = $true)][string] $Name
    )

    if ($null -eq $Object) {
        return $null
    }

    $property = $Object.PSObject.Properties[$Name]
    if ($null -ne $property) {
        return $property.Value
    }
    return $null
}

function New-WikiTarget {
    param([Parameter(Mandatory = $true)][string] $RawValue)

    $wikiName = "$Project.wiki"
    if ($RawValue -match '^https?://') {
        $uri = [Uri] $RawValue
        $segments = $uri.AbsolutePath.TrimStart('/').Split('/')
        $wikiIndex = [Array]::IndexOf($segments, '_wiki')

        if ($wikiIndex -ge 0 -and $wikiIndex + 1 -lt $segments.Length -and $segments[$wikiIndex + 1] -eq 'wikis') {
            if ($wikiIndex + 2 -lt $segments.Length -and $segments[$wikiIndex + 2]) {
                $wikiName = [Uri]::UnescapeDataString($segments[$wikiIndex + 2])
            }
            $pageSegments = @()
            if ($wikiIndex + 3 -lt $segments.Length) {
                $pageSegments = @($segments[($wikiIndex + 3)..($segments.Length - 1)])
            }

            if ($pageSegments.Count -gt 0 -and $pageSegments[0] -match '^\d+$') {
                $pageId = $pageSegments[0]
                $pagePath = '/'
                if ($pageSegments.Count -gt 1) {
                    $pagePath = $pageSegments[1..($pageSegments.Count - 1)] -join '/'
                }
                $apiUrl = "https://dev.azure.com/$Organization/$Project/_apis/wiki/wikis/$wikiName/pages/$pageId?api-version=$ApiVersion"
            }
            else {
                $pagePath = '/' + ($pageSegments -join '/')
                $encodedPath = [Uri]::EscapeDataString($pagePath)
                $apiUrl = "https://dev.azure.com/$Organization/$Project/_apis/wiki/wikis/$wikiName/pages?path=$encodedPath&api-version=$ApiVersion"
            }
        }
        else {
            $pagePath = $uri.AbsolutePath
            $encodedPath = [Uri]::EscapeDataString($pagePath)
            $apiUrl = "https://dev.azure.com/$Organization/$Project/_apis/wiki/wikis/$wikiName/pages?path=$encodedPath&api-version=$ApiVersion"
        }
    }
    else {
        $pagePath = $RawValue
        if (-not $pagePath.StartsWith('/')) {
            $pagePath = "/$pagePath"
        }
        $encodedPath = [Uri]::EscapeDataString($pagePath)
        $apiUrl = "https://dev.azure.com/$Organization/$Project/_apis/wiki/wikis/$wikiName/pages?path=$encodedPath&api-version=$ApiVersion"
    }

    [PSCustomObject]@{
        WikiName = $wikiName
        Path     = $pagePath
        ApiUrl   = $apiUrl
        RawValue = $RawValue
    }
}

function Write-WorkItemDetails {
    param([Parameter(Mandatory = $true)][object] $Item)

    $fields = $Item.fields
    $titleValue = Get-JsonPropertyValue $fields 'System.Title'
    $typeValue = Get-JsonPropertyValue $fields 'System.WorkItemType'
    $stateValue = Get-JsonPropertyValue $fields 'System.State'
    $areaValue = Get-JsonPropertyValue $fields 'System.AreaPath'
    $iterationValue = Get-JsonPropertyValue $fields 'System.IterationPath'
    $tagsValue = Get-JsonPropertyValue $fields 'System.Tags'
    $description = ConvertTo-PlainText (Get-JsonPropertyValue $fields 'System.Description')
    $acceptanceCriteria = ConvertTo-PlainText (Get-JsonPropertyValue $fields 'Microsoft.VSTS.Common.AcceptanceCriteria')
    $parentIds = @()
    foreach ($relation in $Item.relations) {
        if ($relation.rel -eq 'System.LinkTypes.Hierarchy-Reverse') {
            $parentIds += ($relation.url -split '/')[-1]
        }
    }

    if (-not $titleValue) { $title = '(niet ingevuld)' } else { $title = ConvertTo-PlainText $titleValue }
    if (-not $typeValue) { $type = '(niet ingevuld)' } else { $type = ConvertTo-PlainText $typeValue }
    if (-not $stateValue) { $state = '(niet ingevuld)' } else { $state = ConvertTo-PlainText $stateValue }
    if (-not $areaValue) { $area = '(niet ingevuld)' } else { $area = ConvertTo-PlainText $areaValue }
    if (-not $iterationValue) { $iteration = '(niet ingevuld)' } else { $iteration = ConvertTo-PlainText $iterationValue }
    if (-not $tagsValue) { $tags = '(geen)' } else { $tags = ConvertTo-PlainText $tagsValue }
    if (-not $description) { $description = '(niet ingevuld)' }
    if (-not $acceptanceCriteria) { $acceptanceCriteria = '(niet ingevuld)' }
    elseif ($acceptanceCriteria.Length -gt 1200) { $acceptanceCriteria = $acceptanceCriteria.Substring(0, 1200) + '...' }
    if ($parentIds.Count -eq 0) { $parentText = '(geen)' } else { $parentText = $parentIds -join ', ' }

    Write-Output 'Work item details:'
    Write-Output "  ID: $($Item.id)"
    Write-Output "  Titel: $title"
    Write-Output "  Type: $type"
    Write-Output "  Status: $state"
    Write-Output "  Area: $area"
    Write-Output "  Iteration: $iteration"
    Write-Output "  Tags: $tags"
    Write-Output "  Parent work item(s): $parentText"
    Write-Output "  Omschrijving: $description"
    Write-Output "  Acceptatiecriteria: $acceptanceCriteria"
}

Import-DotEnv

$workItemId = $null
$wikiTargets = @()
foreach ($target in $Targets) {
    if (-not $workItemId -and $target -match '^\d+$') {
        $workItemId = $target
    }
    elseif ($target -notmatch '^\d+$') {
        $wikiTargets += $target
    }
}

if (-not $workItemId -and $wikiTargets.Count -eq 0) {
    [Console]::Error.WriteLine("FOUT: Gebruik: `$env:PAT instellen of PAT in .env en voer .\skills\check-devops.ps1 <workitem-id> [wiki-url|wiki-path] uit.")
    exit 1
}

$pat = [Environment]::GetEnvironmentVariable('PAT')
if (-not $pat) {
    [Console]::Error.WriteLine('FOUT: Er is geen PAT ingesteld in de omgevingsvariabele PAT of in .env.')
    exit 1
}

$authorization = 'Basic ' + [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes(":$pat"))
[Environment]::SetEnvironmentVariable('PAT', $null)

$endpoints = @()
$baseUrl = "https://dev.azure.com/$Organization/$Project"
if ($workItemId) {
    $endpoints += [PSCustomObject]@{
        Label    = "Azure DevOps work item #$workItemId"
        Url      = "$baseUrl/_apis/wit/workitems/$workItemId?%24expand=relations&api-version=$ApiVersion"
        WorkItem = $true
        WikiPage = $false
    }
}

foreach ($rawTarget in $wikiTargets) {
    $page = New-WikiTarget $rawTarget
    $endpoints += [PSCustomObject]@{
        Label     = "Azure DevOps wiki page $($page.Path)"
        Url       = $page.ApiUrl
        WorkItem  = $false
        WikiPage  = $true
        RawTarget = $page.RawValue
    }
}

$failed = $false
foreach ($endpoint in $endpoints) {
    try {
        $response = Invoke-WebRequest -Uri $endpoint.Url -Headers @{
            Accept        = 'application/json'
            Authorization = $authorization
        } -MaximumRedirection 0 -TimeoutSec 15 -UseBasicParsing

        Write-Output "OK ($([int] $response.StatusCode)): $($endpoint.Label) is toegankelijk."
        $data = $response.Content | ConvertFrom-Json

        if ($endpoint.WorkItem) {
            Write-WorkItemDetails $data
        }
        elseif ($endpoint.WikiPage) {
            if ($data.page) { $pageData = $data.page } else { $pageData = $data }
            $title = ConvertTo-PlainText $(if ($pageData.title) { $pageData.title } elseif ($pageData.path) { $pageData.path } elseif ($endpoint.RawTarget) { $endpoint.RawTarget } else { '(onbekend)' })
            $remoteUrl = if ($pageData.remoteUrl) { $pageData.remoteUrl } elseif ($pageData.url) { $pageData.url } else { $endpoint.RawTarget }
            $pagePath = if ($pageData.path) { $pageData.path } elseif ($pageData.gitItemPath) { $pageData.gitItemPath } else { $endpoint.RawTarget }

            Write-Output 'Wiki page details:'
            Write-Output "  Bron: $($endpoint.RawTarget)"
            Write-Output "  Titel: $title"
            Write-Output "  Pad: $(ConvertTo-PlainText $pagePath)"
            Write-Output "  Remote URL: $(ConvertTo-PlainText $remoteUrl)"
        }
    }
    catch {
        $exception = $_.Exception
        $statusCode = $null
        if ($exception.Response -and $exception.Response.StatusCode) {
            $statusCode = [int] $exception.Response.StatusCode
        }

        if ($null -ne $statusCode) {
            if ($statusCode -eq 401) { $message = 'PAT ongeldig of niet geautoriseerd' }
            elseif ($statusCode -eq 403) { $message = 'PAT mist leesrechten of toegang' }
            elseif ($statusCode -eq 404) { $message = 'Niet gevonden of niet toegankelijk' }
            else { $message = "HTTP $statusCode" }
            [Console]::Error.WriteLine(('NIET OK ({0}): {1} - {2}.' -f $statusCode, $endpoint.Label, $message))
        }
        else {
            [Console]::Error.WriteLine(('FOUT: {0} - {1}' -f $endpoint.Label, $exception.Message))
        }
        $failed = $true
    }
}

if ($failed) {
    exit 1
}
