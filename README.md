# Clash of Flags

## MongoDB

[Installation Tutorial](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-debian/#install-mongodb-community-edition)

**Debian**  
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.2 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

**Ubuntu**  
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

## Mongoose

[Homepage](http://mongoosejs.com/)  
Object Document Mapper (ODM) for MongoDB  
 
## Socket.io
 
[Homepage](http://socket.io/)  
Event-driven WebSocket library for Node.js
