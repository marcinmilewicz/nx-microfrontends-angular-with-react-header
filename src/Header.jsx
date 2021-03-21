import React from 'react';
import PropTypes from 'prop-types';
import './header.css';
import AngularLogo from './logos/AngularLogo';
import ReactLogo from './logos/ReactLogo';

const Header = ({ routes, onRouteClick }) => {
  const createLinkFromRoutes = ({ children, ...item }) => {
    const result = [{ className: 'link-parent', key: item.name, ...item }];
    const childrenLinks = children.map((child) => ({
      className: 'link-children',
      ...child,
    }));

    return result.concat(childrenLinks);
  };

  const selectRouteLink = (routeLink) => onRouteClick(routeLink);

  const renderLink = (className, link, key) => (
    <li
      key={`${link.name}_${link.path}`}
      className={className}
      role="menuitem"
      onClick={() => selectRouteLink(link)}
      onKeyDown={() => selectRouteLink(link)}
    >
      {className === 'link-parent' ? (
        <>
          <AngularLogo />
          Application: <span className="link">{link.name}</span>
          Modules:
        </>
      ) : (
        <>
          | <span className="link">{link.name}</span> |
        </>
      )}
    </li>
  );

  return (
    <div className="toolbar" role="banner">
      <ReactLogo /> React application: Header
      <ul id="shell-nav-links">
        {routes.map((route, index) =>
          createLinkFromRoutes(route).map(({ className, ...link }) => renderLink(className, link, index))
        )}
      </ul>
    </div>
  );
};

const RouteShapeType = PropTypes.shape({
  name: PropTypes.string,
  path: PropTypes.string,
});

RouteShapeType.children = PropTypes.arrayOf(RouteShapeType);

Header.propTypes = {
  routes: PropTypes.arrayOf(RouteShapeType),
  onRouteClick: PropTypes.func,
};

Header.defaultProps = {
  routes: [],
  onRouteClick: () => undefined,
};

export default Header;
