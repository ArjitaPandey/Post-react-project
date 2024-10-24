import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import authService from "./auth";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite error : createPost :: ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite error : updatePost :: ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getDocument(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug
      );
    } catch (error) {
      console.log("Appwrite error : getDocument :: ", error);
      return false;
    }
  }

  async getPosts(slug) {
    const currentUser = await authService.getCurrentUser();
    const queries = [Query.equal("status", "active")];
    if (currentUser) {
      queries.push(Query.equal("userId", currentUser.$id));
    } else {
      console.log("No user logged in. Fetching public posts.");
      // If no user is logged in, fetch posts without filtering by userId
    }
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        queries
      );
    } catch (error) {
      console.log("Appwrite error : getPosts :: ", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite error : uploadFile :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appWriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite error : deleteFile :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appWriteBucketID, fileId);
  }
}

const service = new Service();
export default service;
