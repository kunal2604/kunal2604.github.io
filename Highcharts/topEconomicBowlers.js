fetch('queried-JSON-files/topEconomicBowlers.json').then((response) => response.json()).then(data => {
    var jsondata = data;
    PlotChart4(jsondata);
})

// Create the chart
function PlotChart4(jsonObj){

    Highcharts.chart('container4', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Top Economic Bowlers of 2015'
        },
        
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Economy Rate'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b>'
        },

        "series": [{
            "name": "Economy Rate",
            "colorByPoint": true,
            "data": jsonObj
        }]
    });
}