const Base = require('./base.js');

module.exports = class extends Base {
  async infoAction() {
    const region = await this.model('region').getRegionInfo(
      this.get('regionId')
    );
    return this.success(region);
  }

  async listAction() {
    const regionList = await this.model('region').getRegionList(
      this.get('parentId')
    );
    return this.success(regionList);
  }
  async getAddressAction() {
    const regionList = await this.model('region').getRegionList(
      this.get('parentId')
    );
    const data = [];
    for (let i = 0; i < regionList.length; i++) {
      const obj = {
        label: regionList[i].name,
        value: regionList[i].id,
        children: []
      };
      const city = await this.model('region').getRegionList(regionList[i].id);
      for (let j = 0; j < city.length; j++) {
        const tempObj = {
          label: city[j].name,
          value: city[j].id,
          children: []
        };
        const county = await this.model('region').getRegionList(city[j].id);
        for (let k = 0; k < county.length; k++) {
          const lastObj = {
            label: county[k].name,
            value: county[k].id
          };
          tempObj.children.push(lastObj);
        }
        obj.children.push(tempObj);
      }
      data.push(obj);
    }
    return this.success(data);
  }
};
