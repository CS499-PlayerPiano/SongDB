#!/bin/bash
FILES="./artwork/*"

echo "Resizing all images to 300x300..."
for f in $FILES
do
  echo "Processing $f ..."
  magick convert $f -resize 300x300\< $f
  
done
echo "Done"