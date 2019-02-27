import { TypeMetadata } from "../helpers/TypeMetadata";
import getTypeDeclarationString from "./getTypeDeclarationString";

interface FieldInfo {
  type: TypeMetadata;
  propertyKey: string;
}

function createFieldTypeString({ propertyKey, type }: FieldInfo) {
  return `  ${propertyKey}: ${getTypeDeclarationString(type)}`;
}

export default function createObjectTypeString(typeName: string, fields: Array<FieldInfo>) {
  return `type ${typeName} {\r\n` + fields.map(createFieldTypeString).join(`\r\n`) + `\r\n}\r\n`;
}
