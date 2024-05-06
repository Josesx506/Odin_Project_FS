### Install npm and node
Install the node package manager

```bash
# installs NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# Restart terminal after step one
# download and install Node.js
nvm install 20
# verifies the right Node.js version is in the environment
node -v # should print `v20.12.2`
# verifies the right NPM version is in the environment
npm -v # should print `10.5.0`
```

### Install terminalizer
```bash
npm install -g terminalizer # Global install
npm install terminalizer    # Local install
```

```bash
# Start recording with terminalizer
npx terminalizer record odinDemo
# Stop recording. this creates a odinDemo.yml file in the working directory
Press CTRL+D to exit and save the recording
# Play the recording
npx terminalizer play odinDemo
# Render the recording as a gif
npx terminalizer render odinDemo

# I got an error `error while loading shared libraries: libgbm.so.1: cannot open shared object file` which I fixed with 
sudo apt-get install -y libgbm-dev

# The EC2 instance doesn't have $DISPLAY so it threw an error. I finished compilation on mac
```

### Modify the config file for display purposes
```bash
frameBox:
  type: window
  title: Odin Project Demo
  style: []
```