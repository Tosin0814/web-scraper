const fetch = require("node-fetch");
const cheerio = require('cheerio');

// URL for data
const URL = "https://patents.google.com/patent/US11227239B2/";

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
    return parsedPageData

};

// console.log(parsedPageData('.abstract').text())
const claims = parsedPageData('.claim-text').text()
const description = parsedPageData('.description').text()

// const parsedPageClaims = parsedPageData.extract({
//     claims: ['.claim-text']
// })
// console.log(parsedPageClaims)

const render = (tag, content) => {
    function addElement() {
        // create a new element
        const newElement = document.createElement(tag);
        const newContent = document.createTextNode(content);
    }
    addElement()
}

// invoking the main function
pageData();

// Calling function to render data on page
render('p', description)
document.createElement("br");
render('p', claims)

// exports = {
//     pageData,
// }