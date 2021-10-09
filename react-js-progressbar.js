import React, { useEffect, useRef, useState } from 'react';
import { requestNum } from 'request-animation-number';

export default function Progressbar(props) {
  const pathRef = useRef();
  const textRef = useRef();

  const [oldProgressValue, setoldProgressValue] = useState(null);
  const [oldTextValue, setoldTextValue] = useState(null);
  const [svgId] = useState(Math.random() * 1000);

  let input = props.input;
  input = Math.min(Math.max(input, 0), 100);
  if (!input && isNaN(input)) console.error('react-js-ProgressBar: Please enter a valid input value');

  const type = props.shape || 'full circle'; // 'semi circle' | 'full circle' | 'arc'
  const size = props.size ?? '100%';
  const clockwise = props.clockwise ?? true;

  const dashed = props.dashed ?? false;
  const dashesCount = props.dashesCount ?? 15;
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
  const textPosition = { x: props.textPosition?.x ?? '50%', y: props.textPosition?.y ?? (type === 'arc' ? '40%' : '50%') };
  const textStyle = { fontSize: '50px', fill: 'black', ...props.textStyle };
  const animateText = props.animateText ?? true;

  const animation = {
    duration: props.animation?.duration ?? 500,
    delay: props.animation?.delay ?? 0,
    ease: props.animation?.ease || 'easeOutBack',
    animateOnMount: true,
    animateOnInputChange: true,
  };

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

  const Gradiant = options => {
    return (
      <linearGradient id={options.id + svgId} x='0%' x2='0%' y1='0%' y2='100%'>
        <stop offset='0%' stopColor={options.stop1} />
        <stop offset='90%' stopColor={options.stop2} />
      </linearGradient>
    );
  };

  const [isFirstMount, setIsFirstMount] = useState(true);

  const SemiCircle = () => {
    const translateY = trailWidth > strokeWidth ? trailWidth + trailShadowBlur : strokeWidth + pathShadowBlur;
    const textShift = trailWidth > strokeWidth ? trailWidth / 2 + trailShadowBlur / 2 : strokeWidth / 2 + pathShadowBlur / 2;

    return (
      <svg width={size} height={size} viewBox={viewBoxExpand} fill='none' xmlns='http://www.w3.org/2000/svg'>
        {/* background gradiant */}
        {typeof backgroundColor === 'object' ? (
          <Gradiant id='react-js-progrssBar-background' stop1={backgroundColor[0]} stop2={backgroundColor[1]} />
        ) : null}
        {/* background */}
        {backgroundColor !== 'none' ? (
          <circle
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
          <Gradiant id='react-js-progrssBar-trail' stop1={trailColor[0]} stop2={trailColor[1]} />
        ) : null}
        {/* trail */}
        {trailColor === 'none' || trailWidth === 0 ? null : (
          <path
            d='M170.063 171.353C188.54 153.208 200 127.942 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 127.942 11.4604 153.208 29.9371 171.353'
            ref={pathRef}
            strokeWidth={trailWidth + 'px'}
            stroke={typeof trailColor === 'object' ? `url(#react-js-progrssBar-trail${svgId})` : trailColor}
            strokeLinecap={strokeLinecap}
            style={{ transform: `translateY(${translateY}px)` }}
          />
        )}
        {/* path gradiant */}
        {typeof strokeColor === 'object' ? (
          <Gradiant id='react-js-progrssBar-path' stop1={strokeColor[0]} stop2={strokeColor[1]} />
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
              strokeDasharray={`${dashesCount}px ${dashesGap}px`}
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
  };

  const Arc = () => {
    const textShift = trailWidth > strokeWidth ? trailWidth / 2 + trailShadowBlur / 2 : strokeWidth / 2 + pathShadowBlur / 2;
    const translateY = trailWidth > strokeWidth ? trailWidth + trailShadowBlur : strokeWidth + pathShadowBlur;
    const hs = strokeWidth / 2;

    return (
      <svg width={size} height={size} viewBox={viewBoxExpand} fill='none' xmlns='http://www.w3.org/2000/svg'>
        {/* background gradiant */}
        {typeof backgroundColor === 'object' ? (
          <Gradiant id='react-js-progrssBar-background' stop1={backgroundColor[0]} stop2={backgroundColor[1]} />
        ) : null}
        {/* background */}
        {backgroundColor !== 'none' ? (
          <path
            d={`M${200.5 - hs} 100 C${200.5 - hs} 45 ${155.5 - hs} ${hs - 0.5} 100 ${hs - 0.5} C45 ${hs} ${hs} ${
              45 + hs
            } ${hs} 100`}
            fill={typeof backgroundColor === 'object' ? `url(#react-js-progrssBar-background${svgId})` : backgroundColor}
            style={{ transform: `translateY(${translateY}px)` }}
          />
        ) : null}
        {/* trail gradiant */}
        {typeof trailColor === 'object' ? (
          <Gradiant id='react-js-progrssBar-trail' stop1={trailColor[0]} stop2={trailColor[1]} />
        ) : null}
        {/* trail */}
        {trailColor === 'none' || trailWidth === 0 ? null : (
          <path
            d='M200 100 C200 45 155 0 100 0 C45 0 0 45 0 100'
            ref={pathRef}
            strokeWidth={trailWidth + 'px'}
            stroke={typeof trailColor === 'object' ? `url(#react-js-progrssBar-trail${svgId})` : trailColor}
            strokeLinecap={strokeLinecap}
            style={{ transform: `translateY(${translateY}px)` }}
          />
        )}
        {/* path gradiant */}
        {typeof strokeColor === 'object' ? (
          <Gradiant id='react-js-progrssBar-path' stop1={strokeColor[0]} stop2={strokeColor[1]} />
        ) : null}
        {/* path */}
        <path
          d='M200 100 C200 45 155 0 100 0 C45 0 0 45 0 100'
          // d='M199.999 100C200 99.83 200 99.66 200 99.4898C200 44.5431 155.228 0 100 0C44.7715 0 0 44.5431 0 99.4898C0 99.66 0.000429398 99.83 0.00128722 100'
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
              strokeDasharray={`${dashesCount}px ${dashesGap}px`}
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
  };

  const FullCircle = () => {
    const textShift = trailWidth > strokeWidth ? trailWidth / 2 + trailShadowBlur / 2 : strokeWidth / 2 + pathShadowBlur / 2;

    return (
      <svg width={size} height={size} viewBox={viewBoxExpand} xmlns='http://www.w3.org/2000/svg' fill='none'>
        {/* background gradiant */}
        {typeof backgroundColor === 'object' ? (
          <Gradiant id='react-js-progrssBar-background' stop1={backgroundColor[0]} stop2={backgroundColor[1]} />
        ) : null}
        {/* background */}
        {backgroundColor !== 'none' ? (
          <circle
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
          <Gradiant id='react-js-progrssBar-trail' stop1={trailColor[0]} stop2={trailColor[1]} />
        ) : null}
        {/* trail */}
        {trailColor === 'none' || trailWidth === 0 ? null : (
          <circle
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
          <Gradiant id='react-js-progrssBar-path' stop1={strokeColor[0]} stop2={strokeColor[1]} />
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
              strokeDasharray={`${dashesCount}px ${dashesGap}px`}
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
  };

  useEffect(() => {
    // exit if animate on mount disabled.
    if (isFirstMount && !animation.animateOnMount) {
      setoldProgressValue(calcProgress);
      setoldTextValue(input);
      setIsFirstMount(false);
      return;
    }

    // exit fi animate on input change disabled.
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

    // animate text
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
    }

    setIsFirstMount(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.input]);

  return <>{type === 'semi circle' ? <SemiCircle /> : type === 'arc' ? <Arc /> : <FullCircle />}</>;
}
