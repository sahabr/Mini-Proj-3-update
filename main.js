



import BarChart from './barchart2.js';
d3.csv('rounds.csv', d3.autoType).then((data) => {



  console.log(data);


  const barchart = BarChart('.chart-container1');

  let years=2014;
  let type = 'regions';
  d3.select('#group-by')
    .on('change', e => {
      type = e.target.value;
      barchart.update(data, type,years);
    });
  var slider = d3.select('#year');
  slider.on('change', function() {
    barchart.update(data, type, this.value);
  });
  //console.log(year);
  barchart.update(data, type, years);
  



});
