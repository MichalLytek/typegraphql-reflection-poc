import { ts } from "ts-morph";

import createTypeInfoDecorator, { TypeInfo } from "./createTypeInfoDecorator";

export default function addTypeInfoDecorator(
  node: ts.ClassElement,
  typeInfo: TypeInfo,
): ts.ClassElement {
  const classMember = ts.getMutableClone(node);
  const { pos, end } = classMember.decorators!;
  classMember.decorators = Object.assign(
    [...classMember.decorators!, createTypeInfoDecorator(typeInfo)],
    { pos, end },
  );
  return classMember;
}
