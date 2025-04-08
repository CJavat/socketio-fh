const Band = require("./band");

class BandList {
  constructor() {
    this.bands = [
      new Band("Bring Me The Horizon"),
      new Band("Guns N' Roses"),
      new Band("My Chemical Romance"),
      new Band("The Used"),
    ];
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);

    return this.bands;
  }

  removeBand(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  getBands() {
    return this.bands;
  }

  increaseVotes(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes += 1;
      }

      return band;
    });
  }

  changeBandName(id, newName) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }

      return band;
    });
  }
}

module.exports = BandList;
