
import React, { createElement } from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
        //{
            //resources.map( (resource, i) => (
                //<MenuItemLink
                    //key={i}
                    //to={`/${resource.name}`}
                    //primaryText={resource.name}
                    //leftIcon={createElement(resource.icon)}
                    //onClick={onMenuClick}
                ///>
            //))
        //}


const Menu = ({ resources, onMenuClick, logout }) => (
    <div>
        {
            resources.map( (resource, i) => (
                <MenuItemLink
                    key={i}
                    to={`/${resource.name}`}
                    primaryText={resource.name}
                    onClick={onMenuClick}
                />
            ))
        }
        <MenuItemLink
            to="/dashboard"
            primaryText="Admin Dashboard"
            onClick={onMenuClick}
        />
    </div>
);

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(Menu));
