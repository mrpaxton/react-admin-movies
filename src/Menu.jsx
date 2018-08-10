import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MenuItemLink, getResources } from "react-admin";
import { withRouter } from "react-router-dom";

const Menu = ({ resources, onMenuClick }) => (
  <div>
    {resources.map(resource => (
      <MenuItemLink
        key={`menu-item-link-${resource.name}`}
        to={`/${resource.name}`}
        primaryText={
          resource.name.charAt(0).toUpperCase() + resource.name.substr(1)
        }
        onClick={onMenuClick}
      />
    ))}
    <MenuItemLink
      to="/movie-timeline"
      primaryText="Timeline"
      onClick={onMenuClick}
    />
    <MenuItemLink
      to="/greatest-by-vote-average"
      primaryText="Greatest by Votes"
      onClick={onMenuClick}
    />
    <MenuItemLink
      to="/pie-chart"
      primaryText="Top Vote Distribution"
      onClick={onMenuClick}
    />
  </div>
);

Menu.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMenuClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  resources: getResources(state)
});

export default withRouter(connect(mapStateToProps)(Menu));
