function matchesWonAllTeams(){
    var matches = require('../JSON-files/matches.json');

    var winsObj = {};
    var matchesWonAllTeamsArr = [];

    matches.map(match => {
        if(match["winner"] !== ""){
            if(winsObj.hasOwnProperty(match["season"])){
                if(winsObj[match["season"]].hasOwnProperty(match["winner"])){
                    winsObj[match["season"]][match["winner"]] += 1;
                }
                else{
                    winsObj[match["season"]][match["winner"]] = 1;
                }
            }
            else{
                winsObj[match["season"]] = {};
                winsObj[match["season"]][match["winner"]] = 1;
            }
        }
    });
    
    //console.log(winsObj);
    
    // For Highcharts, convert this data into an array of objects, 
    // in the form [{name: 'CSK', y: 79}, {name:'Mumbai Indians', y:102}, {}, ...]
    /*for(let team in matchesWonAllTeamsObj){
        matchesWonAllTeamsArr.push({'name':team, 'y':matchesWonAllTeamsObj[team]});
    }*/

    // Convert the array of objects into a JSON file.
    const fs = require('fs');
    jsonData = JSON.stringify(winsObj);
    fs.writeFile('../queried-JSON-files/matchesWonAllTeams.json', jsonData, (err) => {
        if(err) throw err;
    });
}

matchesWonAllTeams();