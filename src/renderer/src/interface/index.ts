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
    id?: number;
    "customer_name": string,
    "phone_number": string,
    "bank_name": string,
    "bank_account_number": string,
    "credit_limit": number
    "address": string,
    "status": string
}

export interface CustomersAccounting {
    id: number
    "payment_date": string,
    "payment_method": string,
    "memo": string,
    "customer"?: { id: number, customer_name: string },
    "amount_paid": number,
    "received_by": string
}

export interface SupplierAccounting {
    id: number
    "payment_date": string,
    "payment_method": string,
    "memo": string,
    "supplier": { id: number, supplier_name: string },
    "amount_paid": number
    "received_by": string
}

export interface Products {
    "id": number,
    "product_name": string,
    "cost_price": number,
    "selling_price": number,
    "discount": number,
    "sku": string,
    "quantity": number,
    "quantity_alert": number,
    "description": string,
    "store": { id: number },
    "category": number,
    "updated_at": string,
    "created_at": string
}

export interface CartDetails {
    id: number
    product_name: string;
    sku: string
    description: string
    cost: number
    quantity: number;
    sub_total: number
    discount: number;
}

export interface ReportPayload {
    period: string
    start_date: string
    end_date: string
}

export interface POS_Report {
    "pos":
    {
        "id": number,
        "payment_method": string,
        "note": string,
        "products": CartDetails[],
        "created_at": string,
        "updated_at": string,
        "printed": boolean,
        "store": { id: number, name: string, store_keeper: object },
        "customer": string
    }[]
    ,
    "total_sales": number,
    "customers": number,
    "profit_margin": number,
    "products_sold": number
}