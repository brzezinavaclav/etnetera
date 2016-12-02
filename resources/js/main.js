$(document).ready(function() {
    $('#carousel').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<i class="fa fa-angle-left slick-prev" aria-hidden="true"></i>',
        nextArrow: '<i class="fa fa-angle-right slick-next" aria-hidden="true"></i>'
    });
    $('.nav-toggle').click(function(){
        $(this).parent().parent().find('.nav-collapse').fadeToggle();
    });


    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke == 'undefined') {
            stroke = true;
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    }

    function Chart(canvas, data, options) {
        var c = document.getElementById(canvas);
        var ctx = c.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.font = '21px Open Sans';
        ctx.fillText( data.label, 51 , 22);
        ctx.closePath();

        var clock = new window.Image();
        clock.addEventListener("load", function () {
            ctx.drawImage(clock, 15, c.height-65); // Or at whatever offset you like
        });
        clock.setAttribute("src", 'dist/img/clock.png');

        var icon = new window.Image();
        icon.addEventListener("load", function () {
            ctx.drawImage(icon, 10, c.height-132); // Or at whatever offset you like
        });
        icon.setAttribute("src", 'dist/img/icon.png');

        for(var i=0; i<data.dataset.length; i++){
            ctx.beginPath();
            ctx.fillStyle=data.dataset[i].fill;

            if(options.rounded) roundRect(ctx,51+i*options.bar_width, c.height-data.dataset[i].value-81,options.bar_width, data.dataset[i].value-1, {tl: 10, tr: 10, bl: 0, br:0}, true, false);
            else ctx.fillRect(51+i*options.bar_width, c.height-data.dataset[i].value-81, options.bar_width, data.dataset[i].value-1);

            ctx.save();
            ctx.translate(63, c.height);
            ctx.rotate(-Math.PI / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle="#000";
            ctx.font = '9px Open Sans';
            ctx.beginPath();
            ctx.fillText(data.dataset[i].label, 65 , i*options.bar_width);
            ctx.closePath();
            ctx.restore();
        }

        var x = 0;
        var z = 0;
        for(i=0; i<data.legend.length; i++){

            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.font = '13px Open Sans';
            if(i>0) x += ctx.measureText(data.legend[i-1].text).width;
            else x = 80;
            ctx.fillText( data.legend[i].text, 58*i + x , c.height-5);
            ctx.closePath();

            ctx.fillStyle = data.legend[i].fill;
            ctx.beginPath();
            if(i>0) z += ctx.measureText(data.legend[i-1].text).width;
            else z = 60;
            ctx.arc(58*i + z, c.height-10, 8, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        }

    }

    var data = {
        dataset: [
            {label: '8:00',value: 23, fill: '#ffc59b'},
            {label: '', value: 55, fill: '#f88c6c'},
            {label: '9:00', value: 58, fill: '#f88c6c'},
            {label: '', value: 50, fill: '#f88c6c'},
            {label: '10:00', value: 10, fill: '#ffc59b'},
            {label: '', value: 25, fill: '#ffc59b'},
            {label: '11:00', value: 46, fill: '#f88c6c'},
            {label: '', value: 85, fill: '#e64e21'},
            {label: '12:00', value: 75, fill: '#e64e21'},
            {label: '', value: 62, fill: '#e64e21'},
            {label: '13:00', value: 49, fill: '#f88c6c'},
            {label: '', value: 47, fill: '#f88c6c'},
            {label: '14:00', value: 42, fill: '#f88c6c'},
            {label: '', value: 20, fill: '#ffc59b'},
            {label: '15:00', value: 28, fill: '#ffc59b'},
            {label: '', value: 48, fill: '#f88c6c'},
            {label: '16:00', value: 36, fill: '#ffc59b'},
            {label: '', value: 73, fill: '#e64e21'},
            {label: '17:00', value: 55, fill: '#e64e21'},
            {label: '', value: 65, fill: '#e64e21'},
            {label: '18:00', value: 68, fill: '#e64e21'},
            {label: '', value: 48, fill: '#f88c6c'},
            {label: '19:00', value: 43, fill: '#f88c6c'},
            {label: '', value: 37, fill: '#ffc59b'},
            {label: '20:00', value: 58, fill: '#e64e21'},
            {label: '', value: 47, fill: '#f88c6c'},
            {label: '21:00', value: 37, fill: '#ffc59b'},
            {label: '', value: 30, fill: '#ffc59b'},
            {label: '22:00', value: 20, fill: '#ffc59b'}
        ],
        legend: [
            {fill: '#ffc59b', text: 'bez fronty'},
            {fill: '#f88c6c', text: 'možnost fronty'},
            {fill: '#e64e21', text: 'pravděpodobné čekání ve frontě'}
        ],
        label: 'Pondělí'
    };
    var options = {
        bar_width: 17,
        rounded: true
    };
    var barChart = Chart('barChart', data, options);
    options.rounded = false;
    var roundedBarChart = new Chart('roundedBarChart', data, options);


});
