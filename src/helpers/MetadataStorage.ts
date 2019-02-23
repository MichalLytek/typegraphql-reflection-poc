export default class MetadataStorage {
  static objectTypes: Function[] = [];
  static fields: Array<{ target: Function; propertyKey: string | symbol }> = [];
}
