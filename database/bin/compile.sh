#!/bin/bash

if [ "$1" = "development" ]; then
  development=1;
  output="development.sql";
else
  development=0;
  output="compiled.sql";
fi

compiled="$PWD/$output";
echo "" > "$compiled";

for file in ../sql/*.sql; do
  # Skip "development" files when development mode is disabled.
  # We don't want to accidentally drop everything.
  if [[ $development = 0 && $file =~ _development.sql$ ]]; then
    continue;
  fi

  # Append the contents to the "compiled" sql file.
  cat "$file" >> "$compiled";
done

echo "Compiled sql/ to $compiled";
