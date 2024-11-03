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
});
