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
  $("#cropCommonName").on("change", function () {
    const selectedCommonName = $(this).val();
    const scientificName = cropScientificNames[selectedCommonName];
    $("#cropScientificName").val(scientificName);
  });
});
