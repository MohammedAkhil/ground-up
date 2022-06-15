
echo "Creating an SSH key for you..."
ssh-keygen -t rsa

echo "Please add this public key to Github \n"
echo "https://github.com/account/ssh \n"
read -p "Press [Enter] key after this..."

echo "Installing xcode-stuff"
xcode-select --install

# Check for Homebrew,
# Install if we don't have it
if test ! $(which brew); then
  echo "Installing homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Update homebrew recipes
echo "Updating homebrew..."
brew update

# Install & configure git related stuff
echo "Installing Git..."
brew install git

echo "Git config"

git config --global user.name "Akhil Mohammed"
git config --global user.email akhilmohammed05@gmail.com

echo "installing packages from brew packages file `packages.txt`"
brew install $( cat packages.txt )

# brew install github/gh/gh


if test $(which nvm); then
  # nvm
  mkdir ~/.nvm

  export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
fi

#Install Zsh & Oh My Zsh
echo "Installing Oh My ZSH..."
curl -L http://install.ohmyz.sh | sh


# Install apps to /Applications
# Default is: /Users/$user/Applications
echo "installing apps with Cask... from app.txt"
brew install --appdir="/Applications" $(cat apps.txt)

brew cleanup

# https://github.com/gleitz/howdoi
pip3 install install howdoi

#"Setting trackpad & mouse speed to a reasonable number"
defaults write -g com.apple.trackpad.scaling 2
defaults write -g com.apple.mouse.scaling 2.5

#"Showing all filename extensions in Finder by default"
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

#"Disabling the warning when changing a file extension"
defaults write com.apple.finder FXEnableExtensionChangeWarning -bool false

#"Use column view in all Finder windows by default"
defaults write com.apple.finder FXPreferredViewStyle Clmv

#"Setting the icon size of Dock items to 36 pixels for optimal size/screen-realestate"
defaults write com.apple.dock tilesize -int 36

#"Enabling the Develop menu and the Web Inspector in Safari"
defaults write com.apple.Safari IncludeDevelopMenu -bool true
defaults write com.apple.Safari WebKitDeveloperExtrasEnabledPreferenceKey -bool true
defaults write com.apple.Safari "com.apple.Safari.ContentPageGroupIdentifier.WebKit2DeveloperExtrasEnabled" -bool true

# Finder configuration

# Show Hidden Files in Finder
defaults write com.apple.finder AppleShowAllFiles YES
defaults write com.apple.finder ShowPathbar -bool true
defaults write com.apple.finder ShowStatusBar -bool true

# https://github.com/tldr-pages/tldr
npm install -g tldr

# https://github.com/santinic/how2
npm install -g how-2

npm install -g npx

killall Finder

echo "Done!"
