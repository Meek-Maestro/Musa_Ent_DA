import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { purchaseStore } from "../../../../../store/admin/purchase";
import { ActionIcon, Box, Group, Image, Title, Text, Stack, Button, Divider, Table } from "@mantine/core";
import AppPageWrapper from "../../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../../ui/common/user-button/User-button";
import { MdArrowBack, MdPrint } from "react-icons/md";
import { logoImg } from "../../../../../assets";
import { defaultColors } from "../../../../../ui/constants/constants";
import { FaPen } from "react-icons/fa6";

export default function ViewPurchase() {
    const [purchase, setPurchase] = useState<any>(null);
    const params = useParams();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const idFromParams = params.id;
        const idFromSearchParams = searchParams.get("id");
        const id = idFromParams || idFromSearchParams || location?.state || "";

        const foundPurchase = purchaseStore.purchases.find((p: any) => p.id.toString() === id.toString());
        setPurchase(foundPurchase);
    }, [params, searchParams, location?.state, purchaseStore.purchases]);

    if (!purchase) {
        return (
            <AppPageWrapper title="" right={<UserButton />}>
                <ActionIcon size={`xl`} mb={`md`} onClick={() => navigate("/expenses")}>
                    <MdArrowBack size={30} />
                </ActionIcon>
                <Group h={`50vh`} w={`100%`} display={`flex`} justify={`center`} align={`center`}>
                    <Title order={3} c={`dimmed`}>No Purchase Found</Title>
                </Group>
            </AppPageWrapper>
        );
    }

    const purchaseHeaders = {
        orderheaders: [
            "Order ID",
            "Order Date",
            "Arrival Date",
            "Status",
            "Supplier",
        ],
        supplierAddress: [
            "Supplier Address",
            "Supplier Contact",
            "Payment Terms",
        ],
        productHeader: [
            "Product Name",
            "Discount",
            "Quantity",
            "Unit Price",
        ]
    };

    const Header = () => (
        <Group justify="space-between">
            <Group>
                <Image src={logoImg}
                    style={{
                        width: "30%", objectFit: "contain",
                        mixBlendMode: "hard-light",
                        clipPath: "circle(50% at 50% 50%)"
                    }}
                />
                <Stack gap={0}>
                    <Text fw={`bold`} size="xl">Musa Yaro</Text>
                    <Text size="sm">General Merchandise</Text>
                </Stack>
            </Group>
            <Stack w={`30%`} gap={`md`}>
                <Text><span style={{ fontWeight: 600 }}>Address:</span> No 93 Sarki Street Jos Plateau State Nigeria</Text>
                <Text><span style={{ fontWeight: 600 }}>Phone Number:</span> 07030932204, 08188668855 </Text>
            </Stack>
        </Group>
    );

    const OrderDetails = () => (
        <Box mt={`xl`}>
            <Table>
                <thead style={{ padding: "10px", backgroundColor: defaultColors.darkBlue, height: "50px", color: "white" }}>
                    <tr>
                        {purchaseHeaders.orderheaders.map((header, index) => (
                            <th key={index} style={{ padding: "10px", textAlign: "left" }}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{purchase.id}</td>
                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{purchase.purchase_date}</td>
                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{purchase.arrival_date}</td>
                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{purchase.status}</td>
                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{purchase.supplier.supplier_name}</td>
                    </tr>
                </tbody>
            </Table>
        </Box>
    );

    const SupplierDetails = () => (
        <Box>

            <Table>
                <thead style={{ padding: "10px", backgroundColor: defaultColors.darkBlue, height: "50px", color: "white" }}>
                    <tr>
                        {purchaseHeaders.supplierAddress.map((header, index) => (
                            <th key={index} style={{ padding: "10px", textAlign: "left" }}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{purchase.supplier.address}</td>
                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{purchase.supplier?.phone_number}</td>
                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{purchase.payment_terms}</td>
                    </tr>
                </tbody>
            </Table>
        </Box>
    );

    const ProductDetails = () => (
        <Box>
            <Table>
                <thead style={{ padding: "10px", backgroundColor: defaultColors.darkBlue, height: "50px", color: "white", }}>
                    <tr>
                        {purchaseHeaders.productHeader.map((header, index) => (
                            <th key={index} style={{ padding: "10px", textAlign: "left" }}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {purchase.purchase_items.length > 0 ? (
                        purchase.purchase_items.map((data: any) => (
                            <tr key={data.id} style={{ padding: "10px", height: "50px" }}>
                                <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{data.product_name}</td>
                                <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{data.discount}</td>
                                <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{data.quantity}</td>
                                <td style={{ padding: "10px", textAlign: "left", fontWeight: 600 }}>{data.unit_price}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", padding: "10px" }}>
                                <Text c={`dimmed`}>No products Here!</Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Group justify="end" mx={`md`} mt="md">
                <span style={{ padding: 15, width: "105px", textAlign: "center", background: defaultColors.darkBlue, color: "white", fontWeight: 600 }}>Total</span>
                <Text size="xl" fw={`bold`}>
                    {purchase.purchase_items.length > 0 ? (
                        purchase.purchase_items.reduce((total: number, item: any) => total + item.unit_price * item.quantity, 0)
                    ) : (
                        0
                    )}
                </Text>
            </Group>
        </Box>
    );

    const ConcludingInfo = () => (
        <Box>
            <Group w={`80%`} justify="space-between" align="center">
                <Stack>
                    <span style={{ padding: 8, textAlign: "center", background: defaultColors.darkBlue, color: "white", fontWeight: 600 }}>Note for supplier</span>
                    <Text>
                        {purchase.note_for_supplier}
                    </Text>
                </Stack>
                {purchase.attachment && (
                    <Stack>
                        <span style={{ padding: 8, textAlign: "center", background: defaultColors.darkBlue, color: "white", fontWeight: 600 }}>Attachments</span>
                        <Image src={purchase.attachment} />
                    </Stack>
                )}
            </Group>
            <Group justify="end" gap={`lg`} mt="md">
                <Button leftSection={<MdPrint size={30} />} size="lg">
                    Print
                </Button>
                <ActionIcon variant="subtle" onClick={() => {
                    navigate(`/edit-purchase/${purchase.id}`)
                    console.log("Clicked")
                }}>
                    <FaPen size={20} />
                </ActionIcon>
            </Group>
        </Box>
    );

    return (
        <AppPageWrapper title="View Purchase" right={<UserButton />}>
            <ActionIcon size={`xl`} mb={`md`} onClick={() => navigate("/expenses")}>
                <MdArrowBack size={30} />
            </ActionIcon>
            <Stack w={`100%`} p={`lg`} bg={`white`} style={{ borderRadius: "10px" }}>
                <Header />
                <OrderDetails />
                <SupplierDetails />
                <ProductDetails />
                <ConcludingInfo />
            </Stack>
        </AppPageWrapper>
    );
}