import { ts, Type } from "ts-morph";

import { TypeInfo } from "../decorator/TypeInfo";
import isTypePromise from "./isTypePromise";

export default function getTypeInfo(
  type: Type<ts.Type>,
  typeInfo: TypeInfo = {
    isArray: false,
    nullable: false,
    typeText: "",
  },
): TypeInfo {
  if (type.isUndefined() || type.isNull()) {
    typeInfo.nullable = true;
  }
  if (isTypePromise(type)) {
    typeInfo = getTypeInfo(type.getTypeArguments()[0], typeInfo);
  } else if (type.isArray()) {
    typeInfo.isArray = true;
    typeInfo = getTypeInfo(type.getTypeArguments()[0], typeInfo);
  } else if (type.isUnion()) {
    const unionSubTypes = type.getUnionTypes();
    if (unionSubTypes.some(it => it.isUndefined() || it.isNull())) {
      if (typeInfo.isArray) {
        if (typeInfo.nullable) {
          typeInfo.nullable = "itemsAndArray";
        } else {
          typeInfo.nullable = "items";
        }
      } else {
        typeInfo.nullable = true;
      }
      const baseType = unionSubTypes.find(it => !it.isUndefined() && !it.isNull())!;
      typeInfo = getTypeInfo(baseType, typeInfo);
    }
  } else if (type.isString()) {
    typeInfo.typeText = String.name;
  } else if (type.isNumber()) {
    typeInfo.typeText = Number.name;
  } else if (type.isBoolean()) {
    typeInfo.typeText = Boolean.name;
  } else if (type.isObject()) {
    typeInfo.typeText = type.getText();
  }

  return typeInfo;
}
