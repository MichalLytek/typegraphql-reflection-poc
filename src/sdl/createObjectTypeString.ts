import { TypeMetadata } from "../transformer/metadata/TypeMetadata";
import getTypeDeclarationString from "./getTypeDeclarationString";

export interface FieldInfo {
  typeMetadata: TypeMetadata;
  propertyKey: string;
}

function createFieldTypeString({ propertyKey, typeMetadata }: FieldInfo) {
  return `  ${propertyKey}: ${getTypeDeclarationString(typeMetadata)}`;
}

export default function createObjectTypeString(typeName: string, fields: Array<FieldInfo>) {
  return `type ${typeName} {\r\n` + fields.map(createFieldTypeString).join(`\r\n`) + `\r\n}\r\n`;
}
