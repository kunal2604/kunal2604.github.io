function matchesWonAllTeams(yy){
    
    // Store the json files into variables.
    var matches = require('../JSON-files/matches.json');
    var deliveries = require('../JSON-files/deliveries.json');

    // Store 'Match IDs' of matches played in the year 'yy' (2016).
    var matchesInYearID = [];
    matches.map(match => {
        if(match["season"] === yy){
            matchesInYearID.push(match["id"]);
        }
    });

    // Store extra runs conceded by each team in an object of form {"team-name": extras}.
    var extraRunsConcededObj = {};
    matchesInYearID.map(id => {
        deliveries.map(del => {
            if(del["match_id"] == id){
                if(extraRunsConcededObj.hasOwnProperty(del["bowling_team"])){
                    extraRunsConcededObj[del["bowling_team"]] += parseInt(del["extra_runs"]);
                }
                else{
                    extraRunsConcededObj[del["bowling_team"]] = parseInt(del["extra_runs"]);
                }
            }
        });
    });

    var sortedExtraRunsConceded = [];
    for(let team in extraRunsConcededObj){
        let tempArr = [];
        tempArr.push(team);
        tempArr.push(extraRunsConcededObj[team]);
        sortedExtraRunsConceded.push(tempArr);
    }

    // Sort the 2D Array according to number of extras.
    sortedExtraRunsConceded.sort((a,b) => b[1] - a[1]);
    
    // For Highcharts, store the data as an 'Array of Objects', in the form [{name: 'team-name' , y: extras}, {}, {}, ...]
    var extraRunsConcededArr = [];

    sortedExtraRunsConceded.map(item => {
        extraRunsConcededArr.push({'name': item[0], 'y': item[1]});
    });

    // Convert the array of objects into a JSON file.
    const fs = require('fs');
    jsonData = JSON.stringify(extraRunsConcededArr);
    fs.writeFile('../queried-JSON-files/extraRunsConceded.json', jsonData, (err) => {
        if(err) throw err;
    });
}

matchesWonAllTeams(2016);