const fetch = require("node-fetch");
const cheerio = require('cheerio');

// URL for data
const URL = "https://patents.google.com/patent/US11227238B2/";

// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

// start of the program
const pageData = async () => {
    const data = await getRawData(URL);
    // console.log(data);
    
    // Parsing the data
    const parsedPageData = cheerio.load(data)
    // console.log(parsedPageData('.abstract').text())
    console.log(parsedPageData('.claim-text').text())


};

// invoking the main function
pageData();
