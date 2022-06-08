export class ItemDTO {
  id: string;
  name: string;
  price: number;
}

export class InventoryDTO {
  id: string;
  name: string;
  userId: string;
  items: ItemDTO[];
}