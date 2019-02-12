import Project, { ts, Type } from "ts-morph";
import path from "path";

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, "../tsconfig.json"),
});

project.getSourceFiles().forEach(file => {
  console.log("file name:", file.getBaseName());
  file.getClasses().forEach(cls => {
    console.log("  class name:", cls.getName());
    cls.getProperties().forEach(property => {
      console.log("    property name:", property.getName());
      property.getDecorators().forEach(decorator => {
        console.log("      property decorator:", decorator.getFullName());
      });
      printTypeInfo(property.getType(), 6);
    });
  });
});

function printTypeInfo(type: Type<ts.Type>, indentLevel = 0) {
  const print = createPrinter(indentLevel);

  print("type", type.getText());
  print("isNull", type.isNull(), 2);
  print("isUndefined", type.isUndefined(), 2);
  print("isNullable", type.isNullable(), 2);
  print("isString", type.isString(), 2);
  print("isArray", type.isArray(), 2);
  // if (type.isArray()) {
  //   printTypeInfo(type.getArrayType()!, indentLevel + 4);
  // }
  print("isUnion", type.isUnion(), 2);
  if (type.isUnion()) {
    type.getUnionTypes().forEach(unionType => {
      printTypeInfo(unionType, indentLevel + 4);
    });
  }
  // print("isClassOrInterface", type.isClassOrInterface(), 2);
  print("isObject", type.isObject(), 2);
  print("isPromise", isTypePromise(type), 2);
  print("isGeneric", type.getTypeArguments().length !== 0, 2);
  if (type.getTypeArguments().length) {
    print("Base", type.getSymbol()!.getName(), 4);
    type.getTypeArguments().forEach(argumentType => {
      printTypeInfo(argumentType, indentLevel + 4);
    });
  }
}

function isTypePromise(type: Type<ts.Type>) {
  return (
    type.isObject() &&
    type.getTypeArguments().length === 1 &&
    type.getSymbol() &&
    type.getSymbol()!.getName() === "Promise"
  );
}
// function isTypePromise(type: Type<ts.Type>) {
//   if (!type.isObject()) {
//     return false;
//   }
//   if (type.getTypeArguments().length !== 1) {
//     return false;
//   }
//   if (!type.getSymbol()) {
//     return false;
//   }
//   if (type.getSymbol()!.getName() !== "Promise") {
//     return false;
//   }

//   return true;
// }

function createPrinter(baseIndentLevel = 0) {
  return (label: string, value: any, indentLevel = 0) => {
    const spaces = " ".repeat(baseIndentLevel + indentLevel);
    console.log(`${spaces}${label}:`, value);
  };
}
