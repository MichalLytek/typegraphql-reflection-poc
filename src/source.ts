import "reflect-metdata";

import { Field, ObjectType } from "./decorators";

@ObjectType
export class Sample {
  @Field
  stringField!: string;

  @Field
  optionalStringField?: string;

  @Field
  nullableStringField!: string | null;

  @Field
  stringArrayField!: string[];

  @Field
  nullableStringArrayField!: Array<string | null>;

  @Field
  nullableStringNullableArrayField!: Array<string | null> | null;

  @Field
  stringPromiseField!: Promise<string>;

  @Field
  nullableStringPromiseField!: Promise<string | null>;

  @Field
  stringArrayPromiseField!: Promise<string[]>;

  @Field
  nullableStringArrayPromiseField!: Promise<Array<string | null>>;
}
