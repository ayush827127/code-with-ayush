import { getCollection } from "@/lib/mongodb";

class Design {
  static async getCollection() {
    return await getCollection("designs");
  }

  static async create(designData) {
    const collection = await this.getCollection();
    
    if (!designData.title || !designData.htmlContent || !designData.cssContent || !designData.category) {
      throw new Error("Missing required fields");
    }

    const newDesign = {
      ...designData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newDesign);
    return { ...newDesign, _id: result.insertedId };
  }

  static async findById(id) {
    const collection = await this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  static async findAll({ category, page = 1, limit = 8 } = {}) {
    const collection = await this.getCollection();
    const skip = (page - 1) * limit;
    const query = category ? { category } : {};

    return await collection.find(query)
      .skip(skip)
      .limit(limit)
      .toArray();
  }
}

export default Design;