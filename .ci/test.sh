#!/bin/bash

set -ex

npm-s3 install

npm run build
npm run build-sample
npm run lint
npm run cover
