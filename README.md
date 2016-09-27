# Raspberry + nodejs + Bash scp publishing

A great setup for coding on a PC and deploying and running the code on the Raspberry PI.

Uses express, socket.io, rpi-gpio and q modules.

## Set up sharing and connect the Raspberry PI directly via ethernet cable to a mac

1. Open settings for "Sharing" on the mac
2. Under "Internet sharing" - select a connection to share, for example "Wi-Fi"
3. Select to share via "Ethernet"
4. (If you are unable to change 2 and 3, first uncheck "Internet sharing" and check it again)
5. Connect the Raspberry PI via ethernet cable straight from the Mac
6. After it has booted, find out it's ip-number with the command "arp -a". It tend to start with 192.168.2.xxx
7. Try to connect and log in with the command "ssh pi@192.168.2.xxx". Then disconnect with the command "exit"

Now the PI should be connected to the mac and have recieved an IP address.

## Set an ssh key to login to the PI without typing password

1. Run command ssh-keygen -t rsa on the mac
2. Press enter for default location
3. Press enter for blank password
4. Run cat ~/.ssh/id_rsa.pub and copy the key
5. Connect to the PI
6. Run cd ~
7. Run install -d -m 700 ~/.ssh
8. Run nano authorized_keys and paste the key copied from the mac

Now you should be able to connect to the PI without password.

## Set up app and run nodemon

1. Connect to the PI, create directory for the app. For example /opt/deploy/myapp
2. On the mac pi-publish.sh and enter the IP and path as above.
3. Run chmod +x pi-publish.sh
4. Publish by running ./pi-publish.sh
5. Back on the PI: run npm install
6. sudo npm install -g nodemon
7. Start the app using nodemon app.js
8. Code. Publish using ./pi-publish.sh

Now nodemon should be running and should restart on every publish