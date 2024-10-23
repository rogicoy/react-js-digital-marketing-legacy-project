/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

class Item extends React.PureComponent {
  ref = React.createRef();

  componentDidMount() {
    const { itemRef } = this.props;
    if (this.ref.current) {
      itemRef(this.ref.current);
    }
  }

  render() {
    const { name, iso2, dialCode, localization, itemRef, native, ...restProps } = this.props;

    if (native) {
      return (
        <option className="country" data-dial-code="1" data-country-code={iso2} value={iso2} {...restProps}>
          {localization || name} {`+${dialCode}`}
        </option>
      );
    }

    return (
      <MenuItem ref={this.ref} className="country" data-dial-code="1" data-country-code={iso2} {...restProps}>
        <div className={`flag ${iso2} margin`} />

        <span className="country-name">{localization || name}</span>

        <span className="dial-code">{`+${dialCode}`}</span>
      </MenuItem>
    );
  }
}

Item.defaultProps = {
  localization: null,
  native: false
};

export default Item;
