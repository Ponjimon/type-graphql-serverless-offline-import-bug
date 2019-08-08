# type-graphql-serverless-offline-import-bug

## Steps to reproduce
1. Install dependencies `yarn install`
2. Start serverless-offline `sls offline`
3. Use any GraphQL client and run `{ hello }` as a query on `localhost:4000/graphql` and then on `localhost:4000/graphqlbug`

You will notice: `/graphql` will always return the same hash. Because on this endpoint, we cache the schema in `global.schema`:

```javascript
global.schema = global.schema || getSchema();
```

Where as in `/graphqlbug` we always build the schema new to make sure serverless-offline hot reloading works, but it always return a new hash. Why?

How is `type-graphql` affecting existing classes and / or their reference?
