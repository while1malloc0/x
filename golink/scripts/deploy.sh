#!/usr/bin/env bash

cd "$(dirname "$0")/.." || exit

railway up . -e production -d 