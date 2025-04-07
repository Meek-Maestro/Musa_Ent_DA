 <Table striped highlightOnHover className={classes.table}>
                            <Table.Thead className={classes.stickyHeader}>
                                <Table.Tr>
                                    <Table.Th>ID</Table.Th>
                                    <Table.Th>Store Name</Table.Th>
                                    <Table.Th>Location</Table.Th>
                                    <Table.Th>Store Keeper</Table.Th>
                                    <Table.Th>Total Products</Table.Th>
                                    <Table.Th>Stock Level</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody className={classes.scrollableBody}>
                                {store.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {/* Main Row */}
                                        <Table.Tr
                                            className={classes.rowSpacing} bg={theme.colors.gray[3]}
                                        >
                                            <Table.Td>
                                                {item.id}
                                            </Table.Td>
                                            <Table.Td>{item.name}</Table.Td>
                                            <Table.Td>{item.location}</Table.Td>
                                            <Table.Td>{item.store_keeper ? item.store_keeper : "NIL"}</Table.Td>
                                            <Table.Td>{item.stock_report.total_products}</Table.Td>
                                            <Table.Td>
                                                {loadDynamiChips(item.stock_report.stock_level)}
                                            </Table.Td>
                                        </Table.Tr>

                                        <Table.Tr>
                                            <Table.Td colSpan={9}>
                                                <Text ta={`center`} fw={`bold`} c={`dimmed`} mt={`sm`}>Products</Text>
                                                <Divider />
                                                <Space h={10} />
                                                <Table
                                                    style={{
                                                        borderLeft: `5px solid ${theme.colors.blue[3]}`,
                                                    }}
                                                    striped
                                                    highlightOnHover
                                                    withColumnBorders
                                                >
                                                    <Table.Thead>
                                                        <Table.Tr>
                                                            <Table.Th>
                                                                Product Name
                                                            </Table.Th>
                                                            <Table.Th>
                                                                Sku
                                                            </Table.Th>
                                                            <Table.Th>
                                                                Quantity
                                                            </Table.Th>
                                                            <Table.Th>Low stock alert</Table.Th>
                                                            <Table.Th>Selling Price</Table.Th>
                                                            <Table.Th>Cost Price</Table.Th>
                                                            <Table.Th>Discount</Table.Th>
                                                        </Table.Tr>
                                                    </Table.Thead>
                                                    <Table.Tbody>
                                                        {item.products.map(
                                                            (
                                                                product,
                                                                productIndex
                                                            ) => (
                                                                <Table.Tr
                                                                    key={
                                                                        productIndex
                                                                    }
                                                                >
                                                                    <Table.Td>
                                                                        {
                                                                            product.product_name
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            product.sku
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {product.quantity}
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            product.quantity_alert
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            product.selling_price
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            product.cost_price
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            product.discount
                                                                        }
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                            )
                                                        )}
                                                    </Table.Tbody>
                                                </Table>
                                            </Table.Td>
                                        </Table.Tr>
                                    </React.Fragment>
                                ))}
                            </Table.Tbody>
                            <Table.Tr>

                            </Table.Tr>
                        </Table>