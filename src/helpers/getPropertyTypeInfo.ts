import { TypeMetadata } from "./TypeMetadata";

export default function getPropertyTypeInfo(
  classType: Function,
  propertyKey: string | symbol,
): TypeMetadata | undefined {
  return (Reflect as any).getMetadata("typegraphql:typeinfo", classType.prototype, propertyKey);
}
