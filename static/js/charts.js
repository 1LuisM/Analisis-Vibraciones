document.addEventListener("DOMContentLoaded", function () {
    const estadoSelect = document.getElementById("estado");

    const acelerometroCtx = document.getElementById("acelerometroChart").getContext("2d");
    const giroscopioCtx = document.getElementById("giroscopioChart").getContext("2d");

    let acelerometroChart, giroscopioChart;

    function crearGrafica(ctx, label, data) {
        return new Chart(ctx, {
            type: "line",
            data: {
                labels: Array.from({ length: data.x.length }, (_, i) => i),
                datasets: [
                    { label: label + " X", data: data.x, borderColor: "red" },
                    { label: label + " Y", data: data.y, borderColor: "green" },
                    { label: label + " Z", data: data.z, borderColor: "blue" }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    function actualizarGraficas(estado) {
        fetch(`/datos/${estado}`)
            .then(res => res.json())
            .then(data => {
                if (acelerometroChart) acelerometroChart.destroy();
                if (giroscopioChart) giroscopioChart.destroy();

                acelerometroChart = crearGrafica(acelerometroCtx, "Acelerómetro", data.acelerometro);
                giroscopioChart = crearGrafica(giroscopioCtx, "Giroscopio", data.giroscopio);
            });
    }

    estadoSelect.addEventListener("change", () => {
        actualizarGraficas(estadoSelect.value);
    });

    actualizarGraficas(estadoSelect.value);
});