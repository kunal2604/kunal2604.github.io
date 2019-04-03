fetch('queried-JSON-files/extraRunsConceded.json').then((response) => response.json()).then(data => {
    var jsondata = data;
    PlotChart3(jsondata);
})



// Create the chart
function PlotChart3(jsonObj){

    Highcharts.chart('container3', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Extra Runs Conceded in 2016 season'
        },
        
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Extras'
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
            "name": "Extras",
            "colorByPoint": true,
            "data": jsonObj
        }] 
    });
}