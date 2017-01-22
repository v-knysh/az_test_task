/**
 * Created by knyshv on 1/20/17.
 */
(function () {
d3.json('static/data/passengers_small.json', function(data) {
    console.log(data)
    var passengers = data;

    var pass_cr = crossfilter(passengers);

    var dim_sex = pass_cr.dimension(function (d) { return d.sex; }),
        dim_class = pass_cr.dimension(function (d) { return d.pclass; }),
        dim_age = pass_cr.dimension(function (d) { return d.age; });
        dim_survived = pass_cr.dimension(function (d) { return d.survived; });

    var gr_age = dim_age.group(function (age) {
            return Math.floor(age / 2) * 2
        }),
        gr_sex = dim_sex.group(),
        gr_class = dim_class.group(),
        gr_survived = dim_survived.group(),
        gr_total_fare = dim_class
            .group()
            .reduce(
            function (p, v) {
                p.ct += 1;
                p.total += v.fare;
                return p;
            },
            function (p, v) {
                p.ct -= 1;
                p.total -= v.fare;
                return p;
            },
            function (p, v) {
                return {
                    ct: 0,
                    total: 0,
                }
            }
           );



    d3.select('#content')
        .append('div')
        .attr('id', 'chart-01')
        .attr('class', 'col-md-8')
        .append('h4')
        .text("Распределение количества людей по возрасту");
;


    var chart_01  = dc.barChart("#chart-01");

    chart_01
        .width(600)
        .height(400)
        .dimension(dim_age.filter(function (d) {  return !!d }))
        .group(gr_age)
        .x(d3.scale.linear().domain([0.1, dim_age.top(1)[0].age * 1]))
        // .elasticX(true)
        .elasticY(true);



    var chart_02 = d3.select('#content')
        .append('div')
        .attr('id', 'chart-02')
        .attr('class', 'col-md-4')
        .append('h4')
        .text("Распределение количества людей по полу");


    var sex_chart  = dc.pieChart("#chart-02");
    sex_chart
        .dimension(dim_sex)
        .group(gr_sex);

    var chart_03 = d3.select('#content')
        .append('div')
        .attr('id', 'chart-03')
        .attr('class', 'col-md-4')
        .append('h4')
        .text("Распределение количества людей по классу");

    var class_chart  = dc.pieChart("#chart-03");
    class_chart
        .dimension(dim_class)
        .group(gr_class)





    var chart_04 = d3.select('#content')
        .append('div')
        .attr('id', 'chart-04')
        .attr('class', 'col-md-8')
        .append('h4')
        .text("Средняя цена билета для класса и выбранных параметров");


    var lineChart  = dc.rowChart("#chart-04");

    lineChart
        // .width(800)
        // .height(400)
        .dimension(dim_class)
        .group(gr_total_fare)
        .valueAccessor(function (v) {
            return 1.0 * v.value.total / v.value.ct;
        })
        // .x(d3.scale.linear().domain([0,5]))
        .elasticX(true);
        // .elasticX(true);

    var chart_05 = d3.select('#content')
        .append('div')
        .attr('id', 'chart-05')
        .attr('class', 'col-md-4')
        .append('h4')
        .text("Распределение количества выживших людей");

    var survived_chart  = dc.pieChart("#chart-05");
    survived_chart
        .dimension(dim_survived)
        .group(gr_survived)

    dc.renderAll();
})
})()
