import { TypeMetadata } from "./TypeMetadata";

export default function readPropertyTypeMetadata(
  target: Function,
  propertyKey: string | symbol,
): TypeMetadata | undefined {
  return (Reflect as any).getMetadata("typegraphql:typeinfo", target.prototype, propertyKey);
}
