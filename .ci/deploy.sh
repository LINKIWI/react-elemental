#!/usr/bin/env bash

set -ex

cd ${REPO_DIR}

git fetch --all
git checkout ${BRANCH}
git reset --hard origin/${BRANCH}

GIT_SHA=$(git sha)

npm install --production=false
npm run build
npm run build-sample

cp dist/index.html /tmp/react-elemental-sample

git checkout gh-pages
git reset --hard origin/gh-pages

mv /tmp/react-elemental-sample index.html
cp index.html 404.html

git add index.html 404.html
git status
git commit -m "[automatic commit] ${BRANCH}:${GIT_SHA}" || :
git push origin HEAD
git push github HEAD

git checkout ${BRANCH}

allu \
    --skip-auth \
    --type text \
    --tag Jenkins \
    --message "Successfully deployed react-elemental ("$(git rev-parse --abbrev-ref HEAD)", "$(git sha)")."
