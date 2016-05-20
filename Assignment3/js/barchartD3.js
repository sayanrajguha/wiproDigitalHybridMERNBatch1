var margin = { top : 20, right : 10, bottom : 80, left : 40},
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select('body')
              .append('svg')
                .attr({
                  "width" : width + margin.left + margin.right,
                  "height" : height + margin.top + margin.bottom
                })
                  .append('g')
                    .attr("transform","translate(" + margin.left + ',' + margin.right + ')');


var xScale = d3.scale.ordinal()
              .rangeRoundBands([0,width], 0.6, 0.6);
var yScale = d3.scale.linear()
              .range([height, 0]);

var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");
var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

/******************************************************************************
Logic for total json filtration
*******************************************************************************/
  d3.json('../../../LocalOutput/total.json', function(error,data) {
    if(error) {
      console.log(error);
    }

    var rawNestedArray = d3.nest()
                            .key(function(d) { return d.CountryName;})
                            .rollup(function(leaves) {
                              var sum = 0;
                              leaves.forEach(function(d) { sum += Number(d.Value);});
                              return (sum/leaves.length);
                            })
                            .entries(data);
    var dataArray = rawNestedArray.map(function(d) {
        return {
          CountryName : d.key,
          AverageLifeExpectancy : Number(d.values)
      };
    });
    dataArray = dataArray.sort(function(a,b) {
      return b.AverageLifeExpectancy - a.AverageLifeExpectancy;
    })
    .slice(0,5);

    //console.table(dataArray);

    xScale.domain(dataArray.map(function(d) {
      return d.CountryName;
    }));
    yScale.domain([0, d3.max(dataArray, function(d) {
      return d.AverageLifeExpectancy;
    }) + 5]);


    svg.selectAll('rect')
    .data(dataArray)
    .enter()
    .append('rect')
    .attr('height', 0)
    .attr('y',height)
    .transition().duration(2000)
    .delay(function(d,i) {  return i * 150; })
    .attr({
      "x" : function(d) { return xScale(d.CountryName); },
      "y" : function(d) { return yScale(d.AverageLifeExpectancy); },
      "width" : xScale.rangeBand(),
      "height" : function(d) {  return height - yScale(d.AverageLifeExpectancy);  }
    })
    .style('fill', function(d,i) {  return 'rgb(20,' + ((i*30) + 100) +',20)'});

    svg.selectAll("text")
    .data(dataArray)
    .enter()
    .append("text")
    .text(function(d) { return Number(d.AverageLifeExpectancy).toFixed(2);})
    .attr('x', function(d) {  return xScale(d.CountryName) + xScale.rangeBand()/2;})
    .attr('y', function(d) {  return yScale(d.AverageLifeExpectancy) + 15})
    .style("fill","white")
    .style("text-anchor","middle");

    svg.append("g")
        .attr("class","x axis")
        .attr("transform","translate(0," + height + ")")
        .call(xAxis)
        .style('font-size','14px');
    svg.append("g")
        .attr("class","y axis")
        .call(yAxis)
        .style('font-size','14px');





  });

/******************************************************************************************************
          Code for total.js filtration

  d3.json('total.json', function(error,data) {
    if(error) {
      console.log(error);
    }
    //console.table(data);
    // d3.select("body").text(JSON.stringify(data,null,4));

    var rawNestedArray = d3.nest()
                            .key(function(d) { return d.CountryName;})
                            .rollup(function(leaves) {
                              var sum = 0;
                              leaves.forEach(function(d) { sum += Number(d.Value);});
                              return (sum/leaves.length);
                            })
                            .entries(data);
    var dataArray = rawNestedArray.map(function(d) {
        return {
          CountryName : d.key,
          AverageLifeExpectancy : d.value
      };
    });
    dataArray = dataArray.sort(function(a,b) {
      return b.average - a.average;
    })
    .slice(0,5);
    console.table(dataArray);
    d3.select("body").text(JSON.stringify(dataArray,null,4));
  });

******************************************************************************************************/
