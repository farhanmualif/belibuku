const model = require("./model");

class paymentModel extends model
{
  constructor(){
    super()
    this.table = 'payment'
    this.fields = ['transaction_id','totalPrice','totalCount','payment','created_at']
  }
}

module.exports = paymentModel