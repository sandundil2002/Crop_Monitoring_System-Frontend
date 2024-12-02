import { getCropsBySeason } from "../model/reportsModel.js";

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
