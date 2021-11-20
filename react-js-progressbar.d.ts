type NamedColor =
  | 'aliceblue'
  | 'antiquewhite'
  | 'aqua'
  | 'aquamarine'
  | 'azure'
  | 'beige'
  | 'bisque'
  | 'black'
  | 'blanchedalmond'
  | 'blue'
  | 'blueviolet'
  | 'brown'
  | 'burlywood'
  | 'cadetblue'
  | 'chartreuse'
  | 'chocolate'
  | 'coral'
  | 'cornflowerblue'
  | 'cornsilk'
  | 'crimson'
  | 'cyan'
  | 'darkblue'
  | 'darkcyan'
  | 'darkgoldenrod'
  | 'darkgray'
  | 'darkgreen'
  | 'darkgrey'
  | 'darkkhaki'
  | 'darkmagenta'
  | 'darkolivegreen'
  | 'darkorange'
  | 'darkorchid'
  | 'darkred'
  | 'darksalmon'
  | 'darkseagreen'
  | 'darkslateblue'
  | 'darkslategray'
  | 'darkslategrey'
  | 'darkturquoise'
  | 'darkviolet'
  | 'deeppink'
  | 'deepskyblue'
  | 'dimgray'
  | 'dimgrey'
  | 'dodgerblue'
  | 'firebrick'
  | 'floralwhite'
  | 'forestgreen'
  | 'fuchsia'
  | 'gainsboro'
  | 'ghostwhite'
  | 'gold'
  | 'goldenrod'
  | 'gray'
  | 'green'
  | 'greenyellow'
  | 'grey'
  | 'honeydew'
  | 'hotpink'
  | 'indianred'
  | 'indigo'
  | 'ivory'
  | 'khaki'
  | 'lavender'
  | 'lavenderblush'
  | 'lawngreen'
  | 'lemonchiffon'
  | 'lightblue'
  | 'lightcoral'
  | 'lightcyan'
  | 'lightgoldenrodyellow'
  | 'lightgray'
  | 'lightgreen'
  | 'lightgrey'
  | 'lightpink'
  | 'lightsalmon'
  | 'lightseagreen'
  | 'lightskyblue'
  | 'lightslategray'
  | 'lightslategrey'
  | 'lightsteelblue'
  | 'lightyellow'
  | 'lime'
  | 'limegreen'
  | 'linen'
  | 'magenta'
  | 'maroon'
  | 'mediumaquamarine'
  | 'mediumblue'
  | 'mediumorchid'
  | 'mediumpurple'
  | 'mediumseagreen'
  | 'mediumslateblue'
  | 'mediumspringgreen'
  | 'mediumturquoise'
  | 'mediumvioletred'
  | 'midnightblue'
  | 'mintcream'
  | 'mistyrose'
  | 'moccasin'
  | 'navajowhite'
  | 'navy'
  | 'oldlace'
  | 'olive'
  | 'olivedrab'
  | 'orange'
  | 'orangered'
  | 'orchid'
  | 'palegoldenrod'
  | 'palegreen'
  | 'paleturquoise'
  | 'palevioletred'
  | 'papayawhip'
  | 'peachpuff'
  | 'peru'
  | 'pink'
  | 'plum'
  | 'powderblue'
  | 'purple'
  | 'rebeccapurple'
  | 'red'
  | 'rosybrown'
  | 'royalblue'
  | 'saddlebrown'
  | 'salmon'
  | 'sandybrown'
  | 'seagreen'
  | 'seashell'
  | 'sienna'
  | 'silver'
  | 'skyblue'
  | 'slateblue'
  | 'slategray'
  | 'slategrey'
  | 'snow'
  | 'springgreen'
  | 'steelblue'
  | 'tan'
  | 'teal'
  | 'thistle'
  | 'tomato'
  | 'transparent'
  | 'turquoise'
  | 'violet'
  | 'wheat'
  | 'white'
  | 'whitesmoke'
  | 'yellow'
  | 'yellowgreen'
  | 'none'
  | (string & {});

type requestFrameEasing =
  | 'linear'
  | 'easeInSine'
  | 'easeOutSine'
  | 'easeInOutSine'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeInExpo'
  | 'easeOutExpo'
  | 'easeInOutExpo'
  | 'easeInCirc'
  | 'easeOutCirc'
  | 'easeInOutCirc'
  | 'easeInBack'
  | 'easeOutBack'
  | 'easeInOutBack'
  | 'easeInElastic'
  | 'easeOutElastic'
  | 'easeInOutElastic'
  | 'easeInBounce'
  | 'easeOutBounce'
  | 'easeInOutBounce';

