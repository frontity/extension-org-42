import React, { Component } from 'react';
import { string, number, func, node } from 'prop-types';
import { inject } from 'mobx-react';
import Waypoint from 'react-waypoint';

class PaginationWaypoint extends Component {
  static counter = 1;

  static lastPageEntered = 0;

  static lastHtmlTree = {};

  static propTypes = {
    page: number.isRequired,
    title: string.isRequired,
    url: string.isRequired,
    sendPageView: func.isRequired,
    children: node.isRequired,
  };

  constructor() {
    super();

    this.getPageviewPayload = this.getPageviewPayload.bind(this);
    this.handleOnEnter = this.handleOnEnter.bind(this);
  }

  getPageviewPayload() {
    const { page, title, url } = this.props;
    const titlePageRegex = / - Página \d+$/;
    const titlePage = page > 1 ? ` - Página ${page}` : '';

    return {
      title: titlePageRegex.test(title)
        ? title.replace(titlePageRegex, titlePage)
        : `${title}${titlePage}`,
      location: `${url}${page > 1 ? `/${page}` : ''}`,
    };
  }

  handleOnEnter() {
    const { page, sendPageView } = this.props;

    if (!PaginationWaypoint.lastPageEntered) {
      PaginationWaypoint.lastPageEntered = page;
      return;
    }

    if (PaginationWaypoint.lastPageEntered === page) return;

    PaginationWaypoint.lastPageEntered = page;

    sendPageView(this.getPageviewPayload());
  }

  render() {
    const { children } = this.props;

    return (
      <Waypoint
        bottomOffset="40%"
        scrollableAncestor="window"
        onEnter={this.handleOnEnter}
      >
        {children}
      </Waypoint>
    );
  }
}

export default inject(({ stores: { analytics } }) => ({
  sendPageView: analytics.sendPageView,
}))(PaginationWaypoint);
