
function topEconomicBowlers(){
 
    // Store the json files into variables:
    var matches = require('../JSON-files/matches.json');
    var deliveries = require('../JSON-files/deliveries.json');


    var matches2015 = [];      
    var recordBowlersObj = {};


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

    var economyBowlersArr = [];

    for(var bow in recordBowlersObj){
        var arr = [];
        let economyRate = (recordBowlersObj[bow]["runs"] * 6) / (recordBowlersObj[bow]["balls"]);
        arr.push(bow);
        arr.push(economyRate);
        economyBowlersArr.push(arr);
    }

    economyBowlersArr.sort((a,b) => a[1]-b[1] );

    var topTenBowlers = economyBowlersArr.slice(0, 11);
    
    var topTenBowlersJSON = [];
    var economicBowlers = {};

    topTenBowlers.map(item => {
        economicBowlers[item[0]] = item[1];
    })

    //console.log(economicBowlers);
    for(var obj in economicBowlers){
        topTenBowlersJSON.push({'name': obj, 'y':economicBowlers[obj] });
    }

    //console.log(topTenBowlersJSON);

    const fs = require('fs');
    jsonData = JSON.stringify(topTenBowlersJSON);
    fs.writeFile('../queried-JSON-files/topEconomicBowlers.json', jsonData, (err) => {
        if(err) throw err;
    });
}
topEconomicBowlers();


