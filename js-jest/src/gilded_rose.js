class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  update(quality, increment) {
    if (increment > 0) {
      return Math.min(50, quality + increment);
    } else {
      return Math.max(0, quality + increment);
    }
  }
  is_conjured(name) {
    return (name.startsWith("Conjured"));
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let fineWine = false;
      let name = this.items[i].name;
      let quality = this.items[i].quality;
      let sellin = this.items[i].sellIn;
      let legendaryStatus = false;
      let goneOff = false;
      let multiplier = 1;

      if (name == "Aged Brie" || name == 'Backstage passes to a TAFKAL80ETC concert') {
        fineWine = true;
      }

      if (name == "Sulfuras, Hand of Ragnaros") {
        legendaryStatus = true;
      }

      if (!legendaryStatus) {
        sellin -= 1;
      }

      if (sellin < 0) {
        goneOff = true;
      }

      if (!fineWine && !legendaryStatus) {
        if (goneOff) {
          multiplier *= 2
        }
        if (this.is_conjured(name)) {
          multiplier *= 2
        }
        quality = this.update(quality, -1 * multiplier);
      }

      if (name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (sellin > 10) {
          quality = this.update(quality, 1);
        }
        else if (sellin > 4) {
          quality = this.update(quality, 2);
        }
        else if (sellin > 0) {
          quality = this.update(quality, 3);
        }
        else {
          quality = 0;
        }
      }

      if (name == "Aged Brie") {
        quality = this.update(quality, 1);
      }

      this.items[0].quality = quality;
      this.items[0].sellIn = sellin;
      return this.items;
    }
  }
}

module.exports = {
  Item,
  Shop
}
