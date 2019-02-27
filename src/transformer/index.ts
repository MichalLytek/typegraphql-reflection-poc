import { ts, createWrappedNode } from "ts-morph";

import addTypeInfoDecoratorToClassMember from "./decorator/addTypeInfoDecoratorToClassMember";
import getTypeInfo from "./type-detection/getTypeInfo";

export default (program: ts.Program) => {
  const typeChecker = program.getTypeChecker();
  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      function visitor(node: ts.Node): ts.Node {
        if (ts.isClassDeclaration(node)) {
          const classNode = ts.getMutableClone(node);
          const { pos, end } = classNode.members;
          classNode.members = Object.assign(
            classNode.members.map(member => {
              if (ts.isPropertyDeclaration(member)) {
                if (member.decorators) {
                  const memberNode = createWrappedNode(member, {
                    sourceFile,
                    typeChecker,
                  });
                  const typeInfo = getTypeInfo(memberNode.getType());
                  return addTypeInfoDecoratorToClassMember(typeInfo, member);
                }
              }
              return member;
            }),
            { pos, end },
          );
          return ts.createClassDeclaration(
            classNode.decorators,
            classNode.modifiers,
            classNode.name,
            classNode.typeParameters,
            classNode.heritageClauses,
            classNode.members,
          );
        }
        return ts.visitEachChild(node, visitor, ctx);
      }
      return ts.visitEachChild(sourceFile, visitor, ctx);
    };
  };
};
