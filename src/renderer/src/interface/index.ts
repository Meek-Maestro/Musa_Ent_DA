export interface LinksGroupProps {
    title: string;
    items: {
        label: string;
        link?: string;
        icon?: React.FC<any>;
        links?: { label: string; link: string }[];
    }[];
}
export interface Customers {
    id: any;
    "customer_name": string,
    "phone_number": string,
    "bank_name": string,
    "bank_account_number": string,
    "address": string,
    "status": string
}

export interface CustomersAccounting {
    id:number
    "payment_date": string,
    "payment_method": string,
    "memo": string,
    "customer"?: {id:number, customer_name:string},
    "amount_paid": number,
    "received_by": string
}

export interface SupplierAccounting {
    "payment_date": string,
    "payment_method": string,
    "memo": string,
    "supplier": number,
    "amount_paid": number
    "received_by": string
}
