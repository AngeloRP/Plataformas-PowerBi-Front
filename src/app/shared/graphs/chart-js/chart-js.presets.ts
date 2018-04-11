export const presets = {
    line: {
        dataset: {
            pointBorderColor: '#fff',
            pointRadius: 4,
            borderColor: 'rgba(0,0,0,0.15)',
            borderWidth: 2,
            pointBorderWidth: 1,
            fill: false
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'nearest',
                callbacks: {
                    title: function(tooltipItems, data) {
                        return '';
                    },
                    label: function(tooltipItem, data) {
                        var datasetLabel = '';
                        var label = data.labels[tooltipItem.index];
                        var y = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        // console.log('dato eje y');
                        // console.log(y);
                        var z = (typeof y == 'number') ? ' : ' + Math.round(y) : '%';
                        return tooltipItem.xLabel + z;
                    }
                }
            },
            hover: {
                mode: 'dataset'
            },
            legend: {
                display: true,
                labels: {
                    fontColor: '#8da3c1'
                }
            },
            scales: {
                gridLines: {
                    color: 'rgba(192,192,192,0.1)'
                },
                xAxes: [{
                    display: true,
                    type: 'time',
                    time: {
                        unit: 'millisecond',
                        stepSize: 10,
                        fontColor: '#fff',
                        displayFormats: {
                            millisecond: 'SSS'
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Etapa (%)',
                        fontColor: '#fff'
                    },
                    ticks: {
                        fontColor: '#252020bf',
                        stepSize: 10
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Objetivo (%)',
                        fontColor: '#fff'
                    },
                    ticks: {
                        autoSkip: true,
                        //maxTicksLimit: 10,
                        stepSize: 10,
                        fontColor: '#252020bf',
                        suggestedMax: 100,
                        suggestedMin: 0
                    }
                }]
            }
        }
    },


    radar: {
        dataset: {},
        options: {
            legend: {
                display: false
            },

            scale: {
                reverse: false,
                lineWidth: 0,
                gridLines: {
                    color: 'rgba(192,192,192,0.1)'
                },
                ticks: {
                    display: false
                }
            }
        }
    },


    polarArea: {
        dataset: {},
        options: {
            responsive: true,
            legend: {
                display: false
            },
            title: {
                display: false
            },
            scale: {
                gridLines: {
                    color: 'rgba(192,192,192,0.1)'
                },
                ticks: {
                    beginAtZero: true
                },
                reverse: false
            },
            animateRotate: false
        }
    },


    bar: {
        dataset: {
            borderWifth: 2
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        color: 'rgba(192,192,192,0.1)'
                    },
                    ticks: {
                        fontColor: '#252020bf'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: 'rgba(192,192,192,0.1)'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Soles (S/.)',
                        fontColor: '#252020bf'
                    },
                    ticks: {
                        fontColor: '#252020bf',
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false
            },
            responsive: true
        }
    },


    doughnut: {
        dataset: {},
        options: {
            scales: {
                xAxes: [{
                    display: false,
                    gridLines: {
                        color: 'rgba(192,192,192,0.1)'
                    },
                    ticks: {
                        fontColor: '#252020bf'
                    }
                }],
                yAxes: [{

                    display: false,
                    gridLines: {
                        color: 'rgba(192,192,192,0.1)'
                    },
                    ticks: {
                        fontColor: '#252020bf'
                    }
                }]
            },
            responsive: true,
            legend: {
                display: true,
                labels: {
                    fontColor: '#252020bf'
                }
            }
        }
    },

    pie: {
        dataset: {},
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        color: 'rgba(192,192,192,0.1)'
                    }, ticks: {
                        fontColor: '#252020bf'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: 'rgba(192,192,192,0.1)'
                    }, ticks: {
                        fontColor: '#252020bf'
                    }
                }]
            },
            legend: {
                display: false
            },
            responsive: true
        }
    }
};
