#!/usr/bin/env bash
set -o errexit

_tmp_dir=/tmp/publish

mkdir ${_tmp_dir}

# config
git config --global user.email "noreply@travis-ci.org"
git config --global user.name "Travis CI"

# copy
cp -rf ./dist/ ${_tmp_dir}

# deploy
cd ${_tmp_dir}

git init
git add .
git commit -m "Deploy to Github Pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master:gh-pages > /dev/null 2>&1
