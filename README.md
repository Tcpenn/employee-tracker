# employee-tracker

![badmath](https://img.shields.io/badge/License-MIT-informational)

## Description

This application is a employee tracker that will allow users to keep track of all their employees and keep them in organized ways, from their department, role, id, managers, and more.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Languages / Frameworks](#languages)
* [Dependancies](#dependancies)
* [Roadmap](#roadmap)

## Installation

To run this application you first need clone the application to your computer. Then you must have node.js installed as well as your Mysql server setup. After the files and server have been set up you must use the ```npm install``` command in the console to install the required packages. Then in the .env file enter your mysql credentials, your password, host, and username. Then in the command line log into your mysql server with the command ```mysql -u root -p``` then to set up the database and tables required run ```source db/schema.sql``` & ```source db/schema.sql```. You now have a properly set up application

## Usage

After the proper set up and the required dependencies are installed run the code ```node index```. After this you will be greeted by the main menu and be presented with options to choose what to do next, either with employee's etc. video link [here](https://drive.google.com/file/d/1GsagpYa9-SfSkTHLm2vsWI_4xTVyIjlV/view?usp=sharing).

## License

This project is current licensed under the [MIT](LICENSE) license.

## Languages
* Javascript
* Node.js
* SQL

## Dependencies

* inquirer
* mysql2
* dotenv
* console.table

## Plans

This is a very bare bones program and there are some bugs to be worked out like functionality for updating and deleting departments and making it on a independent server.

