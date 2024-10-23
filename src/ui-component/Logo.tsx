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

const Logo = ({ width = 120 }) => (
  /**
   * if you want to use image instead of svg uncomment following, and comment out <svg> element.
   *
   * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Removed" width="100" />
   *
   */
  <svg style={{ width }} xmlns="http://removed" viewBox="0 0 417.84 57.14" className="logoSVGDesktop">
    <rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" />
    <defs>
      <linearGradient id="a" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#7f66eb" />
        <stop offset="1" stopColor="#9618f7" />
      </linearGradient>
    </defs>

    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        {/* Paths are removed */}
        <path
          d=""
          fill=""
        />
      </g>
    </g>
  </svg>
);

export default Logo;
