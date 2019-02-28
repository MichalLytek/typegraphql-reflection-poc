import { Field, ObjectType } from "../helpers/decorators";

@ObjectType
export class Sample {
  @Field
  dateField!: Date;

  @Field
  stringField!: string;

  @Field
  optionalStringField?: string;

  @Field
  undefinableStringField!: string | undefined;

  @Field
  nullableStringField!: string | null;

  @Field
  stringArrayField!: string[];

  @Field
  optionalStringArrayField?: string[];

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

  @Field
  nullableStringNullableArrayPromiseField!: Promise<Array<string | null> | null>;
}
