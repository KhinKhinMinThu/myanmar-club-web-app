import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuBar, MenuBarLink, MenuBarLinkContainer } from './styled/menu-bar';
import { LogoText, LogoImage, LogoContainer } from './styled/logo';
import Home from './containers/home';
import Events from './containers/events';
import Footer from './containers/footer';
import TopBar from './containers/top-bar';

const PublicSite = () => (
  <Router>
    <Layout
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'block',
        position: 'relative',
        paddingBottom: '30em',
        backgroundColor: '#fff',
      }}
    >
      <TopBar />
      <MenuBar>
        <LogoContainer>
          <LogoImage />
          <LogoText> Myanmar Club SG</LogoText>
        </LogoContainer>
        <MenuBarLinkContainer>
          <MenuBarLink exact activeClassName="active" to="/">
            Home
          </MenuBarLink>
          <MenuBarLink exact activeClassName="active" to="/events">
            Upcoming Events
          </MenuBarLink>
        </MenuBarLinkContainer>
      </MenuBar>

      <Route exact path="/" component={Home} />
      <Route exact path="/events" component={Events} />
      <Footer />
    </Layout>
  </Router>
);

export default PublicSite;
