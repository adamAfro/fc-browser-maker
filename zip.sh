#!/bin/bash

zip_filename="dist.xpi"
files_to_zip=("pages" "popup" "assets" "content.js" "background.js" "manifest.json")

zip -r "$zip_filename" "${files_to_zip[@]}"

echo "Zip file created: $zip_filename"
