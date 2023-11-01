import { Product } from './product';

export enum Status {
  Pending = 'pending',
  Completed = 'completed',
  Canceled = 'canceled',
}

export interface Order {
  id?: string;
  status?: Status;
  products: Product[];
}
