export default function BarChart(container) {
    // initialization
    // 1. Create a SVG with the margin convention
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    };
    const width = 650 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3
        .select(container)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const group = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // 2. Define scales using scaleTime() and scaleLinear()
    // Only specify ranges. Domains will be set in the 'update' function
    const xScale = d3.scaleBand().range([0, width]).paddingInner(0.1);
    const yScale = d3.scaleLinear().range([height, 0]);
    const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    const xAxis = d3.axisBottom().scale(xScale);
    let xAxisGroup = group.append('g').attr('class', 'x-axis axis');

    const yAxis = d3.axisLeft().scale(yScale);
    let yAxisGroup = group.append('g').attr('class', 'y-axis axis');


    function update(data, type, years) {       
         
        years=parseInt(years);

        const select = {};
        let column;
        if (type==='country'){
            column='company_country_code';
        }
        else if (type==='market'){
            column='company_market';
        }
        else {
            column='company_region';
        }
        const tenYearsBefore={};
         data.forEach((el) => {
             const count = el[column];
             if (!count) return;
             const year = el['funded_year'];
             if (year === years) {
                 if (select[count]) {
                     select[count]++;
                 } else {
                     select[count] = 1;
                 }
             }
             if (year === years-10) {
                if (tenYearsBefore[count]) {
                    tenYearsBefore[count]++;
                } else {
                    tenYearsBefore[count] = 1;
                }
            }
         });

//console.log(years);
        const keys = Object.keys(select);
        keys.sort((a, b) => select[b] - select[a]);

        const keysPast = Object.keys(tenYearsBefore);

        let values = keys.map((e) => {
            return [e, select[e]];
        });
        
        // top 10
        let sliced_keys = keys.slice(0, 10);
        let sliced_values = values.slice(0, 10);

        let sliced_values_past = sliced_keys.map((e)=>{
            return [e,tenYearsBefore[e]];
        })


 
        let array_values = sliced_keys.map((e)=>{
            return [e,[select[e],tenYearsBefore[e],parseInt((select[e]-tenYearsBefore[e])/tenYearsBefore[e]*100)]];
        })
        console.log(array_values);


        
        xScale.domain(sliced_keys);
        yScale.domain([0, values[0][1]]);
        // colorScale.domain(keys);

        xAxisGroup.attr('transform', 'translate(0,' + height + ')').call(xAxis);
        yAxisGroup.call(yAxis);
        //console.log('keys',sliced_values_past);
        
        let bar = group
            .selectAll('rect')
            .data(array_values);

        bar
            .enter()
            .append('rect')
            .merge(bar)
            .on("mouseenter", (event, d) => {
                const pos = d3.pointer(event, window)
                d3.select('.tooltip')
                    .style('display', 'inline-block')
                    .style('top', pos[1] + 7 + 'px')
                    .style('left', pos[0] + 7 + 'px')
                    .html(("year: " + years + "<br>" + type + ": " + d[0] + "<br>Rounds: " + d[1][0]
                    + "<br>Rounds 10 yrs ago: " +d[1][1]+ "<br> Percent Change: "+d[1][2]+"%").toUpperCase());
            })
            .on("mouseleave", (event, d) => {
                d3.select('.tooltip')
                    .style('display', 'none');
            })
            .transition()
            .style('opactiy', 0.5)
            .transition()
            .duration(500)
            .attr('x', d => xScale(d[0]))
            .attr('y',d=>yScale(d[1][0]))
            .attr('width', d => xScale.bandwidth())
            .attr('height', d => (height-yScale(d[1][0])))
            .attr('fill', '#0066CC');

            bar.exit().remove();



    }
    return {
        update,
    };
}