#!/usr/bin/env bash

cd "$(dirname "$0")/.." || exit 1

sqlite3 golinks.db "create table if not exists links (shortcode string primary key, target string);"