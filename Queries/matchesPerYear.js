function matchesPerYear(){
    var matches = require('../JSON-files/matches.json');
    
    var matchesPerYearObj = {};
    var matchesPerYearArr = [];

    for(var i=0; i<matches.length; i++){
        if(matchesPerYearObj.hasOwnProperty(matches[i].season)){
            matchesPerYearObj[matches[i]["season"]] += 1;
        }
        else {
            matchesPerYearObj[matches[i]["season"]] = 1;
        }
    }

    
    for(let ele in matchesPerYearObj){
        matchesPerYearArr.push({'name':ele, 'y':matchesPerYearObj[ele]});
    }

    const fs = require('fs');    
    var jsonData = JSON.stringify(matchesPerYearArr);
    fs.writeFile('../queried-JSON-files/matchesPerYear.json', jsonData, (err) => {
        if(err) throw err;
    });

    
}

matchesPerYear();

    