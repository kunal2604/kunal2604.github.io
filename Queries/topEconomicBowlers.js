
function topEconomicBowlers(){
    var matches = require('../JSON-files/matches.json');
    var deliveries = require('../JSON-files/deliveries.json');

    var matches2015 = [];      
    var recordBowlersObj = {};

    var topTenBowlersArr = [];
    var topTenBowlersJSON = [];
    var economicBowlers = {};
    var economyBowlersArr = [];


    // Store matches in the year 2015 in a seperate object:
    matches.map(match => {
        if(match["season"] === 2015){
            matches2015.push(match["id"]);
        }
    });

    //Check for deliveries of 2015
    deliveries.map(del => {
        if(matches2015.includes(parseInt(del["match_id"]))){  
            if(recordBowlersObj.hasOwnProperty(del["bowler"])){
                recordBowlersObj[del["bowler"]]["runs"] += parseInt(del["total_runs"]);
                recordBowlersObj[del["bowler"]]["balls"] += 1; 
            }
            else{
                recordBowlersObj[del["bowler"]] = {};
                recordBowlersObj[del["bowler"]]["runs"] = parseInt(del["total_runs"]);
                recordBowlersObj[del["bowler"]]["balls"] = 1;    
            }
        }
    });

    for(var bowler in recordBowlersObj){
        var arr = [];
        let economyRate = (recordBowlersObj[bowler]["runs"] * 6) / (recordBowlersObj[bowler]["balls"]);
        arr.push(bowler);
        arr.push(economyRate);
        economyBowlersArr.push(arr);
    }

    // Sort the array based on 'economy rate'.
    economyBowlersArr.sort((a,b) => a[1]-b[1] );

    topTenBowlersArr = economyBowlersArr.slice(0, 11);

    topTenBowlersArr.map(bowler => {
        economicBowlers[bowler[0]] = bowler[1];
    })

    for(var obj in economicBowlers){
        topTenBowlersJSON.push({'name': obj, 'y':economicBowlers[obj] });
    }

    // Convert the array of objects into a JSON file.
    const fs = require('fs');
    jsonData = JSON.stringify(topTenBowlersJSON);
    fs.writeFile('../queried-JSON-files/topEconomicBowlers.json', jsonData, (err) => {
        if(err) throw err;
    });
}

topEconomicBowlers();


