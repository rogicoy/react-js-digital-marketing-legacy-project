/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const LogoIcon = ({ width = 74 }) => (
  /**
   * if you want to use image instead of svg uncomment following, and comment out <svg> element.
   *
   * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Removed" width="100" />
   *
   */
  <svg style={{ width }} viewBox="0 0 74 75" fill="none" xmlns="http://removed">
    <rect y="0.914062" width="74" height="74" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_4816_44063" transform="scale(0.00444444)" />
      </pattern>
      {/* Image is removed */}
      <image
        id=""
        width="225"
        height="225"
        xlinkHref=""
      />
    </defs>
  </svg>
);

export default LogoIcon;
