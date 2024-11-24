import { getAllCrops } from "../model/cropsModel.js";

console.log(localStorage.getItem("authToken"));
const cropScientificNames = {
  Rice: "Oryza sativa",
  Cowpea: "Vigna unguiculata",
  GreenGram: "Vigna radiata",
  Chickpea: "Cicer arietinum",
  SweetPotato: "Ipomoea batatas",
  Reddish: "Raphanus sativus",
  Cassava: "Manihot esculenta",
};

$(document).ready(function () {
  $(".cropCommonName").on("change", function () {
    const selectedCommonName = $(this).val();
    const scientificName = cropScientificNames[selectedCommonName];
    $(".cropScientificName").val(scientificName);
  });

  $("#btn-edit-crop").on("click", function () {
    const row = $(this).closest("tr");
    const cropId = row.find("td:eq(0)").text();
    const cropCommonName = row.find("td:eq(1)").text();
    const cropScientificName = row.find("td:eq(2)").text();
    const fieldType = row.find("td:eq(3)").text();
    const cropCategory = row.find("td:eq(4)").text();
    const cropSeason = row.find("td:eq(5)").text();
    const cropImg = row.find("td:eq(6)").text();

    $("#editCropId").val(cropId);
    $("#editFieldType").val(fieldType);
    $("#editCropCommonName").val(cropCommonName);
    $("#editCropScientificName").val(cropScientificName);
    $("#editCropCategory").val(cropCategory);
    $("#editCropSeason").val(cropSeason);
    $("#editCropImg").val(cropImg);

    $("#editCropModal").modal("show");
  });

  $(".dropdown-item").click(function () {
    var selectedValue = $(this).data("value");
    $("#dropdownMenuButton").text(selectedValue);
  });

  $("#editCropForm").on("submit", function (event) {
    event.preventDefault();
    $("#editCropModal").modal("hide");
  });

  loadCropTable();
});

async function loadCropTable() {
  try {
    const cropList = await getAllCrops();
    const cropTable = $("#cropTable");
    cropTable.empty();

    cropList.forEach((crop) => {
      const imageSrc = crop.cropImg
          ? `data:image/jpeg;base64,${crop.cropImg}`
          : "./assets/images/default-crop.png";

      cropTable.append(`
        <tr>
          <td>${crop.cropId}</td>
          <td>${crop.commonName}</td>
          <td>${crop.scientificName}</td>
          <td>${crop.fields || "-"}</td>
          <td>${crop.category}</td>
          <td>${crop.season}</td>
          <td><img src="${imageSrc}" alt="Crop Image" width="50" height="50"></td>
          <td>
            <button class="btn btn-outline-primary btn-sm mb-1 btn-edit-crop mx-1" data-crop-id="${crop.cropId}" data-bs-toggle="modal" data-bs-target="#editCropModal">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm mb-1 btn-delete-crop" data-crop-id="${crop.cropId}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `);
    });
  } catch (error) {
    console.error("Error loading crop table:", error);
  }
}