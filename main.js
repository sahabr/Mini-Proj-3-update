

 /*let type = document.querySelector('#group-by');
 let select = document.querySelector('#group-by');
 select.addEventListener('change', function () {
   type = this.value;
   //loadData(type);
 });*/


import BarChart from './barchart2.js';
//function loadData(type){
d3.csv('rounds.csv', d3.autoType).then((data) => {


  let type = 'regions';
     d3.select('#group-by')
       .on('change', e => {
         type = e.target.value;
         barchart.update(data, type);
       });
  console.log(data);

  let year=2014;
  const barchart = BarChart('.chart-container1');
  barchart.slider(data);
  //year=document.getElementById("value").value;
  //console.log(year);
  barchart.update(data, type,year);
  



});
//}
//loadData(type);