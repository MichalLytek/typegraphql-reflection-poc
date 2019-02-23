export interface TypeInfo {
  typeText: string;
  nullable: boolean | "items" | "itemsAndArray";
  isArray: boolean;
}
