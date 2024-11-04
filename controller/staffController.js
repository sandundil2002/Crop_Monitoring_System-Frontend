$(document).ready(function () {
  $("#field").change(function () {
    $("#field option:selected").each(function () {
      const value = $(this).val();
      if (
        $("#selectedFieldsList li").filter(function () {
          return $(this).text().includes(value);
        }).length === 0
      ) {
        $("#selectedFieldsList").append(`
                        <li>${value} 
                            <button class="remove-btn btn btn-danger mb-2" style="margin-left:10px;" data-value="${value}">
                                &#10005;
                            </button>
                        </li>
                    `);
      }
    });
  });

  $("#selectedFieldsList").on("click", ".remove-btn", function () {
    const valueToRemove = $(this).data("value");
    $(this).parent().remove();
    $("#field option")
      .filter(function () {
        return $(this).val() === valueToRemove;
      })
      .prop("selected", false);
  });

  $("#editField").change(function () {
    $("#editField option:selected").each(function () {
      const value = $(this).val();

      if (
        $("#editSelectedFieldsList li").filter(function () {
          return $(this).text().includes(value);
        }).length === 0
      ) {
        $("#editSelectedFieldsList").append(`
                        <li>${value} 
                            <button class="remove-btn btn btn-danger mb-2" data-value="${value}" style="margin-left:10px;">
                                &#10005;
                            </button>
                        </li>
                    `);
      }
    });
  });

  $("#editSelectedFieldsList").on("click", ".remove-btn", function () {
    const valueToRemove = $(this).data("value");
    $(this).parent().remove();
    $("#editField option")
      .filter(function () {
        return $(this).val() === valueToRemove;
      })
      .prop("selected", false);
  });

  $("#btn-edit-staff").on("click", function () {
    const row = $(this).closest("tr");
    const staffId = row.find("td:eq(0)").text();
    const staffFirstName = row.find("td:eq(1)").text();
    const designation = row.find("td:eq(2)").text();
    const field = row.find("td:eq(3)").text();
    const dob = row.find("td:eq(4)").text();
    const gender = row.find("td:eq(5)").text();
    const address = row.find("td:eq(8)").text();
    const mobile = row.find("td:eq(10)").text();
    const role = row.find("td:eq(11)").text();
    const vehicle = row.find("td:eq(13)").text();

    $("#editStaffId").val(staffId);
    $("#editStaffFirstName").val(staffFirstName);
    $("#editDesignation").val(designation);
    $("#editGender").val(gender);
    $("#editDob").val(dob);
    $("#editAddressL1").val(address);
    $("#editMobile").val(mobile);
    $("#editRole").val(role);
    $("#editField").val(field);
    $("#editVehicle").val(vehicle);

    $("#editStaffModal").modal("show");
  });
});