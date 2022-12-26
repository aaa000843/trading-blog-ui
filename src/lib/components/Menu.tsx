import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuList,
  MenuButton,
  IconButton,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";

const MenuBar = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem>
          <Link href="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/guide">Guide</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/posts">Posts</Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuBar;
