$(document).ready(function(){
  $("#search").on("keyup", function() {
    const value = $(this).val().toLowerCase();
    console.log(value)
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

const confirmDelete = (title) => {
  return confirm(`Yakin ingin hapus buku ${title} ?`);
}




let totalCount = 0;
let totalPrice = 0
$('#jumlah').text(totalCount);
$('#total-price').html(`<label class="badge text-bg-success">Rp. ${totalPrice}</label>`);
$('input[type="checkbox"]').on('change', function() {

  const price = $(this).data('price');
  const curretRow = $(this).closest("tr");
  const getcount = curretRow.find('td:eq(3)').text();
  const count = parseInt(getcount);

  if (this.checked) {
    totalCount = totalCount + count;
  } else {
    totalCount = totalCount - count;
  }
  totalPrice = totalCount*price

  $('#jumlah').text(totalCount);
  $('#total-price').html(`<label class="badge text-bg-success">Rp. ${totalPrice}</label>`);
  console.log(totalCount);
});

