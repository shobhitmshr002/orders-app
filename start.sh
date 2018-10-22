#!/usr/bin/env bash
	
	red=$'\e[1;31m'
	grn=$'\e[1;32m'
	blu=$'\e[1;34m'
	mag=$'\e[1;35m'
	cyn=$'\e[1;36m'
	white=$'\e[0m'
	
	sudo apt update
	sudo apt install -y curl
	
	echo " $red ----- Installing Pre requisites ------- $white "
	
        # Installing Docker CE
    if [ ! -f /usr/bin/docker ]; then
        echo 'Installing Docker CE'
        # Install Docker CE from the Debian-based distributions repository
        sudo apt-get install -y docker-ce

    else
        echo "Docker CE already installed.  Skipping..."
    fi

    # Installing Docker Compose
    if [ ! -f /usr/bin/docker-compose ]; then
        echo 'Installing Docker Compose'
        # Install Docker Compose from the Debian-based distributions repository
        sudo apt-get install -y docker-compose

    else
        echo "Docker Compose already installed.  Skipping..."
    fi

    # Installing npm to testcase
    if [ ! -f /usr/bin/npm ]; then
        echo 'Installing npm'
        # Install npm from the Debian-based distributions repository
        sudo apt-get install -y npm

    else
        echo "npm already installed.  Skipping..."
    fi

    # # Start the application
    sudo npm install 
    sudo docker-compose up &
    sleep 5
    ## Start lint
    eslint .eslintrc.js server
    ## Start Test Cases
    echo 'Starting Test Suite'
    npm test