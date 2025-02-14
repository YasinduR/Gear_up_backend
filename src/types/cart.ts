
export type cart = {
    items: { id: number; quantity: number; price: number }[];
    deliveryAddress?: string;
    phoneNumber?: string;
};
