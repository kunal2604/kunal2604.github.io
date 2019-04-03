function extraRunsConceded(yy){
    
    // Store the json files into variables.
    var matches = require('../JSON-files/matches.json');
    var deliveries = require('../JSON-files/deliveries.json');

    var matchesObj = {};
    matches.map(match => {
        if(match["season"] === yy){
            matchesObj[match["id"]] = match["id"];
        }
    });

    // Store extra runs conceded by each team in an object of form {"team-name": extras}.
    var extraRunsConcededObj = {};
<<<<<<< HEAD
=======

    deliveries.map(x => {
        if(matchesObj.hasOwnProperty(x["match_id"])){
            if(extraRunsConcededObj.hasOwnProperty(x["bowling_team"])){
                extraRunsConcededObj[x["bowling_team"]] += parseInt(x["extra_runs"]);   
            }
            else{
                extraRunsConcededObj[x["bowling_team"]] = parseInt(x["extra_runs"]);   
            }
        }
    });        
  
   console.log(extraRunsConcededObj);
>>>>>>> 442f0f1329aa9509bec2a83f28ca2e84b2264082

    deliveries.map(x => {
        if(matchesObj.hasOwnProperty(x["match_id"])){
            if(extraRunsConcededObj.hasOwnProperty(x["bowling_team"])){
                extraRunsConcededObj[x["bowling_team"]] += parseInt(x["extra_runs"]);   
            }
            else{
                extraRunsConcededObj[x["bowling_team"]] = parseInt(x["extra_runs"]);   
            }
        }
    });        
  
    // Store the data as 'Array of Arrays', --> [ ['Mumbai Indians',108],['Delhi D',106], [], ... ]
   
   
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

extraRunsConceded(2016);