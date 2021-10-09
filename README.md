# react-js-progressbar

![](https://github.com/alabsi91/react-js-toast/blob/readme/toasts.png)

- React library to help developers to draw animated, cross-browser, highly customizable progress circles using SVG.

## Installation

`npm install react-js-progressbar`

## Usage

```javascript
//...
import Progressbar from 'react-js-progressbar';

export default function App() {
  const [percentage, setPercentage] = useState(0);

  const change_progressbar_input = () => {
    setPercentage(50);
  };

  return (
    <>
      <div id='progressbarContainer'>
        <Progressbar
          input={percentage}
          pathWidth={10}
          pathColor={['#56ab2f', '#a8e063']} // use an array for gradient color.
          trailWidth={20}
          trailColor='#363636' // use a string for solid color.
          textStyle={{ fill: 'red' }} // middle text style
        >
          // children here, an image for example. (optional)
        </Progressbar>
      </div>
    </>
  );
}
```

## Props

### input : _[Number]_

- Progressbar percentage a value between 0 and 100.

### shape : _['semi circle' | 'full circle' | 'arc'] [optional]_

- Progressbar shape style.
- **Default Value** 'full circle'

### size : _[Number | String] [optional]_

- Progressbar size (width \* height) in pixels.
- **Default Value** '100%'

### clockwise : _[Boolean] [optional]_

- Whether to rotate progressbar in clockwise direction.
- **Default Value** true

### pathWidth : _[Number] [optional]_

- Progressbar filling path width (stroke width).
- **Default Value** 12

### pathColor : _[ String | String[] ] [optional]_

- Progressbar filling path color (stroke color).
- Accepts one string for a solid color or array of two strings for gradient color.
- **Default Value** ['#f4314a', '#fa5813']

### pathLinecap : _['butt' | 'round' | 'square' | 'none'] [optional]_

- Progressbar filling path line cap shape.
- **Default Value** 'round'

### pathShadow : _[String] [optional]_

- Progressbar filling path drop shadow.
- **Syntax** `"offset-x offset-y blur-radius color"`
- Doesn't works for `'arc'` shape and when `dashed` is enabled.
- Use `'none'` to remove the shadow.
- **Default Value** '0px 0px 8px #00000080'

### dashed : _[Boolean] [optional]_

- Enable progressbar filling path dashed style (mask).
- **Default Value** false

### dashesCount : _[Number] [optional]_

- How many dashes inside progressbar filling path.
- **Default Value** 15

### dashesGap : _[Number] [optional]_

- The space between dashes.
- **Default Value** 2

### trailWidth : _[Number] [optional]_

- Progressbar path trail width (stroke width).
- **Default Value** 5

### trailColor : _[ String | String[] ] [optional]_

- Progressbar path trail color (stroke color).
- Accepts one string for a solid color or array of two strings for gradient color.
- Use `'none'` to remove the trail.
- **Default Value** 'lightgray'

### backgroundColor : _[ String | String[] ] [optional]_

- Progressbar circle background color.
- Accepts one string for a solid color or array of two strings for gradient color.
- Use `'none'` to remove the background.
- **Default Value** 'none'

### customText : _[String] [optional]_

- Progressbar middle custom text.
- Use `""` (empty string) to remove the text.
- **Default Value** input + '%'

### textPosition : _[Object] [optional]_

- Align progressbar text on the x , y axis.

- x : _[Number | String] [optional]_

  - Align progressbar text on the x axis.
  - **Default Value** '50%'

<br />

- y : _[Number | String] [optional]_

  - Align progressbar text on the y axis.
  - **Default Value** '50%'

### textStyle : _[Object] [optional]_

- Progressbar middle text css inline style.
- Note: use `fill` for text color.
- **Default Value** `{ fontSize: '40px', fill: 'black' }`

### animateText : _[Boolean] [optional]_

- Animate progressbar middle text from 0 to `input value`.
- Doesn't work if `customText` value is given.
- **Default Value** true

### animation : _[Object] [optional]_

- Progressbar animation options.

- duration : _[Number] [optional]_
  - Progressbar animation duration in ms.
  - **Default Value** 500

<br />

- delay : _[Number] [optional]_
  - Progressbar animation delay in ms.
  - **Default Value** 0

<br />

- ease : _[String | Function] [optional]_
  - Progressbar animation transition timing function.
  - Easing functions specify the rate of change of the number over time.
  - Easing functions specify the rate of change of the number over time.
  - Avaliable Easing functions :
  `"linear", "easeInSine", "easeOutSine", "easeInOutSine", "easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic", "easeOutCubic", "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint", "easeOutQuint", "easeInOutQuint", "easeInExpo", "easeOutExpo", "easeInOutExpo", "easeInCirc", "easeOutCirc", "easeInOutCirc", "easeInBack", "easeOutBack", "easeInOutBack", "easeInElastic", "easeOutElastic", "easeInOutElastic", "easeInBounce", "easeOutBounce", "easeInOutBounce"`
  - If you want to provide your own timing-function make sure that the function takes one parameter and returns one value.
  - **Default Value** 'easeOutBack'

<br />

- animateOnMount : _[Boolean] [optional]_
  - Animate on first render.
  - **Default Value** true

<br />

- animateOnInputChange : _[Boolean] [optional]_
  - Animate every time input value changes.
  - **Default Value** true

<br />
