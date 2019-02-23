import MetadataStorage from "../helpers/MetadataStorage";
import readPropertyTypeInfo from "../helpers/readPropertyTypeInfo";
import { Sample } from "./source";

// dummy call to trigger import and decorators evaluation
() => Sample;

MetadataStorage.objectTypes.forEach(objectType => {
  console.log(objectType.name);
  MetadataStorage.fields
    .filter(it => it.target === objectType)
    .forEach(field => {
      console.log(" ", field.propertyKey);
      const { isArray, nullable, getType } = readPropertyTypeInfo(objectType, field.propertyKey)!;
      console.log("   ", {
        isArray,
        nullable,
        type: getType().name,
      });
    });
});
