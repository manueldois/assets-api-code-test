import { client } from "./getDbClient";

async function createSchema() {
  try {
    await client.connect()

    // Define your schema creation queries here
    const schemaQueries = [
      `CREATE TABLE IF NOT EXISTS assets (
        id SERIAL PRIMARY KEY, 
        name VARCHAR(100),
        data BYTEA, 
        size INTEGER,
        encoding VARCHAR(100),
        mimetype VARCHAR(100),
        createdAt TIMESTAMPTZ
      )`
    ];

    for (const query of schemaQueries) {
      await client.query(query)
      console.log('Executed query:', query)
    }

    console.log('Schema creation completed successfully!')
  } catch (error) {
    console.error('Error creating schema:', error)
  } finally {
    await client.end()
  }
}

createSchema()
