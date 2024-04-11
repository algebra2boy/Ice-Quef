#!/bin/bash

# check if jq is installed
jq_check() {
    if ! command -v jq &> /dev/null; then
        echo "jq could not be found, start installing"

        # Detect OS
        OS="`uname`"
        case $OS in
          'Linux')
            # ubuntu
            sudo apt-get update
            sudo apt-get install -y jq
            ;;
          'Darwin')
            # macOS
            brew install jq
            ;;
          *)
            echo "Unsupported OS (windows?). Please install jq manually."
            exit 1
            ;;
        esac
    else
        echo "jq is already installed."
    fi
}

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

# if config.json doesn't exist
if [ ! -f "config.json" ]; then
    echo "Creating config.json file..."
    echo "{\"server\": {\"hostname\": \"$hostname\"}}" > config.json
else
    jq_check
    # replace hostname in the config.json file
    jq ".server.hostname = \"$hostname\"" config.json > tmp.$$.json && mv tmp.$$.json config.json
fi


# run
npm start
