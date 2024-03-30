#!/bin/bash

# check if user add hostname into the argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <hostname>"
    exit 1
fi

hostname=$1
# in case user forgot to add https in the beginning
if [[ ! $hostname =~ ^https:// ]]; then
    hostname="https://$hostname"
fi

# remove / at the end if it's there
if [[ $hostname =~ /$ ]]; then
    hostname=${hostname%?}
fi

# if .env doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    echo "SERVER_HOSTNAME=$hostname" > .env
else
    # replace hostname in the environment file
    sed -i '' "s|SERVER_HOSTNAME=.*|SERVER_HOSTNAME=$hostname|" .env
fi

# run
npm start
