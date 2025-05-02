// /models/User.js
'use server'; // Mark as server-only

import { getCollection } from "@/lib/mongodb";

class User {
  static async getCollection() {
    return await getCollection("users");
  }

  static async findByUid(uid) {
    const collection = await this.getCollection();
    return await collection.findOne({ uid });
  }

  static async create(userData) {
    const collection = await this.getCollection();
    
    if (!userData.uid || !userData.email) {
      throw new Error("Missing required fields");
    }

    const newUser = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newUser);
    return { ...newUser, _id: result.insertedId };
  }
}

export default User;