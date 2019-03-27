function matchesWonAllTeams(){
    var matches = require('../JSON-files/matches.json');
    
    var matchesWonAllTeamsObj = {};
    var matchesWonAllTeamsArr = [];

    matches.map(match => {
        if(match["winner"] !== ""){
            if(matchesWonAllTeamsObj.hasOwnProperty(match["winner"])){
                matchesWonAllTeamsObj[match["winner"]] += 1;
            }
            else{
                matchesWonAllTeamsObj[match["winner"]] = 1;
            }
        }
    });
    
    // For Highcharts, convert this data into an array of objects, 
    // in the form [{name: 'CSK', y: 79}, {}, ...]
    for(let team in matchesWonAllTeamsObj){
        matchesWonAllTeamsArr.push({'name':team, 'y':matchesWonAllTeamsObj[team]});
    }

    // Convert the array of objects into a JSON file.
    const fs = require('fs');
    jsonData = JSON.stringify(matchesWonAllTeamsArr);
    fs.writeFile('../queried-JSON-files/matchesWonAllTeams.json', jsonData, (err) => {
        if(err) throw err;
    });
}

matchesWonAllTeams();