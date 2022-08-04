class FeatureApi {
  constructor(query, model) {
    this.query = query;
    this.model = model;
  }
  filter() {
    // urlga kiritilgan query apini feature bolishi mk oshani uchun ozini featurelarini ochirib chiqamiza
    const deleteQuery = ["sort", "field", "page", "limit"];

    let queryCopy = { ...this.query };

    deleteQuery.forEach((val) => {
      return delete queryCopy[val];
    });
    queryCopy = JSON.stringify(queryCopy);

    queryCopy = queryCopy.replace(/\bgt|gte|lte|lt\b/g, (val) => `$${val}`);

    queryCopy = JSON.parse(queryCopy);

    this.model = this.model.find(queryCopy);

    return this;
  }
  sorting() {
    if (this.query.sort) {
      // /api/v1/tours?sort=duration,price ---> ikkita ushta narsani sort qilmoqchi bolsak vergul bilan yozamiz lekin sortni ichiga joy tashab yozish kerak
      let sortData = this.query.sort.split(","); //-->[duration,data]
      sortData = sortData.join(" "); //-->"duration data"
      this.model = this.model.sort(sortData);
    } else {
      this.model = this.model.sort("-createdAt");
    }
    return this;
  }
  field() {
    if (this.query.field) {
      // /api/v1/tours?field=duration,price ---> ikkita ushta narsani field qilmoqchi bolsak vergul bilan yozamiz lekin select ichiga joy tashab yozish kerak
      let fieldData = this.query.field.split(","); //-->[duration,data]
      fieldData = fieldData.join(" "); //-->"duration data"
      this.model = this.model.select(fieldData);
    } else {
      this.model = this.model.select("-__v"); // oldiga minus qoysak oshani olib kelmaydi
    }
    return this;
  }
  pagination() {
    const page = this.query.page || 1;
    const limit = this.query.limit;
    this.model = this.model.skip((page - 1) * limit).limit(limit);
    return this;
  }
}

module.exports = FeatureApi;
