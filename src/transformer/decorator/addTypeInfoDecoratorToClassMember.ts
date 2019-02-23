import { ts } from "ts-morph";

import createTypeInfoDecorator from "./createTypeInfoDecorator";
import { TypeInfo } from "./TypeInfo";

export default function addTypeInfoDecoratorToClassMember(
  typeInfo: TypeInfo,
  node: ts.ClassElement,
): ts.ClassElement {
  const classMember = ts.getMutableClone(node);
  const { pos, end } = classMember.decorators!;
  classMember.decorators = Object.assign(
    [...classMember.decorators!, createTypeInfoDecorator(typeInfo)],
    { pos, end },
  );
  return classMember;
}
