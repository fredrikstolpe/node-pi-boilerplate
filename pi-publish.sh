#!/bin/bash
echo "Copying"
scp -r [!.]* pi@192.168.2.10:/opt/deploy/myapp
echo "Done"