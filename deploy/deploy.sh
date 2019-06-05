#!/bin/bash

# any future command that fails will exit the script
set -e
# Lets write the public key of our aws instance
eval $(ssh-agent -s)
echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null

# ** Alternative approach
# echo -e "$SSH_PRIVATE_KEY" > /root/.ssh/id_rsa
# chmod 600 /root/.ssh/id_rsa
# ** End of alternative approach

# disable the host key checking.
# ./deploy/disableHostKeyChecking.sh
mkdir -p ~/.ssh
touch ~/.ssh/config
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config

# we have already setup the DEPLOYER_SERVER in our gitlab settings which is a
# comma seperated values of ip addresses.
DEPLOY_SERVERS=$DEPLOY_SERVERS

# lets split this string and convert this into array
# In UNIX, we can use this commond to do this
# ${string//substring/replacement}
# our substring is "," and we replace it with nothing.
ALL_SERVERS=(${DEPLOY_SERVERS//,/ })
echo "ALL_SERVERS ${ALL_SERVERS}"

# Lets iterate over this array and ssh into each EC2 instance
# Once inside.
# 1. Stop the server
# 2. Take a pull
# 3. Start the server
for server in "${ALL_SERVERS[@]}"
do
  echo "deploying to ${server}"
  ssh ubuntu@${server} 'bash -s' < ./deploy/updateAndRestart.sh
done


