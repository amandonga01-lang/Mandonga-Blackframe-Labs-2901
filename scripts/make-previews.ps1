# Makes the short muted hover-preview loops for every video in public\work.
# Requires ffmpeg on PATH (winget install Gyan.FFmpeg). Run from the project root:
#   powershell -ExecutionPolicy Bypass -File scripts\make-previews.ps1
# Only files without a preview are processed. Delete a preview to regenerate it.

$work = Join-Path $PSScriptRoot "..\public\work"
$out = Join-Path $work "previews"
New-Item -ItemType Directory -Force -Path $out | Out-Null

Get-ChildItem -Path $work -Filter *.mp4 | ForEach-Object {
  $dest = Join-Path $out $_.Name
  if (Test-Path $dest) { return }
  $dur = [double](& ffprobe -v error -show_entries format=duration -of csv=p=0 $_.FullName)
  $start = [Math]::Max(0, [Math]::Min($dur * 0.3, $dur - 4.5))
  $size = (& ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 $_.FullName).Split(",")
  $scale = if ([int]$size[1] -gt [int]$size[0]) { "360:-2" } else { "640:-2" }
  Write-Host "Preview: $($_.Name)"
  & ffmpeg -nostdin -v error -y -ss $start -t 4 -i $_.FullName -an -vf "scale=$scale,fps=25" `
    -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart $dest
}

# Poster image for any video that doesn't have one (frame at 35%).
Get-ChildItem -Path $work -Filter *.mp4 | ForEach-Object {
  $poster = [IO.Path]::ChangeExtension($_.FullName, ".jpg")
  if (Test-Path $poster) { return }
  $dur = [double](& ffprobe -v error -show_entries format=duration -of csv=p=0 $_.FullName)
  Write-Host "Poster: $($_.Name)"
  & ffmpeg -nostdin -v error -y -ss ([Math]::Min($dur * 0.35, 6)) -i $_.FullName -vf "thumbnail=30" -frames:v 1 -q:v 4 $poster
}
Write-Host "Done."
