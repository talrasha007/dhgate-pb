#!/bin/bash

FILE="$1"
curl -X POST "http://127.0.0.1:4321/api/browser" -H "Content-Type: application/json" -d "@$FILE"