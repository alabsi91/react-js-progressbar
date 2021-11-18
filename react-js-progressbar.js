import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { requestNum } from 'request-animation-number';

export default function Progressbar(props) {
  const pathRef = useRef();
  const pathGradiantRef = useRef();
  const textRef = useRef();
  const trailRef = useRef();
  const trailGradiantRef = useRef();
  const backgroundColorRef = useRef();
  const backgroundColorGradiantRef = useRef();

  const [oldProgressValue, setoldProgressValue] = useState(null);
  const [oldTextValue, setoldTextValue] = useState(null);
  const [svgId] = useState(Math.random() * 1000);

  let input = props.input;
  input = Math.min(Math.max(input, 0), 100);

  const type = props.shape || 'full circle'; // 'semi circle' | 'full circle' | 'arc'

  const size = props.size ?? '100%';
  const clockwise = props.clockwise ?? true;

  const dashed = props.dashed ?? false;
  const dashesSize = props.dashesSize ?? 15;
  const dashesGap = props.dashesGap ?? 2;

  const strokeWidth = props.pathWidth ?? 12;
  const strokeColor = props.pathColor || ['#f4314a', '#fa5813'];
  const strokeLinecap = props.pathLinecap || (type === 'arc' ? 'none' : 'round'); // 'butt' | 'round' | 'square' | 'none'
  const strokeShadow = dashed
    ? 'none'
    : props.pathShadow && props.pathShadow !== 'none'
    ? `drop-shadow(${props.pathShadow})`
    : props.pathShadow === 'none'
    ? 'none'
    : 'drop-shadow(0px 0px 8px #00000080)';

  const trailWidth = props.trailWidth ?? 5;
  const trailColor = props.trailColor || 'lightgray';

  const backgroundColor = props.backgroundColor || 'none';

  const textValue = props.customText ?? (oldTextValue ? oldTextValue.toFixed(0) : input.toFixed(0)) + '%';
  const textPositionX = props.textPosition?.x ?? '50%';
  const textPositionY = props.textPosition?.y ?? (type === 'arc' ? '40%' : '50%');
  const textPosition = { x: textPositionX, y: textPositionY };

  const textStyle = { fontSize: '50px', fill: 'black', ...props.textStyle };
  const animateText = props.animateText ?? true;

  const animationDuration = props.animation?.duration ?? 500;
  const animationDelay = props.animation?.delay ?? 0;
  const animationEase = props.animation?.ease || 'easeOutBack';
  const animateOnMount = props.animateOnMount ?? true;
  const animateOnInputChange = props.animateOnInputChange ?? true;

  const animation = {
    duration: animationDuration,
    delay: animationDelay,
    ease: animationEase,
    animateOnMount,
    animateOnInputChange,
  };

  const checkTypes = () => {
    if (typeof input !== 'number' || input < 0) console.error('react-js-ProgressBar: props.input has invalid value.');

    if (!new Set(['full circle', 'semi circle', 'full circle', 'arc']).has(type))
      console.error('react-js-ProgressBar: props.shape has invalid value.');

    if (typeof size !== 'number' && typeof size !== 'string')
      console.error('react-js-ProgressBar: props.size has invalid value.');

    if (typeof clockwise !== 'boolean') console.error('react-js-ProgressBar: props.clockwise has invalid value.');

    if (typeof dashed !== 'boolean') console.error('react-js-ProgressBar: props.dashed has invalid value.');

    if (typeof dashesSize !== 'number' || dashesSize < 0)
      console.error('react-js-ProgressBar: props.dashesSize has invalid value.');

    if (typeof dashesGap !== 'number' || dashesGap < 0) console.error('react-js-ProgressBar: props.dashesGap has invalid value.');

    if (typeof strokeWidth !== 'number' || strokeWidth < 0)
      console.error('react-js-ProgressBar: props.pathWidth has invalid value.');

    if (typeof strokeColor !== 'string' && typeof strokeColor !== 'object')
      console.error('react-js-ProgressBar: props.pathColor has invalid value.');

    if (!new Set(['butt', 'round', 'square', 'none']).has(strokeLinecap))
      console.error('react-js-ProgressBar: props.pathLinecap has invalid value.');

    if (typeof strokeShadow !== 'string') console.error('react-js-ProgressBar: props.pathShadow has invalid value.');

    if (typeof trailWidth !== 'number' || trailWidth < 0)
      console.error('react-js-ProgressBar: props.trailWidth has invalid value.');

    if (typeof trailColor !== 'string' && typeof trailColor !== 'object')
      console.error('react-js-ProgressBar: props.trailColor has invalid value.');

    if (typeof backgroundColor !== 'string' && typeof backgroundColor !== 'object')
      console.error('react-js-ProgressBar: props.backgroundColor has invalid value.');

    if (typeof textPositionX !== 'number' && typeof textPositionX !== 'string')
      console.error('react-js-ProgressBar: props.textPosition.x has invalid value.');

    if (typeof textPositionY !== 'number' && typeof textPositionY !== 'string')
      console.error('react-js-ProgressBar: props.textPosition.y has invalid value.');

    if (typeof textPosition !== 'object') console.error('react-js-ProgressBar: props.textPosition has invalid value.');

    if (typeof textStyle !== 'object') console.error('react-js-ProgressBar: props.textStyle has invalid value.');

    if (typeof animateText !== 'boolean') console.error('react-js-ProgressBar: props.animateText has invalid value.');

    if (typeof animationDuration !== 'number' || animationDuration < 0)
      console.error('react-js-ProgressBar: props.animation.duration has invalid value.');

    if (typeof animationDelay !== 'number' || animationDelay < 0)
      console.error('react-js-ProgressBar: props.animation.delay has invalid value.');

    if (
      (!new Set([
        'linear',
        'easeInSine',
        'easeOutSine',
        'easeInOutSine',
        'easeInQuad',
        'easeOutQuad',
        'easeInOutQuad',
        'easeInCubic',
        'easeOutCubic',
        'easeInOutCubic',
        'easeInQuart',
        'easeOutQuart',
        'easeInOutQuart',
        'easeInQuint',
        'easeOutQuint',
        'easeInOutQuint',
        'easeInExpo',
        'easeOutExpo',
        'easeInOutExpo',
        'easeInCirc',
        'easeOutCirc',
        'easeInOutCirc',
        'easeInBack',
        'easeOutBack',
        'easeInOutBack',
        'easeInElastic',
        'easeOutElastic',
        'easeInOutElastic',
        'easeInBounce',
        'easeOutBounce',
        'easeInOutBounce',
      ]).has(animationEase) &&
        typeof animationEase === 'string') ||
      (typeof animationEase !== 'string' && typeof animationEase !== 'function')
    )
      console.error('react-js-ProgressBar: props.animation.ease has invalid value.');

    if (typeof animateOnMount !== 'boolean')
      console.error('react-js-ProgressBar: props.animation.animateOnMount has invalid value.');

    if (typeof animateOnInputChange !== 'boolean')
      console.error('react-js-ProgressBar: props.animation.animateOnInputChange has invalid value.');

    if (typeof animation !== 'object') console.error('react-js-ProgressBar: props.animation has invalid value.');
  };
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') checkTypes();

  const R = 100;
  const circumference =
    type === 'full circle'
      ? 2 * Math.PI * R
      : type === 'arc'
      ? (2 * Math.PI * 100) / 2
      : type === 'semi circle'
      ? (2 * Math.PI * R) / 1.329
      : 0;

  const calcProgress = (circumference - (input * circumference) / 100) * (clockwise ? 1 : -1);

  const pathShadowBlur = strokeShadow !== 'none' ? parseInt(strokeShadow?.split(' ')?.[2]) : 0;
  const trailShadowBlur = Math.abs(pathShadowBlur - (trailWidth - strokeWidth));

  const viewBoxExpand =
    trailWidth > strokeWidth
      ? `${-(trailWidth / 2 + trailShadowBlur)} ${trailWidth / 2 + trailShadowBlur} ${200 + trailWidth + trailShadowBlur} ${
          200 + trailWidth + trailShadowBlur
        }`
      : `${-(strokeWidth / 2 + pathShadowBlur)} ${strokeWidth / 2 + pathShadowBlur} ${200 + strokeWidth + pathShadowBlur} ${
          200 + strokeWidth + pathShadowBlur
        }`;

  const maskCord = trailWidth > strokeWidth ? -trailWidth / 2 : -strokeWidth / 2;

  const Gradiant = forwardRef((options, ref) => {
    return (
      <linearGradient ref={ref} id={options.id + svgId} x='0%' x2='0%' y1='0%' y2='100%'>
        <stop offset='0%' stopColor={options.stop1} />
        <stop offset='90%' stopColor={options.stop2} />
      </linearGradient>
    );
  });

  const [isFirstMount, setIsFirstMount] = useState(true);

  const SemiCircle = useCallback(() => {
    const translateY = trailWidth > strokeWidth ? trailWidth + trailShadowBlur : strokeWidth + pathShadowBlur;
    const textShift = trailWidth > strokeWidth ? trailWidth / 2 + trailShadowBlur / 2 : strokeWidth / 2 + pathShadowBlur / 2;

    return (
      <svg width={size} height={size} viewBox={viewBoxExpand} fill='none' xmlns='http://www.w3.org/2000/svg'>
        {/* background gradiant */}
        {typeof backgroundColor === 'object' ? (
          <Gradiant
            ref={backgroundColorGradiantRef}
            id='react-js-progrssBar-background'
            stop1={backgroundColor[0]}
            stop2={backgroundColor[1]}
          />
        ) : null}
        {/* background */}
        {backgroundColor !== 'none' ? (
          <circle
            ref={backgroundColorRef}
            cx='100'
            cy='100'
            r={R - strokeWidth / 2 + 0.5}
            transform='rotate(270)'
            fill={typeof backgroundColor === 'object' ? `url(#react-js-progrssBar-background${svgId})` : backgroundColor}
            style={{ transformOrigin: 'center' }}
          />
        ) : null}
        {/* trail gradiant */}
        {typeof trailColor === 'object' ? (
          <Gradiant ref={trailGradiantRef} id='react-js-progrssBar-trail' stop1={trailColor[0]} stop2={trailColor[1]} />
        ) : null}
        {/* trail */}
        {trailColor === 'none' || trailWidth === 0 ? null : (
          <path
            d='M170.063 171.353C188.54 153.208 200 127.942 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 127.942 11.4604 153.208 29.9371 171.353'
            ref={trailRef}
            strokeWidth={trailWidth + 'px'}
            stroke={typeof trailColor === 'object' ? `url(#react-js-progrssBar-trail${svgId})` : trailColor}
            strokeLinecap={strokeLinecap}
            style={{ transform: `translateY(${translateY}px)` }}
          />
        )}
        {/* path gradiant */}
        {typeof strokeColor === 'object' ? (
          <Gradiant ref={pathGradiantRef} id='react-js-progrssBar-path' stop1={strokeColor[0]} stop2={strokeColor[1]} />
        ) : null}
        {/* path */}
        <path
          d='M170.063 171.353C188.54 153.208 200 127.942 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 127.942 11.4604 153.208 29.9371 171.353'
          ref={pathRef}
          strokeWidth={strokeWidth + 'px'}
          stroke={typeof strokeColor === 'object' ? `url(#react-js-progrssBar-path${svgId})` : strokeColor}
          strokeDashoffset={oldProgressValue !== null ? oldProgressValue : circumference + 'px'}
          strokeDasharray={circumference + 'px'}
          strokeLinecap={strokeLinecap}
          mask={dashed ? `url(#react-js-progrssBar-dashes${svgId})` : null}
          style={{
            transform: `translateY(${translateY}px)`,
            filter: strokeShadow,
          }}
        />
        {/* dashes */}
        {dashed ? (
          <mask maskUnits='userSpaceOnUse' x={maskCord} y={maskCord} id={'react-js-progrssBar-dashes' + svgId}>
            <path
              d='M170.063 171.353C188.54 153.208 200 127.942 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 127.942 11.4604 153.208 29.9371 171.353'
              stroke='white'
              strokeWidth={strokeWidth + 'px'}
              strokeDasharray={`${dashesSize}px ${dashesGap}px`}
            />
          </mask>
        ) : null}

        {/* text */}
        {props.customText === '' ? null : (
          <text
            ref={textRef}
            x={textPosition.x}
            y={textPosition.y}
            dy={textShift}
            dx={-textShift}
            textAnchor='middle'
            dominantBaseline='central'
            style={{ ...textStyle }}
          >
            {textValue}
          </text>
        )}

        {/* children */}
        {props.children ? (
          <foreignObject
            x={trailWidth > strokeWidth ? -trailWidth / 2 : -strokeWidth / 2}
            y={trailWidth > strokeWidth ? trailWidth / 2 : strokeWidth / 2}
            width='100%'
            height='100%'
          >
            {props.children}
          </foreignObject>
        ) : null}
      </svg>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  const Arc = useCallback(() => {
    const textShift = trailWidth > strokeWidth ? trailWidth / 2 + trailShadowBlur / 2 : strokeWidth / 2 + pathShadowBlur / 2;
    const translateY = trailWidth > strokeWidth ? trailWidth + trailShadowBlur : strokeWidth + pathShadowBlur;
    const hs = strokeWidth / 2;

    return (
      <svg width={size} height={size} viewBox={viewBoxExpand} fill='none' xmlns='http://www.w3.org/2000/svg'>
        {/* background gradiant */}
        {typeof backgroundColor === 'object' ? (
          <Gradiant
            ref={backgroundColorGradiantRef}
            id='react-js-progrssBar-background'
            stop1={backgroundColor[0]}
            stop2={backgroundColor[1]}
          />
        ) : null}
        {/* background */}
        {backgroundColor !== 'none' ? (
          <path
            ref={backgroundColorRef}
            d={`M${200.5 - hs} 100 C${200.5 - hs} 45 ${155.5 - hs} ${hs - 0.5} 100 ${hs - 0.5} C45 ${hs} ${hs} ${
              45 + hs
            } ${hs} 100`}
            fill={typeof backgroundColor === 'object' ? `url(#react-js-progrssBar-background${svgId})` : backgroundColor}
            style={{ transform: `translateY(${translateY}px)` }}
          />
        ) : null}
        {/* trail gradiant */}
        {typeof trailColor === 'object' ? (
          <Gradiant ref={trailGradiantRef} id='react-js-progrssBar-trail' stop1={trailColor[0]} stop2={trailColor[1]} />
        ) : null}
        {/* trail */}
        {trailColor === 'none' || trailWidth === 0 ? null : (
          <path
            ref={trailRef}
            d='M200 100 C200 45 155 0 100 0 C45 0 0 45 0 100'
            strokeWidth={trailWidth + 'px'}
            stroke={typeof trailColor === 'object' ? `url(#react-js-progrssBar-trail${svgId})` : trailColor}
            strokeLinecap={strokeLinecap}
            style={{ transform: `translateY(${translateY}px)` }}
          />
        )}
        {/* path gradiant */}
        {typeof strokeColor === 'object' ? (
          <Gradiant ref={pathGradiantRef} id='react-js-progrssBar-path' stop1={strokeColor[0]} stop2={strokeColor[1]} />
        ) : null}
        {/* path */}
        <path
          d='M200 100 C200 45 155 0 100 0 C45 0 0 45 0 100'
          ref={pathRef}
          strokeWidth={strokeWidth + 'px'}
          stroke={typeof strokeColor === 'object' ? `url(#react-js-progrssBar-path${svgId})` : strokeColor}
          strokeDashoffset={oldProgressValue !== null ? oldProgressValue : circumference + 'px'}
          strokeDasharray={circumference + 'px'}
          strokeLinecap={strokeLinecap}
          mask={dashed ? `url(#react-js-progrssBar-dashes${svgId})` : null}
          style={{ transform: `translateY(${translateY}px)` }}
        />
        {/* dashes */}
        {dashed ? (
          <mask maskUnits='userSpaceOnUse' x={maskCord} y={maskCord} id={'react-js-progrssBar-dashes' + svgId}>
            <path
              d='M199.999 100C200 99.83 200 99.66 200 99.4898C200 44.5431 155.228 0 100 0C44.7715 0 0 44.5431 0 99.4898C0 99.66 0.000429398 99.83 0.00128722 100'
              stroke='white'
              strokeWidth={strokeWidth + 'px'}
              strokeDasharray={`${dashesSize}px ${dashesGap}px`}
            />
          </mask>
        ) : null}

        {/* Text */}
        {props.customText === '' ? null : (
          <text
            ref={textRef}
            x={textPosition.x}
            y={textPosition.y}
            dy={textShift}
            dx={-textShift}
            textAnchor='middle'
            dominantBaseline='central'
            style={{ ...textStyle }}
          >
            {textValue}
          </text>
        )}

        {/* children */}
        {props.children ? (
          <foreignObject
            x={trailWidth > strokeWidth ? -trailWidth / 2 : -strokeWidth / 2}
            y={trailWidth > strokeWidth ? trailWidth / 2 : strokeWidth / 2}
            width='100%'
            height='100%'
          >
            {props.children}
          </foreignObject>
        ) : null}
      </svg>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  const FullCircle = useCallback(() => {
    const textShift = trailWidth > strokeWidth ? trailWidth / 2 + trailShadowBlur / 2 : strokeWidth / 2 + pathShadowBlur / 2;

    return (
      <svg width={size} height={size} viewBox={viewBoxExpand} xmlns='http://www.w3.org/2000/svg' fill='none'>
        {/* background gradiant */}
        {typeof backgroundColor === 'object' ? (
          <Gradiant
            ref={backgroundColorGradiantRef}
            id='react-js-progrssBar-background'
            stop1={backgroundColor[0]}
            stop2={backgroundColor[1]}
          />
        ) : null}
        {/* background */}
        {backgroundColor !== 'none' ? (
          <circle
            ref={backgroundColorRef}
            cx='100'
            cy='100'
            r={R - strokeWidth / 2 + 0.5}
            transform='rotate(270)'
            fill={typeof backgroundColor === 'object' ? `url(#react-js-progrssBar-background${svgId})` : backgroundColor}
            style={{ transformOrigin: 'center' }}
          />
        ) : null}
        {/* trail gradiant */}
        {typeof trailColor === 'object' ? (
          <Gradiant ref={trailGradiantRef} id='react-js-progrssBar-trail' stop1={trailColor[0]} stop2={trailColor[1]} />
        ) : null}
        {/* trail */}
        {trailColor === 'none' || trailWidth === 0 ? null : (
          <circle
            ref={trailRef}
            cx='100'
            cy='100'
            r={R}
            strokeWidth={trailWidth + 'px'}
            stroke={typeof trailColor === 'object' ? `url(#react-js-progrssBar-trail${svgId})` : trailColor}
            transform='rotate(270)'
            style={{ transformOrigin: 'center' }}
          />
        )}
        {/* path gradiant */}
        {typeof strokeColor === 'object' ? (
          <Gradiant ref={pathGradiantRef} id='react-js-progrssBar-path' stop1={strokeColor[0]} stop2={strokeColor[1]} />
        ) : null}
        {/* path */}
        <circle
          ref={pathRef}
          cx='100'
          cy='100'
          r={R}
          strokeWidth={strokeWidth + 'px'}
          stroke={typeof strokeColor === 'object' ? `url(#react-js-progrssBar-path${svgId})` : strokeColor}
          strokeDashoffset={oldProgressValue !== null ? oldProgressValue : circumference + 'px'}
          strokeDasharray={circumference + 'px'}
          strokeLinecap={strokeLinecap}
          transform='rotate(270)'
          mask={dashed ? `url(#react-js-progrssBar-dashes${svgId})` : null}
          style={{ transformOrigin: 'center', filter: strokeShadow }}
        />
        {/* dashes */}
        {dashed ? (
          <mask maskUnits='userSpaceOnUse' x={maskCord} y={maskCord} id={'react-js-progrssBar-dashes' + svgId}>
            <circle
              cx='100'
              cy='100'
              r={R}
              stroke='white'
              strokeWidth={strokeWidth + 'px'}
              strokeDasharray={`${dashesSize}px ${dashesGap}px`}
            />
          </mask>
        ) : null}

        {/* text */}
        {props.customText === '' ? null : (
          <text
            ref={textRef}
            x={textPosition.x}
            y={textPosition.y}
            dy={textShift}
            dx={-textShift}
            textAnchor='middle'
            dominantBaseline='central'
            style={{ ...textStyle }}
          >
            {textValue}
          </text>
        )}

        {/* children */}
        {props.children ? (
          <foreignObject
            x={trailWidth > strokeWidth ? -trailWidth / 2 - trailShadowBlur / 2 : -strokeWidth / 2 - pathShadowBlur / 2}
            y={trailWidth > strokeWidth ? trailWidth / 2 + trailShadowBlur / 2 : strokeWidth / 2 + pathShadowBlur / 2}
            width='100%'
            height='100%'
          >
            {props.children}
          </foreignObject>
        ) : null}
      </svg>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  // update props when input changes
  const updateProps = useCallback(() => {
    // path
    if (pathRef.current) {
      pathRef.current.style.stroke = typeof strokeColor === 'object' ? `url(#react-js-progrssBar-path${svgId})` : strokeColor;
    }
    if (pathGradiantRef.current && typeof strokeColor === 'object') {
      pathGradiantRef.current.children[0].style.stopColor = strokeColor[0];
      pathGradiantRef.current.children[1].style.stopColor = strokeColor[1];
    }
    // trail
    if (trailRef.current) {
      trailRef.current.style.stroke = typeof trailColor === 'object' ? `url(#react-js-progrssBar-trail${svgId})` : trailColor;
    }
    if (trailGradiantRef.current && typeof trailColor === 'object') {
      trailGradiantRef.current.children[0].style.stopColor = trailColor[0];
      trailGradiantRef.current.children[1].style.stopColor = trailColor[1];
    }
    // background
    if (backgroundColorRef.current) {
      backgroundColorRef.current.style.fill =
        typeof backgroundColor === 'object' ? `url(#react-js-progrssBar-background${svgId})` : backgroundColor;
    }
    if (backgroundColorGradiantRef.current && typeof backgroundColor === 'object') {
      backgroundColorGradiantRef.current.children[0].style.stopColor = backgroundColor[0];
      backgroundColorGradiantRef.current.children[1].style.stopColor = backgroundColor[1];
    }
    // text
    if (textRef.current) {
      Object.keys(textStyle).forEach(key => (textRef.current.style[key] = textStyle[key]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.input]);

  useEffect(() => {
    // update props when input changes without re-rendering
    if (!isFirstMount) updateProps();

    // exit if animate on mount disabled.
    if (isFirstMount && !animation.animateOnMount) {
      setoldProgressValue(calcProgress);
      setoldTextValue(input);
      setIsFirstMount(false);
      return;
    }

    // exit if animate on input change disabled.
    if (!isFirstMount && !animation.animateOnInputChange) {
      setoldProgressValue(calcProgress);
      setoldTextValue(input);
      return;
    }

    // animate path
    requestNum(
      {
        from: oldProgressValue ? oldProgressValue : circumference * (clockwise ? 1 : -1),
        to: calcProgress,
        duration: animation.duration,
        delay: animation.delay,
        easingFunction: animation.ease,
      },
      x => {
        // do nothing if unmounted
        if (pathRef.current) {
          pathRef.current.style.strokeDashoffset = x + 'px';
          if (x === calcProgress) setoldProgressValue(calcProgress);
        }
      }
    );

    // animate text if it's not cutom text
    if (!props.customText && props.customText !== '' && animateText) {
      requestNum(
        {
          from: oldTextValue ?? 0,
          to: input,
          duration: animation.duration,
          delay: animation.delay,
          easingFunction: animation.ease,
        },
        t => {
          // do nothing if unmounted
          if (textRef.current) {
            textRef.current.innerHTML = t.toFixed(0) + '%';
            if (t === input) setoldTextValue(input);
          }
        }
      );
      // update cutstom text
    } else if (textRef.current) textRef.current.innerHTML = props.customText;

    setIsFirstMount(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.input]);

  return <>{type === 'semi circle' ? <SemiCircle /> : type === 'arc' ? <Arc /> : <FullCircle />}</>;
}
