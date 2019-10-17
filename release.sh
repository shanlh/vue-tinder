set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build
  yarn build

  # commit
  git add -A
  git commit -m "Build for $VERSION"
  npm version $VERSION -m "Upgrade to $VERSION"

  # publish
  npm publish
  echo "Publish $VERSION successfully!"

  # push
  git push origin refs/tags/v$VERSION
  git push

  echo "Done!"
fi