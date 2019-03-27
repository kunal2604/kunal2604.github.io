function matchesWonAllTeams(){
    
    // Store the json files into variables:
    var matches = require('../JSON-files/matches.json');
    var deliveries = require('../JSON-files/deliveries.json');

    // Store matches in the year 2016 in a seperate object:
    var matchesIn2016 = [];
    for(var i=0; i<matches.length; i++){
        if(matches[i]["season"] === 2016){
            matchesIn2016.push(matches[i]);
        }
    }

    var extraRunsConceded = {};
    for(var i=0; i<matchesIn2016.length; i++){
        var id = matchesIn2016[i]["id"];
        
        for(var j=0; j<deliveries.length; j++){
            
            if(deliveries[j]["match_id"] == id){
                if(extraRunsConceded.hasOwnProperty(deliveries[j]["bowling_team"])){
                    extraRunsConceded[deliveries[j]["bowling_team"]] += parseInt(deliveries[j]["extra_runs"]);
                }
                else{
                    extraRunsConceded[deliveries[j]["bowling_team"]] = parseInt(deliveries[j]["extra_runs"]);
                }
            }
        }
    }

    var extraRunsConcededArr = [];
    for(let ele in extraRunsConceded){
        extraRunsConcededArr.push({'name':ele, 'y':extraRunsConceded[ele]});
    }

    const fs = require('fs');
    jsonData = JSON.stringify(extraRunsConcededArr);
    fs.writeFile('../queried-JSON-files/extraRunsConceded.json', jsonData, (err) => {
        if(err) throw err;
    });

}

matchesWonAllTeams();