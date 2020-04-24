"use strick"
$(document).ready(function () {

    //retriving the income data for current user
    var incomes = Utility.search("income", "UserName", login.UserName);

    if (incomes != undefined) {

        //filtering the income data by month
        //to display on the bar graph

        var array = [];
        var incomeMonths = [];

        $.each(incomes, function (index, value) {

            var month = new Date(value.IncomeDate).getMonth();

            if (!incomeMonths.includes(month)) {

                incomeMonths.push(month);
                array[getMonthText(month)] = 0;
            }
        });

        for (var i = 0; i < incomeMonths.length; i++) {

            for (var j = 0; j < incomes.length; j++) {

                var month = new Date(incomes[j].IncomeDate).getMonth();

                if (incomeMonths[i] == month) {

                    array[getMonthText(month)] += incomes[j].Amount;
                }
            }
        }

        incomeMonths.sort();
        var monthLabels = [];
        var monthIncomes = [];
        var maxIncome = 0;

        for (var i = 0; i < incomeMonths.length; i++) {

            monthLabels.push(getMonthText(incomeMonths[i]));
            monthIncomes.push(array[getMonthText(incomeMonths[i])]);
        }


        maxIncome = monthIncomes.reduce(function (a, b) {
            return Math.max(a, b);
        });

        //jQuery chart.js code to display the bar-chart
        var barChart = new Chart($('#barChart'), {
            type: 'bar',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: "Revenue",
                    backgroundColor: "#4e73df",
                    hoverBackgroundColor: "#2e59d9",
                    borderColor: "#4e73df",
                    data: monthIncomes,
                }],
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'month'
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 6
                        },
                        maxBarThickness: 25,
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: maxIncome + 1000,
                            maxTicksLimit: 5,
                            padding: 10,
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return '$ ' + value;
                            }
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        }
                    }],
                },
                legend: {
                    display: false
                },
                tooltips: {
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                    callbacks: {
                        label: function (tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + ': $' + tooltipItem.yLabel;
                        }
                    }
                },
            }
        });

        barChart.canvas.parentNode.style.height = '400px';
    } else {

        //if income data is not available the bar chart container will display following Message
        $('#barChart').parent().html('<h2>No Data Available!!</h2>');
    }

    //retriving the income data for current user
    var expenses = Utility.search("expense", "UserName", login.UserName);

    if (expenses != undefined) {

        //filtering the expense data by month
        //to display on the bar graph
        var array1 = [];
        var expenseMonths = [];

        $.each(expenses, function (index, value) {

            var month = new Date(value.ExpenseDate).getMonth();

            if (!expenseMonths.includes(month)) {

                expenseMonths.push(month);
                array1[getMonthText(month)] = 0;
            }
        });

        for (var i = 0; i < expenseMonths.length; i++) {

            for (var j = 0; j < expenses.length; j++) {

                var month = new Date(expenses[j].ExpenseDate).getMonth();

                if (expenseMonths[i] == month) {

                    array1[getMonthText(month)] += expenses[j].Amount;
                }
            }
        }

        expenseMonths.sort();
        var expenseMonthLabels = [];
        var expenseMonthIncomes = [];
        var maxExpense = 0;

        for (var i = 0; i < expenseMonths.length; i++) {

            expenseMonthLabels.push(getMonthText(expenseMonths[i]));
            expenseMonthIncomes.push(array1[getMonthText(expenseMonths[i])]);
        }

        maxExpense = expenseMonthIncomes.reduce(function (a, b) {
            return Math.max(a, b);
        });

        //jQuery chart.js code to display the pie-chart
        var pieChart = new Chart($('#pieChart'), {
            type: 'pie',
            data: {
                labels: expenseMonthLabels,
                datasets: [{
                    data: expenseMonthIncomes,
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: true
                },

                cutoutPercentage: 80,
            },
        });

        pieChart.canvas.parentNode.style.height = '400px';
    } else {

        //if expense data is not available the pie-chart container will display following Message
        $('#pieChart').parent().html('<h2>No Data Available!!</h2>');
    }


});

//function to return thr text of the month with output of Date().getMonth()
function getMonthText(currentMonth) {
    if (currentMonth === 0) {
        return "January";
    } else if (currentMonth === 1) {
        return "February";
    } else if (currentMonth === 2) {
        return "March";
    } else if (currentMonth === 3) {
        return "April";
    } else if (currentMonth === 4) {
        return "May";
    } else if (currentMonth === 5) {
        return "June";
    } else if (currentMonth === 6) {
        return "July";
    } else if (currentMonth === 7) {
        return "August";
    } else if (currentMonth === 8) {
        return "September";
    } else if (currentMonth === 9) {
        return "October";
    } else if (currentMonth === 10) {
        return "November";
    } else if (currentMonth === 11) {
        return "December";
    }
};