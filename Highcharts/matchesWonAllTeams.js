fetch('queried-JSON-files/matchesWonAllTeams.json').then((response) => response.json()).then(data => {
    var jsondata = data;
    PlotChart2(jsondata);
})

function PlotChart2(jsonObj){
    // Store the seaons in an array.
    var seasonsIPL = [];
    var teamsIPL = [];
    
    for(let year in jsonObj){
        seasonsIPL.push(year);
        for(var team in jsonObj[year]){
            if(!(teamsIPL.includes(team))){
                teamsIPL.push(team);
            }
        }
    }

    //   [ {"name":"CSK", "data":[22,23,30,22,33,44,22,23,24,25]}, 
    //     {}, {}, ....
    //   ]
    var matchesWonArr = [];
    teamsIPL.map(team => {
        let tempObj = {"name": team, "data":[]};
        for(let year in jsonObj){
            if(jsonObj[year].hasOwnProperty(team)){
                tempObj["data"].push(jsonObj[year][team]);
            }
            else{
                tempObj["data"].push(0);
            }
        }
        matchesWonArr.push(tempObj);
    });
    console.log(matchesWonArr);
    
    Highcharts.chart('container2', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Matches won by each team every year'
        },
        xAxis: {
            categories: seasonsIPL
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: matchesWonArr
    });
}
