import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
}
export interface backendInterface {
    getAllProducts(): Promise<Array<Product>>;
    getProductById(id: bigint): Promise<Product | null>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
}
