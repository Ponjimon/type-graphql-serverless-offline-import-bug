import 'reflect-metadata';
import { generateRandomHash } from './generate-random-hash';
import { ApolloServer } from 'apollo-server-lambda';
import { Resolver, Query, buildSchemaSync } from 'type-graphql';

declare const global: any;

class Test {
    static hash = generateRandomHash(5);
}

@Resolver()
class HelloWorldResolver {
    @Query(() => String)
    hello() {
        return Test.hash; // this should stay the same but it changes on every Request if I run buildSchemaSync on every request
    }
}

const getSchema = () => buildSchemaSync({
    resolvers: [HelloWorldResolver]
})

global.schema = global.schema || getSchema();

const server = new ApolloServer({
    schema: global.schema,
});

const serverBugged = new ApolloServer({
    schema: getSchema(),
})

export const handler = server.createHandler();
export const handlerBugged = serverBugged.createHandler();