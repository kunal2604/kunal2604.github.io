function matchesPerYear(){
    // matches is an array of objects
    var matches = require('../JSON-files/matches.json');
    
    // empty object which stores the result
    var matchesPerYearObj = {};

    for(var i=0; i<matches.length; i++){
        if(matchesPerYearObj.hasOwnProperty(matches[i].season)){
            matchesPerYearObj[matches[i]["season"]] += 1;
        }
        else {
            matchesPerYearObj[matches[i]["season"]] = 1;
        }
    }
    console.log(matchesPerYearObj);



    var matchesPerYearArr = [];
    for(let ele in matchesPerYearObj){
        matchesPerYearArr.push({'name':ele, 'y':matchesPerYearObj[ele]});
    }
    console.log(matchesPerYearArr);

    const fs = require('fs');    
    var jsonData = JSON.stringify(matchesPerYearArr);
    fs.writeFile('../queried-JSON-files/matchesPerYear.json', jsonData, (err) => {
        if(err) throw err;
    });

    
}

matchesPerYear();

    