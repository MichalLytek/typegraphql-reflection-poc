# TypeGraphQL reflection (PoC)

Proof of concept of an enhanced reflection system for TypeScript.

## How it works?

I uses a custom transform plugin and TS compiler API with a bit of help from [`ts-morph`](https://github.com/dsherret/ts-morph) to read deeply nested generic types info for GraphQL schema making purposes.

## What does it do?

It can read type definitions of this class declaration:

```ts
@ObjectType
export class Sample {
  @Field
  dateField!: Date;

  @Field
  optionalStringField?: string;

  @Field
  optionalStringArrayField?: string[];

  @Field
  nullableStringArrayField!: Array<string | null>;

  @Field
  nullableStringPromiseField!: Promise<string | null>;

  @Field
  nullableStringNullableArrayPromiseField!: Promise<Array<string | null> | null>;
}
```

And emit that metadata, which then allows to read and transform them into this GraphQL type definition (SDL):

```graphql
type Sample {
  dateField: Date!
  optionalStringField: String
  optionalStringArrayField: [String!]
  nullableStringArrayField: [String]!
  nullableStringPromiseField: String
  nullableStringNullableArrayPromiseField: [String]
}
```

## How to run it?

You can run the example by `npm start` - it will run a `ts-node` with a special `ttypescript` compiler flag (`ts-node -C ttypescript src/example/index.ts`) that allows to apply the plugins defined in `tsconfig.json` during the TS files transpilation.

The transform plugin files are located in `src/transformer` directory. The example code (class source file and reading the metadata) are in `src/example` folder and the related supporting code is in `src/helpers` dir. In `src/sdl` you can find some simple helpers for creating GraphQL type SDL string for this demo purposes.
