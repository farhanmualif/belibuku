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
let totalPrice = 0;
let book = [];

$('#jumlah').text(totalCount);
$('#total-price').html(`<label class="badge text-bg-success">Rp. ${totalPrice}</label>`);

$('input[type="checkbox"]').on('change', function() {

  const price = $(this).data('price');

  const currentRow = $(this).closest("tr");
  const getCount = currentRow.find('td:eq(4)').text();
  const idBook = currentRow.find('td:eq(4)').text()
  const count = parseInt(getCount);
  const title = currentRow.find('td:eq(1)').text();

  let checkLength = $('input[type="checkbox"]:checked').length;
  if (this.checked) {
    totalCount = totalCount + count;
  } else {
    totalCount = totalCount - count;
    const index = book.indexOf(title);
    if (index > -1) { // only splice array when item is found
      book.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  totalPrice = totalCount * price;
  if (checkLength > 0 && $('.button-pay').length === 0) {
    $('#form-data').append('<button type="submit" class="btn btn-primary btn-sm button-pay" id="pay-now">Checkout</button>');
  } else if (checkLength === 0) {
    $('.button-pay').remove();
  }

  $('#jumlah').text(totalCount);
  $('#total-price').html(`<label class="badge text-bg-success">Rp. ${totalPrice}</label>`);

  $("#pay-now").on("click", ()=>{
    book.push({id_book: idBook, title: title, count: count, price: price})
    let struct = {
      books : book,
      totalCount,
      totalPrice,
  }
  $('#data').val(JSON.stringify(struct))
  console.log(struct)
})
});


$('input[type=radio]').on('change', function() { 
  if ($(this).val() == 'bni') {
      $('#for-number-card').html(`
      <div id="number-card">
      <label for="cc-name">Name on card</label>
      <input type="text" class="form-control" id="cc-name" placeholder="" required>
      <small class="text-muted">Full name as displayed on card</small>
      <div class="invalid-feedback">
          Name on card is required
      </div>
      </div>`)
  } else {
    $('#number-card').remove()
  }
});


