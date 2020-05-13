# WED2-Notes-Application
    
This is a note-taking application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to use the application in alpine

#### Application:

Clone the App:
    
    git clone https://gitlab.dev.ifs.hsr.ch/tnebai/wed2-notes-application.git

NodeJS:

    apk add --update nodejs npm

#### Load balancer:

Nginx install:

    apk add nginx
    
Nginx setup:

    /etc/nginx/conf.d/default.conf

    upstream notetakingapp {
        server 127.0.0.1:8080;
        server 127.0.0.1.:8081;
    }
    server {
        listen 80 default_server;
        listen [::]:80 default_server;

        location / {
                proxy_pass http://notetakingapp;
                auth_basic "Restricted Content";
                auth_basic_user_file /etc/nginx/.htpasswd;
        }

        # You may need this to prevent return 404 recursion.
        location = /404.html {
                internal;
        }
    }
    
Nginx start:
    
    /etc/init.d/nginx start

#### Basic Authentication:

apache2-utils install:
    
    apk add apache2-utils
    
Create User with password:
    
    ``` 
    Creating a user for the first time with -c, otherwise without -c 
    ```
    htpasswd -c /etc/nginx/.htpasswd  user1

#### KV storage:

MongoDB

MongoDB install:
    
    apk add --no-cache mongodb
    
MongoDB start:

    mongod --dbpath /wed2-notes-application/note-taking-app/data/db

Mongoose install:
    
    npm install mongoose
    
#### Grpc:
    
Grpc install:
    
    npm install grpc
    npm install @grpc/proto-loader
    
#### Two instance of http services:

    port 8080
    port 8081
 
### Running app

Steps to follow to run the app:

    nginx start
    
    nc -l 8888                              => listening on this port from localhost
    
    node public/javascript/server.js     
    
    npm start                               => This starts the server on port 8080
    
    PORT=8081 npm start                     => This starts the server on port 8081
    
    Then give username and password for the basic authentication
    
## Built With

* [Express Node JS](https://expressjs.com) - The web framework used

## Author

* **Tsigereda Nebai Kidane**
