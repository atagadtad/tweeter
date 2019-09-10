$(document).ready(function () {
  const maxLength = 140
  $("#text-box").keyup(function () {
    let initialLength = $(this).val().length;
    let length = maxLength - initialLength;
    let count = $("form").find("#counter");
    if (length < 0) {
      $(count).css("color", "red");
    } else {
      $(count).css("color", "#545149");
    }
    $(count).text(length);
  })
});



