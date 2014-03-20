# Lakestreet - [![Build Status](http://jenkins.sizethreestudios.com/job/lakestreet/badge/icon)](http://jenkins.sizethreestudios.com/job/lakestreet/)

[Lake Street Dive](www.lakestreetdive.com) is an exceptional band. They have made appearances and many talk radio shows, and even made it to TV on *The Colbert Report* and *Ellen*. Combined with third party apis, this project aims at making their web presence as awesome as they are.

## Compiling

```
git clone git@github.com:dadleyy/lakestreet.git ~/lakestreet
cd ~/lakestreet
sudo npm install karma-cli -g
sudo npm install grunt-cli -g
sudo npm install bower -g
npm install
bower install
grunt
```

There are a few things that need to be done before you can view the application yourself.

**.env file**
To get rocking and rolling with the twitter api, you'll need to create a `.env` file based on the example you'll find at the project root. This contains information related to the twitter api that needs to populate a `brearer` token for it's http requests. 

**npm**

The project uses npm and several node modules to compile and put together. To install them, run:

```
npm install
```

You will also need to download the `grunt-cli`, `karma-cli` and `bower` tools globally:

```
sudo npm install karma-cli -g
sudo npm install grunt-cli -g
```

**bower**
 
 Several of the javascript assets are pulled down during the build using bower, an asset package management tool. These are installed via:
 
```
bower install
```


**grunt**

grunt has been set up to execute all of the build tasks the same way you would use a `makefile` in c++. So, in order to build the project, just run the default task:

```
grunt
```

## Hosting

Right now, the project is designed to be served from an apache web server, using php. The web server's virtual host entry should point it's document root at the `.\public` directory. It Is important that the proxy module be loaded and `SSLProxyEngine` is `On`. 

