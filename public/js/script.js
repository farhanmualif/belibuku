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
  
// get price
  const currentRow = $(this).closest("tr");
  const getCount = currentRow.find('td:eq(4)').text();
  const book_id = currentRow.find('td:eq(0)').text()
  const title = currentRow.find('td:eq(1)').text();
  const price = parseInt(currentRow.find(".badge").text().replace("Rp. ",""))
  const count = parseInt(getCount);
  const seller_id = currentRow.find('td:eq(5)').text()

  let checkLength = $('input[type="checkbox"]:checked').length;
  if (this.checked) {
    totalCount = totalCount + count;
    totalPrice = totalPrice + (count*price)
    
  } else {
    totalCount = totalCount - count;
    totalPrice = totalPrice - (count*price);
    const index = book.map(obj => obj.title).indexOf(title)
    if (index > -1) { // only splice array when item is found
      book.splice(index, 1); // 2nd parameter means remove one item only
    }
  }
  book.push({book_id, seller_id, title, count, price})
  const data = {
    book,
    totalCount,
    totalPrice
  }
  if (checkLength > 0 && $('.button-pay').length === 0) {
    $('#form-data').append('<button type="submit" class="btn btn-primary btn-sm button-pay" id="btn-submit">Checkout</button>');
  } else if (checkLength === 0) {
    $('.button-pay').remove();
  }

  $('#jumlah').text(totalCount);
  $('#total-price').html(`<label class="badge text-bg-success">Rp. ${totalPrice}</label>`);
  
  $('form').on('submit',function(){
    $('#data').val(JSON.stringify(data))
  })
});




$('input[type=radio]').on('change', function() { 
  if ($(this).val() == 'transfer') {
      $('#card-number').html(`
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


