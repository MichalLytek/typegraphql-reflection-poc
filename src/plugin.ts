import { ts, createWrappedNode } from "ts-morph";
import { NodeArray } from "typescript";

export default (program: ts.Program, pluginOptions: {}) => {
  const typeChecker = program.getTypeChecker();
  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      function visitor(node: ts.Node): ts.Node {
        if (ts.isClassDeclaration(node)) {
          const classNode = createWrappedNode(node, {
            sourceFile,
            typeChecker,
          });
          console.log(classNode.getName());

          const newMembers: any = node.members.map(member => {
            console.log("  " + member.name!.getText());
            const { pos, end } = member.decorators!;
            const decorators: NodeArray<ts.Decorator> = Object.assign(
              [
                ...member.decorators!,
                ts.createDecorator(
                  ts.createCall(ts.createIdentifier("Reflect.metadata"), undefined, [
                    ts.createLiteral("typegraphql:typeinfo"),
                    ts.createObjectLiteral([
                      ts.createPropertyAssignment("isArray", ts.createLiteral(true)),
                    ]),
                  ]),
                ),
              ],
              { pos, end },
            );
            return {
              ...member,
              decorators,
            };
          });

          const id = ts.createIdentifier("Dupa");
          return ts.updateClassDeclaration(
            node,
            node.decorators,
            node.modifiers,
            id,
            node.typeParameters,
            node.heritageClauses,
            // node.members,
            newMembers,
          );
        }
        return ts.visitEachChild(node, visitor, ctx);
      }
      return ts.visitEachChild(sourceFile, visitor, ctx);
    };
  };
};
