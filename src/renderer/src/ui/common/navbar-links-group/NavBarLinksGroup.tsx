import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Group, rem, Text, Collapse, Stack, UnstyledButton } from "@mantine/core";
import { MdChevronRight } from "react-icons/md";
import { LinksGroupProps } from "../../../interface";
import "./Navbar.css"
import { routerUtilsManager } from "../../../store/router_utils";

export function NavbarLinksGroup({ title, items }: LinksGroupProps) {
    return (

        <Box className={"navbar-links-group"}>
            <Text fw="bolder" size="md" my={10} className={"sectionTitle"}>{title}</Text>
            <Stack>
                {items.map((item) => (
                    <NavbarLinkItem key={item.label} {...item} />
                ))}
            </Stack>
        </Box>
    );
}

function NavbarLinkItem({ label, link, icon: Icon, links = [] }: {
    label: string;
    link?: string;
    icon?: React.FC<any>;
    links?: { label: string; link: string }[];
}) {
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);
    const hasSublinks = links.length > 0;

    useEffect(() => {
        routerUtilsManager.setActiveNavigationPath(link)
    }, [routerUtilsManager.activeNavigationPath])

    return (
        <>
            <UnstyledButton
                onClick={(event) => {
                    if (!hasSublinks && link) {
                        navigate(link);
                    } else {
                        setOpened((o) => !o);
                    }
                    routerUtilsManager.setActiveNavigationPath(link);
                    event.preventDefault()
                }}

                className={routerUtilsManager.activeNavigationPath === link ? "active" : "control"}
            >
                <Group gap={`xl`} w={`100%`}>
                    <Box style={{ display: 'flex', alignItems: 'center', width: "100%", gap: "10px" }}>
                        {Icon && <Icon style={{ width: rem(30), height: rem(30) }} />}
                        <Text size="sm">{label}</Text>
                    </Box>
                    {hasSublinks && (
                        <MdChevronRight
                            className={"chevron"}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? 'rotate(-90deg)' : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>

            {hasSublinks && (
                <Collapse in={opened}>
                    {links.map((sublink) => (
                        <Link to={`${sublink}`}>
                            <Text<'a'>
                                key={sublink.link}
                                component="a"
                                className={"link"}
                                href={sublink.link}
                                onClick={(event) => {
                                    event.preventDefault();
                                    navigate(sublink.link);
                                    routerUtilsManager.setActiveNavigationPath(sublink.link);
                                }}

                            >
                                {sublink.label}
                            </Text>
                        </Link>
                    ))}
                </Collapse>
            )}

        </>
    );
}

export const LinksGroup = NavbarLinksGroup;
