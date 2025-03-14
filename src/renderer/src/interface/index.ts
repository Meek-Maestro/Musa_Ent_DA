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
    "customer_name": string,
    "phone_number": string,
    "bank_name": string,
    "bank_account_number": string,
    "address": string,
    "status": string
}