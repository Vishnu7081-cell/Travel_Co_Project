const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || process.argv[2];

if (!uri) {
  console.error('Usage: set MONGODB_URI or pass connection string as first arg.');
  console.error('Example: node check_mongo.js "mongodb+srv://user:pass@cluster-url/test"');
  process.exit(1);
}

(async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const admin = client.db().admin();
    const result = await admin.listDatabases();
    console.log('Databases on server:');
    result.databases.forEach(db => console.log('-', db.name));
    console.log('\nFull response:\n', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Connection/listDatabases error:');
    console.error(err && err.message ? err.message : err);
    process.exitCode = 2;
  } finally {
    try { await client.close(); } catch (e) {}
  }
})();
