import { NavbarLinksGroup } from "../../common/navbar-links-group/NavBarLinksGroup";
import style from "./NavbarNested.module.css";
import { LinksGroupProps } from "../../../interface";
import { ScrollArea } from "@mantine/core";

export function NavbarNested({ links, header }: { links: LinksGroupProps[], header: React.ReactNode }) {
    return (
        <nav className={style.navbar} style={{ height: "100%" }}>
            <div className={style.header}>{header}</div>
            <ScrollArea>
              <div className={style.linksInner}>
                {links.map((item) => <NavbarLinksGroup {...item} key={item.title} />)}
            </div>
            </ScrollArea>
            
        </nav>
    );
}
