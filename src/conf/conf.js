const conf = {
    appWriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
    appWriteProjectID: String(process.env.REACT_APP_PROJECT_ID),
    appWriteCollectionID: String(process.env.REACT_APP_COLLECTION_ID),
    appWriteDatabaseID: String(process.env.REACT_APP_DATABASE_ID),
    appWriteBucketID: String(process.env.REACT_APP_BUCKET_ID),
};

export default conf;