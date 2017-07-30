#!/bin/bash

set -ex

npm install

npm run build
npm run build-sample
npm run lint
npm run cover
