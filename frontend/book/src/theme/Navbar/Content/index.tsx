import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarItemComponent, // This import might be unused depending on Docusaurus internal structure.
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import { useAuth } from '@site/src/contexts/AuthContext';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';

function NavbarItems({items}) {
  return (
    <>
      {items.map((item, i) => (
        <NavbarItem {...item} key={i} />
      ))}
    </>
  );
}

function NavbarContentLayout({left, right}) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

export default function NavbarContent() {
  const {navbar: {items}, } = useThemeConfig();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const { isAuthenticated, logout, user } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/'); // Redirect to home page after logout
  };

  const authItems = isAuthenticated
    ? [
        <NavbarItem
          key="welcome"
          label={`Welcome, ${user?.username || user?.email || 'User'}`}
          position="right"
          is  button
        />,
        <NavbarItem
          key="logout"
          label="Logout"
          position="right"
          onClick={handleLogout}
          className="button button--secondary button--sm"
          is  button
        />,
      ]
    : [
        <NavbarItem
          key="signup"
          label="Sign Up"
          to="/signup"
          position="right"
          className="button button--primary button--sm"
          is  button
        />,
        <NavbarItem
          key="signin"
          label="Sign In"
          to="/signin"
          position="right"
          className="button button--secondary button--sm margin-left--sm"
          is  button
        />,
      ];

  return (
    <NavbarContentLayout
      left={<NavbarItems items={leftItems} />}
      right={
        <>
          <NavbarItems items={rightItems} />
          {authItems.map((item, i) => React.cloneElement(item, { key: `auth-item-${i}` }))}
        </>
      }
    />
  );
}
