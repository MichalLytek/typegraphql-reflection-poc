import { Type, ts } from "ts-morph";

export default function isTypePromise(type: Type<ts.Type>) {
  return (
    type.isObject() &&
    type.getTypeArguments().length === 1 &&
    type.getSymbol() &&
    type.getSymbol()!.getName() === "Promise"
  );
}
