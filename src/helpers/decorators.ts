import MetadataStorage from "./MetadataStorage";

export const ObjectType: ClassDecorator = target => {
  MetadataStorage.objectTypes.push(target);
};
export const Field: PropertyDecorator = (prototype, propertyKey) => {
  const target = prototype.constructor;
  MetadataStorage.fields.push({ target, propertyKey });
};
