export interface TypeMetadata {
  getType: () => Function;
  nullable: boolean | "items" | "itemsAndList";
  isArray: boolean;
}
