const Item = require("./models/items.model");

const costgrabber = async (items) => {
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    const founditem = await Item.findOne({ itemname: items[i] });
    if (!founditem) {
      return 0;
    }
    sum += founditem.cost;
    // console.log(sum);
  }
  console.log(sum);
  return sum;
};

module.exports = costgrabber;