interface animationProps {
  /**
   * - Progressbar animation duration in ms.
   * - **Default Value** `500`
   */
  duration?: number;

  /**
   * - Progressbar animation delay in ms.
   * - **Default Value** `0`
   */
  delay?: number;

  /**
   * - Progressbar animation transition timing function.
   * - Check [easings.net](https://easings.net/) to learn more.
   * - **Default Value** 'easeOutBack'
   */
  ease?: requestFrameEasing | ((x: number) => number);

  /**
   * - Animate on first render.
   * - **Default Value** `true`
   */
  animateOnMount?: boolean;

  /**
   * - Animate every time input value changes.
   * - **Default Value** `true`
   */
  animateOnInputChange?: boolean;
}

interface textPositonProps {
  /**
   * - Align progressbar text on the x axis.
   * - **Default Value** `50%`
   */
  x?: number | string;

  /**
   * - Align progressbar text on the y axis.
   * - **Default Value** `50%`
   */
  y?: number | string;
}

interface ProgressbarProps {
  /**
   * - Progressbar percentage a value between `0` and `100`.
   */
  input: number;

  /**
   * - Progressbar shape style.
   * - **Default Value** `full circle`
   */
  shape?: 'semi circle' | 'full circle' | 'arc';

  /**
   * - Progressbar size (width * height) in pixels.
   * - **Default Value** `100%`
   */
  size?: number | string;

  /**
   * - Whether to rotate progressbar in clockwise direction.
   * - **Default Value** `true`
   */
  clockwise?: boolean;

  /**
   * - Progressbar filling path width (stroke width).
   * - **Default Value** `12`
   */
  pathWidth?: number;

  /**
   * - Progressbar filling path color (stroke color).
   * - Accepts one string for a solid color or array of two strings for gradient color.
   * - **Default Value** `['#f4314a', '#fa5813']`
   */
  pathColor?: NamedColor | NamedColor[];

  /**
   * - Progressbar filling path line cap shape.
   * - **Default Value** `round`
   */
  pathLinecap?: 'butt' | 'round' | 'square' | 'none';

  /**
   * - Progressbar filling path drop shadow.
   * - **Syntax** `'offset-x offset-y blur-radius color'`
   * - Doesn't works for `'arc'` shape and when `dashed` is enabled.
   * - Use `'none'` to remove the drop shadow.
   * - **Default Value** `0px 0px 2px #00000080`
   */
  pathShadow?: '0px 0px 2px black' | 'none' | (string & {});

  /**
   * - Enable progressbar filling path dashed style.
   * - **Default Value** `false`
   */
  dashed?: boolean;

  /**
   * - Progressbar filling path dashes size and length.
   * - **Default Value** `15`
   */
  dashesSize?: number;

  /**
   * The space between dashes.
   * - **Default Value** `2`
   */
  dashesGap?: number;

  /**
   * - Progressbar path trail width (stroke width).
   * - **Default Value** `6`
   */
  trailWidth?: number;

  /**
   * - Progressbar path trail color (stroke color).
   * - Accepts one string for a solid color or array of two strings for gradient color.
   * - Use `'none'` to remove the trail.
   * - **Default Value** `lightgray`
   */
  trailColor?: NamedColor | NamedColor[];

  /**
   * - Progressbar circle background color.
   * - Accepts one string for a solid color or array of two strings for gradient color.
   * - Use `'none'` to remove the background.
   * - **Default Value** `none`
   */
  backgroundColor?: NamedColor | NamedColor[];

  /**
   * - Progressbar middle custom text.
   * - Use `''` (empty string) to remove the text.
   * - **Default Value** `input + '%'`
   */
  customText?: string;

  /**
   * - Align progressbar text on the `x` , `y` axis.
   */
  textPosition?: textPositonProps;

  /**
   * - Progressbar middle text css inline style.
   * - Note: use `fill` for text color.
   * - **Default Value** `{ fontSize: '40px', fill: 'black' }`
   */
  textStyle?: React.CSSProperties;

  /**
   * - Animate progressbar middle text from `0` to `input value`.
   * - Doesn't work if `customText` value is given.
   * - **Default Value** `true`
   */
  animateText?: boolean;

  /**
   * - Progressbar animation options.
   */
  animation?: animationProps;
}

declare const Progressbar: React.FunctionComponent<ProgressbarProps>;

export default Progressbar;
