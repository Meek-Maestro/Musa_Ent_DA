import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Group, rem, Text, Collapse, Stack, SimpleGrid, UnstyledButton } from "@mantine/core";
import { MdChevronRight } from "react-icons/md";
import { LinksGroupProps } from "../../../interface";
import "./Navbar.css"
import { routerUtilsManager } from "../../../store/router_utils";

export function NavbarLinksGroup({ title, items }: LinksGroupProps) {
    return (
       
        <Box className={"navbar-links-group"}>
            <Text fw="bolder" size="lg" my={10} className={"sectionTitle"}>{title}</Text>
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

    return (
        <>
        
            <UnstyledButton
                onClick={() => {
                    if (!hasSublinks && link) {
                        navigate(link);
                        console.log(link)
                        routerUtilsManager.setActiveNavigationPath(link);
                    } else {
                        setOpened((o) => !o);
                    }
                }}

                className={routerUtilsManager.activeNavigationPath === link ? "active" : "control"}
            >
                <Group gap={`xl`} w={`100%`}>
                    <Box style={{ display: 'flex', alignItems: 'center', width:"100%", gap:"10px" }}>
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
                    ))}
                </Collapse>
            )}

        </>
    );
}

export const LinksGroup = NavbarLinksGroup;
