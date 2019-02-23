export interface TypeMetadata {
  getType: () => Function;
  nullable: boolean | "items" | "itemsAndArray";
  isArray: boolean;
}
