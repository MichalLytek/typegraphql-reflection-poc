import { TypeMetadata } from "../transformer/metadata/TypeMetadata";

export default function getTypeDeclarationString(type: TypeMetadata): string {
  let typeString = type.getType().name;
  if (type.isArray) {
    if (type.nullable !== "items" && type.nullable !== "itemsAndList") {
      typeString += "!";
    }
    typeString = `[${typeString}]`;
  }
  if (!type.nullable || type.nullable === "items") {
    typeString += "!";
  }
  return typeString;
}
