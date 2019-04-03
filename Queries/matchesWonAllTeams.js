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

    // Convert the array of objects into a JSON file.
    const fs = require('fs');
    jsonData = JSON.stringify(winsObj);
    fs.writeFile('../queried-JSON-files/matchesWonAllTeams.json', jsonData, (err) => {
        if(err) throw err;
    });
}

matchesWonAllTeams();