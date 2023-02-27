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

   // TITLE
   const title = parsedPageData("[name='DC.title']").attr('content')
   console.log('TITLE')
   console.log(title, '\n\n')

   // Patent PDF File
   const patentPDF = parsedPageData("[name='citation_pdf_url']").attr('content')
   console.log('PATENT PDF FILE')
   console.log(patentPDF, '\n\n')

   // APPLICATION NUMBER
   const applicationNumber = parsedPageData("[name='citation_patent_application_number']").attr('content')
   console.log('APPLICATION NUMBER')
   console.log(applicationNumber, '\n\n')

   // DATE SUBMITTED
   const dateSubmitted = parsedPageData("meta[scheme='dateSubmitted'][name='DC.date']").attr('content')
   console.log('SUBMISSION DATE')
   console.log(dateSubmitted, '\n\n')

   // PATENT NUMBER
   const patentNumber = parsedPageData("[name='citation_patent_number']").attr('content')
   console.log('PATENT NUMBER')
   console.log(patentNumber, '\n\n')

   // ISSUE DATE (GRANTED)
   const issueDate = parsedPageData("meta[scheme='issue'][name='DC.date']").attr('content')
   console.log('ISSUE DATE (GRANTED)')
   console.log(issueDate, '\n\n')

   // ASSIGNEES
   const rawAssigneeList = parsedPageData("meta[scheme='assignee'][name='DC.contributor']").toArray()
   let processedAssigneeList = []
   rawAssigneeList.forEach(element => {
      if (element.attribs.content != null) {
         processedAssigneeList.push(element.attribs.content)
      }
   });
   console.log('ASSIGNEES')
   console.log(processedAssigneeList, '\n\n')

   // INVENTORS
   const rawInventorsList = parsedPageData("meta[scheme='inventor'][name='DC.contributor']").toArray()
   let processedInventorsList = []
   rawInventorsList.forEach(element => {
      if (element.attribs.content != null) {
         processedInventorsList.push(element.attribs.content)
      }
   });
   console.log('INVENTORS')
   console.log(processedInventorsList, '\n\n')

   // ABSTRACT
   const abstract = parsedPageData('.abstract').text()
   console.log('ABSTRACT')
   console.log(abstract, '\n\n')

   // CLAIMS
   const claims = parsedPageData('.claim-text').text()
   console.log('CLAIMS')
   console.log(claims, '\n\n')

   // DESCRIPTION
   const description = parsedPageData('.description').text()
   console.log('DESCRIPTION')
   console.log(description, '\n\n')
    

};

// invoking the main function (pageData)
pageData();



// exports = {
//     pageData,
// }