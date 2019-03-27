function matchesPerYear(){
    // Store the json files into variables.
    var matches = require('../JSON-files/matches.json');
    
    var matchesPerYearObj = {};
    var matchesPerYearArr = [];

    // Store the number of matches as an object, of form {'2008':58,  '2009':59, ...}
    matches.map(match => {
        if(matchesPerYearObj.hasOwnProperty(match.season))
            matchesPerYearObj[match.season] += 1;
        else
            matchesPerYearObj[match.season] = 1;
    });
    
    // For Highcharts, store the data as an 'Array of Objects', in the form [{'name': 2016, 'y': 65} , {}, {}.....]
    for(let year in matchesPerYearObj){
        matchesPerYearArr.push({'name':parseInt(year), 'y':matchesPerYearObj[year]});
    }

    // Convert the array of objects into a JSON file.
    const fs = require('fs');    
    var jsonData = JSON.stringify(matchesPerYearArr);
    fs.writeFile('../queried-JSON-files/matchesPerYear.json', jsonData, (err) => {
        if(err) throw err;
    });
}

matchesPerYear();

    