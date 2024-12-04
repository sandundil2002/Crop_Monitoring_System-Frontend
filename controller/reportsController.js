import {
  getCropsBySeason,
  getAllVehicles,
  getAllEquipments,
} from "../model/reportsModel.js";

$(document).ready(async function () {
  const seasons = [
    { name: "Spring", image: "../assets/images/reports/spring.png" },
    { name: "Summer", image: "../assets/images/reports/summer.png" },
    { name: "Autumn", image: "../assets/images/reports/autumn.png" },
    { name: "Winter", image: "../assets/images/reports/winter.png" },
  ];
  const container = $("#seasonCardsContainer");

  for (const season of seasons) {
    try {
      const crops = await getCropsBySeason(season.name);
      const cardHtml = generateFlipCard(season, crops);
      container.append(cardHtml);
    } catch (error) {
      console.error(`Error fetching crops for ${season.name}:`, error);
    }
  }

  vehicleChart();
  equipmentChart();
});

function generateFlipCard(season, crops) {
  const cropListHtml = crops.length
    ? crops
        .map((crop) => `<li>${crop.commonName} - ${crop.cropId}</li>`)
        .join("")
    : "<h6>No crops available</h6>";

  return `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${season.image}" alt="${season.name} Image" class="card-image" />
                    <p class="title">${season.name} Season</p>
                </div>
                <div class="flip-card-back">
                    <p class="title">Available Crops</p>
                    <h6>${cropListHtml}</h6>
                </div>
            </div>
        </div>
    `;
}

async function vehicleChart() {
  const vehicles = await getAllVehicles();

  const categoryCounts = vehicles.reduce((counts, vehicle) => {
    counts[vehicle.category] = (counts[vehicle.category] || 0) + 1;
    return counts;
  }, {});

  const labels = Object.keys(categoryCounts);
  const data = Object.values(categoryCounts);

  const ctx = document.getElementById("vehicleCategoryChart").getContext("2d");
  const vehicleCategoryChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Vehicle Categories",
          data: data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#E7E9ED",
            "#C9CBCF",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 20,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  });
}

async function equipmentChart() {
  const equipment = await getAllEquipments();

  const categoryCounts = equipment.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});

  const labels = Object.keys(categoryCounts);
  const data = Object.values(categoryCounts);

  const ctx = document
    .getElementById("equipmentCategoryChart")
    .getContext("2d");
  const equipmentCategoryChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Equipment Categories",
          data: data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#E7E9ED",
            "#C9CBCF",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 20,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  });
}
