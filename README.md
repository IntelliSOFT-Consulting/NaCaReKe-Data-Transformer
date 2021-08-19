NaCaReKe-Data-Transformer
=========

A simple client-side app for transforming **NaCaRe dataset**.

It's my try to fix a problem:

  * [github/issues](https://github.com/IntelliSOFT-Consulting/NaCaReKe-Data-Transformer/issues)




Table of contents
=================

<!--ts-->
   * [Getting started](#getting-started)
     * [Setup](#setup)
     * [Installation](#installation)
     * [Usage](#usage)
   * [Dependencies](#dependencies)
   * [Contributing](#contributing)

<!--te-->


Getting Started
============

Setup
=====
- Node.js v14.0.0 or higher is required.

Installation
============
- Clone the this project repository.
- Navigate to the project directory and run `npm install` command.
- Once the installation is done, run `npm start` command.
- Open [http://localhost:3000](http://localhost:3000) in your browser.


Usage
=====
- Click on `Click to Upload` and choose a Canreg CSV or XLSX file from your computer.
- Enter Organization unit in the textbox when prompted to.
- Click on `Add columns` button.
- Click on `Add column` button to create input fields.
- Select the column you want to check data from  in the left input and the column to create from the right input.
- Repeat the above steps for all the columns you want to check data from and create.
- Click on `Submit` button when done.
- That's it! The data will be transformed will be ready for export.
- Click on `Export` button from the top right of the screen to download the transformed data.

NB: Your column configuration will be saved in the browser's local storage. You'll be able to perform the same operation next time by just clicking on `Auto Process`.You can change it later by clicking on `Edit Columns` button.

Dependencies
==========
 - React
 - Antd
 - xlsx
 - didyoumean
 - axios

Contributing
============
Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](https://github.com/IntelliSOFT-Consulting/NaCaReKe-Data-Transformer/issues).
