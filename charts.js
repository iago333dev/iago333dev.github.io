"use strict";
var Selectize = /** @class */ (function () {
    function Selectize() {
        this.init();
    }
    Selectize.prototype.init = function () {
        var initValue;
        $('.action-box').selectric({
            onInit: function (element) {
                initValue = $(this).val();
            },
            onChange: function (element) {
                if ($(this).val() !== initValue)
                    $(element).parents('form').submit();
            }
        });
    };
    return Selectize;
}());
var Charts = /** @class */ (function () {
    function Charts() {
        this.colors = ["#ff3434", "#ffdd33", "#67b678", "#E08886","#3333ff", "#00e6e6"];
        this.tickColor = "#0c0c0d";
        this.initRadar();
        this.initBarHorizontal();
        this.initDoughnut();
    }
    Charts.prototype.initRadar = function () {
        var ctxD = $('#radarChartDark'), chartData = {
            type: 'radar',
            data: {
                labels: ["Education", "Food", "Transport", "Drinks", "Other"],
                datasets: [
                    {
                        label: "2014",
                        backgroundColor: this.convertHex(this.colors[0], 20),
                        borderColor: this.colors[0],
                        borderWidth: 1,
                        pointRadius: 2,
                        data: [51, 67, 90, 31, 16],
                    },
                    {
                        label: "2015",
                        backgroundColor: this.convertHex(this.colors[1], 20),
                        borderColor: this.colors[1],
                        borderWidth: 1,
                        pointRadius: 2,
                        data: [75, 44, 19, 22, 43],
                    },
                    {
                        label: "2015",
                        backgroundColor: this.convertHex(this.colors[2], 20),
                        borderColor: this.colors[2],
                        borderWidth: 1,
                        pointRadius: 2,
                        data: [7, 14, 29, 82, 33]
                    }
                ]
            },
            options: {
                scale: {
                    pointLabels: {
                        fontColor: this.tickColor
                    },
                    ticks: {
                        display: false,
                        stepSize: 25
                    }
                },
                legend: {
                    position: "bottom",
                    labels: {
                        boxWidth: 11,
                        fontColor: this.tickColor,
                        fontSize: 11
                    }
                }
            }
        }, myDarkRadarChart = new Chart(ctxD, chartData);
    };
    Charts.prototype.initBarHorizontal = function () {
        var ctxD = $("#barChartHDark"), chartData = {
            type: 'horizontalBar',
            data: {
                labels: ["PHP", "Jquery", "Laravel", "JavaScript", "MySQL", "Ruby On Rails", "CakePHP", "TypeScript", "React", "Docker", "CSS", "Linux"],
                datasets: [{
                        data: [100, 60, 50, 80, 95, 60, 85, 70, 50, 80, 90, 90],
                        backgroundColor: this.colors[2],
                        hoverBackgroundColor: this.convertHex(this.colors[2], 70)
                    }]
            },
            options: {
                barThickness: 10,
                scales: {
                    xAxes: [{
                            stacked: true,
                            ticks: {
                                fontColor: this.tickColor,
                            },
                            gridLines: {
                                drawOnChartArea: false
                            }
                        }],
                    yAxes: [{
                            stacked: true,
                            ticks: {
                                fontColor: this.tickColor,
                                min: 0,
                                max: 175,
                                stepSize: 25
                            }
                        }]
                },
                legend: {
                    display: false
                }
            }
        }, myDarkRadarChart = new Chart(ctxD, chartData);
    };
    Charts.prototype.initDoughnut = function () {
        var ctxD = $('#doughnutChartDark'), chartData = {
            type: 'doughnut',
            data: {
                labels: ["PHP", "MYSQL", "Javascript", "C", "Outros"],
                datasets: [{
                        data: [80, 50, 40, 30, 20],
                        borderWidth: 0,
                        backgroundColor: [
                            this.convertHex(this.colors[0], 60),
                            this.convertHex(this.colors[1], 60),
                            this.convertHex(this.colors[2], 60),
                            this.convertHex(this.colors[4], 60),
                            this.convertHex(this.colors[5], 60),
                        ],
                        hoverBackgroundColor: [
                            this.colors[0],
                            this.colors[1],
                            this.colors[2],
                        ]
                    }]
            },
            options: {
                responsive: true,
                legend: {
                    position: "bottom",
                    labels: {
                        boxWidth: 11,
                        fontColor: this.tickColor,
                        fontSize: 11
                    }
                }
            }
        }, myDarkRadarChart = new Chart(ctxD, chartData);
    };
    Charts.prototype.convertHex = function (hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
        return result;
    };
    return Charts;
}());
new Selectize();
new Charts();