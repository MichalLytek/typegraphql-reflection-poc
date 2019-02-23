import { ts, createWrappedNode, CreateWrappedNodeOptions } from "ts-morph";

import addTypeInfoDecoratorToClassMember from "./decorator/addTypeInfoDecoratorToClassMember";
import getTypeInfo from "./type-detection/getTypeInfo";

export default (program: ts.Program, pluginOptions: {}) => {
  const typeChecker = program.getTypeChecker();
  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      const wrappedNodeOptions: CreateWrappedNodeOptions = {
        sourceFile,
        typeChecker,
      };
      function visitor(node: ts.Node): ts.Node {
        if (ts.isClassDeclaration(node)) {
          const classNodeWrapper = createWrappedNode(node, wrappedNodeOptions);
          // console.log(classNodeWrapper.getName());
          const classNode = ts.getMutableClone(node);
          const { pos, end } = classNode.members;
          classNode.members = Object.assign(
            classNode.members.map(member => {
              if (ts.isPropertyDeclaration(member)) {
                const memberNode = createWrappedNode(member, wrappedNodeOptions);
                // console.log("  " + memberNode.getName());
                // console.log("    " + memberNode.getType().getText());
                if (member.decorators) {
                  const typeInfo = getTypeInfo(memberNode.getType());
                  // console.log("    ", typeInfo);
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
