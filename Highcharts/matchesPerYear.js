fetch('queried-JSON-files/matchesPerYear.json').then((response) => response.json()).then(data => {
    var jsondata = data;
    PlotChart(jsondata);
})

// Create the chart
function PlotChart(jsonObj){
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Matches Played per Year'
        },
        
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Number of Matches Played'
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
                    format: '{point.y:.0f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b>'
        },

        "series": [{
            "name": "Matches",
            "colorByPoint": true,
            "data": jsonObj
        }]
    });
}