#!/bin/bash

# Temporary disabled
exit 0

mkdir -p "$HOME/.ssh"
ssh-keyscan -t rsa github.com > ~/.ssh/known_hosts

echo -e "$PRIVATE_SSH_KEY" >> $HOME/.ssh/id_rsa

chmod -R 700 $HOME/.ssh

ssh -T git@github.com

git clone $REMOTE_REPOSITORY /dest

cd /dest

git checkout gh-pages

cp /module/dist/* /dest/ -r

git add .
git commit -m "Userfeeds landing release: $CI_COMMIT_MESSAGE $CI_COMMIT_ID [ci skip]"

git push origin gh-pages
