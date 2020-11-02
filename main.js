

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


  const barchart = BarChart('.chart-container1');

  document.getElementById("value").innerHTML=2014;
  barchart.slider(data);
  let year=document.getElementById("value").innerHTML;
  //console.log(year);
  barchart.update(data, type, year);
  



});
//}
//loadData(type);