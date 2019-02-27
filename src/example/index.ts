import { Sample } from "./source";
import MetadataStorage from "../helpers/MetadataStorage";
import getPropertyTypeInfo from "../helpers/getPropertyTypeInfo";
import createObjectTypeString from "../sdl/createObjectTypeString";

// dummy call to trigger import and decorators evaluation
() => Sample;

MetadataStorage.objectTypes.forEach(objectType => {
  const objectTypeFields = MetadataStorage.fields.filter(it => it.target === objectType);
  const objectTypeFieldsTypes = objectTypeFields.map(field => ({
    type: getPropertyTypeInfo(objectType, field.propertyKey)!,
    propertyKey: field.propertyKey as string,
  }));
  console.log(createObjectTypeString(objectType.name, objectTypeFieldsTypes) + "\r\n");
});
