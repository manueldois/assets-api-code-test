Entities:
1. Asset (Image or Document):
    - assetId, (PK)
    - title, 
    - description, 
    - timestamps

    Best stored in a blob storage such as AWS S3 
    Relationships could be stored in Postgres

2. Category:
    - categoryID, (PK)
    - description,
    - title
    - timestamps

    Could be stored in Postgres

3. Collection:
    - collectionId, (PK)
    - description,
    - timestamps

    Could be stored in Postgres


## Read optimized model:
Assumes that data is relatively static, and read operations are more frequent than write operations.
Assumes the asset service will have the most traffic.

1. Asset Service:
    - Stores assets
    - Stores relationships between assets and categories (many-to-many).
    - Stores relationships between assets and collections (many-to-many).
    - Both relationships are indexed for quick lookup of asset per categoryID or collectionID

2. Category Service:
    - Stores categories

3. Collection Service:
    - Stores collections
    - Stores relationships between collections and categories (many-to-many).

## Write optimized model:
Assumes that write operations are more frequent due to updates and additions.
Assumes the asset service will have the most traffic.

1. Asset Service:
    - Stores just the assets

2. Category Service:
    - Stores categories 
    - Stores the relationship between an asset and it's categories

3. Collection Service:
    - Stores collections
    - Stores the relationship between an asset and it's collection
    - Stores the relationship between a collection and it's categories

## Rejected Solutions:
1. **Monolithic Schema**: A monolithic schema could lead to a large, complex database that becomes challenging to manage as the system scales. It also poses difficulties in maintaining and deploying updates without impacting other parts of the system.

2. **Shared Database**: A shared database approach might lead to tight coupling between services, making it harder to evolve and scale individual services independently. It could also result in contention and performance issues, especially when dealing with large-scale data operations.

3. **NoSQL Database for Everything**: While NoSQL databases are suitable for certain use cases, they might not be the best fit for all data storage requirements. In this scenario, relationships between assets, categories, and collections suggest a structured data model, making a relational database more appropriate for the given scenario.
