$(document).ready(function () {
    let predicted = [];
    let original = [];
    let tomm_pred, mse;
    let err = true;

    $('.loader').hide();

    $("#comp").keypress(function (e) {
        if (e.which == 13) {
            $("#button1").click();
        }
    });

    $("#button1").click(function () {
        $('.loader').show();
        let tick = $("#comp").val().toUpperCase();
        const Url = `http://127.0.0.1:5000/predict/${tick}`;

        $.ajax({
            url: Url,
            type: "GET",
            success: function (result) {
                predicted = JSON.parse(result['predicted']);
                original = JSON.parse(result['original']);
                tomm_pred = JSON.parse(result['tommrw_prdctn']);
                mse = JSON.parse(result['mn_sqre_err']);
                err = true;
                displayPrediction();
            },
            error: function () {
                err = false;
                $(".details").html("<p class='text-danger'>Error fetching data. Please try again.</p>");
            },
            complete: function () {
                $('.loader').hide();
            }
        });
    });

    function displayPrediction() {
        if (err) {
            $(".details").html(`
                <h4 style="color: limegreen;">Tomorrow's Prediction: ${tomm_pred}</h4>
                <h4 style="color: limegreen;">MSE: ${mse}</h4>
            `);

            new Chart($("#myChart1"), {
                type: 'line',
                data: {
                    labels: Array.from({ length: predicted.length }, (_, i) => i + 1),
                    datasets: [
                        {
                            label: 'Prediction',
                            data: predicted,
                            borderColor: 'rgb(247, 33, 4)',
                            borderWidth: 3,
                            fill: false,
                        },
                        {
                            label: 'Original',
                            data: original,
                            borderColor: 'rgb(26, 26, 239)',
                            borderWidth: 3,
                            fill: false,
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{ gridLines: { display: false } }],
                        yAxes: [{ gridLines: { display: true } }]
                    },
                    elements: { point: { radius: 0 } },
                    animation: { duration: 1000 }
                }
            });
        }
    }
});
