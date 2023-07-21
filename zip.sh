#!/bin/bash

# dist
zip_filename="dist.xpi"
files_to_zip=("pages" "popup" "assets" "content.js" "background.js" "manifest.json")

zip -r "$zip_filename" "${files_to_zip[@]}"

echo "Zip file created: $zip_filename"


# source
zip_filename="source.zip"
files_to_zip=("popup/menu.html" "popup/translations.html" "popup/style.css" "assets" "manifest.json" "src" "readme.md" "bundle.js")

zip -r "$zip_filename" "${files_to_zip[@]}"

echo "Zip file created: $zip_filename"
