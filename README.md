# gbg-assessment-web

AngularJS Web application assessment for GBG Job Application

## Installation

This project requires [NodeJS](https://nodejs.org/en/) and [Bower](http://bower.io) to install the required libraries and frameworks and to run the unit tests.
In order to run the application you'll need to have a local web server. [Live-Server](https://www.npmjs.com/package/live-server), a light-weight NodeJS http server
 will do the trick. After making sure NodeJS, Bower and Live-Server are installed:
 
 ```
     $ git clone https://github.com/jvnicholson/gbg-assessment-web.git
     $ cd gbg-assessment-web
     $ npm install
     $ bower install
     $ live-server
 ```

## Testing
 
This project uses Karma and Jasmine for unit testing. There is currently only minimal testing configured, as I just want to demonstrate that I know how to configure and run unit tests for my Angular projects and that I understand the importance of implementing unit tests for Angular projects. In a non-assessment type of setting, I would continue to build additional unit tests and refactor the code to make it even more testable.

To run the unit tests type `karma start` from the root (i.e., 'gdb-assessment-web') directory
