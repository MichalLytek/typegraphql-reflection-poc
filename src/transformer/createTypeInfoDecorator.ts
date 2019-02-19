import { ts } from "ts-morph";

export interface TypeInfo {
  // TODO: fill with properties
  typeText: string;
  nullable: boolean;
  isArray: boolean;
}

export default function createTypeInfoDecorator({ typeText, nullable, isArray }: TypeInfo) {
  return ts.createDecorator(
    ts.createCall(ts.createIdentifier("Reflect.metadata"), undefined, [
      ts.createLiteral("typegraphql:typeinfo"),
      ts.createObjectLiteral([
        ts.createPropertyAssignment("nullable", ts.createLiteral(nullable)),
        ts.createPropertyAssignment("isArray", ts.createLiteral(isArray)),
        ts.createPropertyAssignment(
          "type",
          ts.createArrowFunction(
            undefined,
            undefined,
            [],
            undefined,
            undefined,
            ts.createIdentifier(typeText),
          ),
        ),
      ]),
    ]),
  );
}
