const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("fixme", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
  });
});

describe("Positive qualities", function () {
  it("Qualities can never be negative", function () {
    const gildedRose = new Shop([new Item("banana", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(0);
  });
});

describe("Aged Brie", function () {
  it("Aged brie appreciates in value", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThan(0);
  });
  it("Aged brie appreciates in value by 1 ", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });
  it("Aged brie is never worth more than 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(50);
  })
});

describe("Backstage passes", function () {
  it("Appreciate in value", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(1);
  });


  it("Less than 11 days to go - increases by 2", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });
  it("Less than 5 days to go - increases by 3", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });
  it("After concert it goes to 0", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

describe("Sulfuras", function () {
  it("Never decreases in quality", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 4, 34)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(34);
  });
  it("Never has to be sold", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 4, 34)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
  });
});

describe("Conjured Items", function () {
  it("Detects item is conjured", function () {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 4, 34)]);
    const items = gildedRose.updateQuality();
    expect(gildedRose.is_conjured(items[0].name)).toBe(true);
  });
  it("Before sellby, decreases by 2", function () {
    const gildedRose = new Shop([new Item("Conjured Walrus", 4, 34)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(32);
  });
  it("After sellby, decreases by 4", function () {
    const gildedRose = new Shop([new Item("Conjured Walrus", 0, 34)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(30);
  });
});