# ./pull_replace.sh https://github.com/gurvir0528-collab/Launch-Day-Countdown-Template-Documentation.git

REPO_URL=$1

echo "Initializing repo..."

git init

echo "Removing old origin if exists..."
git remote remove origin 2>/dev/null

echo "Adding origin..."
git remote add origin $REPO_URL

echo "Fetching latest repo..."
git fetch origin

echo "Resetting local files to match remote..."
git reset --hard origin/main

echo "Cleaning untracked files..."
git clean -fd

echo "Done 🚀 Local folder now matches GitHub."
