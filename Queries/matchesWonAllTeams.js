function matchesWonAllTeams(){
    var matches = require('../JSON-files/matches.json');
    
    var matchesWonAllTeamsObj = {};
    var matchesWonAllTeamsArr = [];

    for(var i=0; i<matches.length; i++){
        if(matches[i]["winner"] !== ""){
            if(matchesWonAllTeamsObj.hasOwnProperty(matches[i]["winner"])){
                matchesWonAllTeamsObj[matches[i]["winner"]] += 1;
            }
            else{
                matchesWonAllTeamsObj[matches[i]["winner"]] = 1;
            }
        }   
    }

    const fs = require('fs');
    var jsonData = JSON.stringify(matchesWonAllTeamsObj);
    fs.writeFile('../queried-JSON-files/matchesWonAllTeams.json', jsonData, (err) => {
        if(err) throw err;
    });
    
    for(let ele in matchesWonAllTeamsObj){
        matchesWonAllTeamsArr.push({'team':ele, 'matches-won':matchesWonAllTeamsObj[ele]});
    }
    jsonData = JSON.stringify(matchesWonAllTeamsArr);
    fs.writeFile('../queried-JSON-files/JSON-Highcharts/matchesWonAllTeams.json', jsonData, (err) => {
        if(err) throw err;
    });
}

matchesWonAllTeams();