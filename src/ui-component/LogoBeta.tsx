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

const LogoBeta = ({ width = 120 }) => (
  /**
   * if you want to use image instead of svg uncomment following, and comment out <svg> element.
   *
   * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Removed" width="100" />
   *
   */
  <svg style={{ width }} id="Layer_1" data-name="Layer 1" xmlns="http://removed" viewBox="0 0 150 37.53">
    <defs>
      <style>{`.cls-1{fill:none;}.cls-2,.cls-3{fill:#874bef;}.cls-3{font-size:11.57px;font-family:Poppins-Black, Poppins;font-weight:800;}`}</style>
    </defs>
    <rect id="backgroundrect" className="cls-1" width="150" height="36.6" />
    <g id="Logo">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1-2">
          {/* Paths are removed. */}
          <path
            id=""
            data-name=""
            className=""
            d=""
          />
        </g>
      </g>
    </g>
    <text className="cls-3" transform="translate(15.08 32.67)">
      BETA
    </text>
  </svg>
);

export default LogoBeta;
