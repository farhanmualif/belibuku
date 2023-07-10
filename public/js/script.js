$(document).ready(function(){
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    console.log(value)
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

const confirmDelete = (title) => {
  return confirm(`Yakin ingin hapus buku ${title} ?`);
}
