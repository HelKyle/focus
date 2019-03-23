import * as React from 'react';
import * as styles from './CountDown.scss';
import secondFormat from '../utils/secondFormat';
import Play from './svgrs/play-shape';
import Pause from './svgrs/pause';

type Props = {
  plan: number,
  remain: number,
  counting: boolean,
  onToggleCounting: () => void
};

function constrainPercentage(plan, remain) {
  let percentage = (plan - remain) / plan;
  percentage = Math.max(percentage, 0);
  percentage = Math.min(percentage, 100);
  return percentage;
}

export default function(props: Props) {
  const { plan, remain, counting, onToggleCounting } = props;
  const totalLength = 980;
  const radius = 312 * 0.5;
  const percentage = constrainPercentage(plan, remain);

  const offset = percentage * totalLength;
  const cx =
    Math.cos(percentage * Math.PI * 2 - Math.PI * 0.5) * radius + radius;
  const cy =
    Math.sin(percentage * Math.PI * 2 - Math.PI * 0.5) * radius + radius;

  return (
    <div className={styles.countDownWrapper}>
      <div className={styles.action} onClick={onToggleCounting}>
        {counting ? <Pause /> : <Play />}
      </div>
      <svg
        className={styles.countDown}
        width="440px"
        height="440px"
        viewBox="0 0 440 440"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <circle
            id="path-1"
            cx={cx}
            cy={cy}
            r="32"
            fill="white"
            style={{ transition: '1s linear' }}
          />
          <filter
            x="-48.4%"
            y="-45.3%"
            width="196.9%"
            height="196.9%"
            filterUnits="objectBoundingBox"
            id="filter-2"
          >
            <feOffset
              dx="0"
              dy="2"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              stdDeviation="10"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
              type="matrix"
              in="shadowBlurOuter1"
            />
          </filter>
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Group-2">
            <g id="Group" transform="translate(64, 32)">
              <path
                d="M155.051556,34.0028226 C69.3315858,34.513155 0,104.159948 0,190 C0,276.156421 69.843579,346 156,346 C242.156421,346 312,276.156421 312,190 C312,103.843579 242.156421,34 156,34"
                id="Oval"
                stroke="#e9e9e9"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={totalLength}
                strokeDashoffset={0}
              />
              <path
                d="M155.051556,34.0028226 C69.3315858,34.513155 0,104.159948 0,190 C0,276.156421 69.843579,346 156,346 C242.156421,346 312,276.156421 312,190 C312,103.843579 242.156421,34 156,34"
                id="Oval"
                stroke="#4791FF"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={totalLength}
                strokeDashoffset={offset}
                style={{ transition: '1s linear' }}
              />
              <g id="Oval-2" transform="translate(0, 32)">
                <use
                  fill="black"
                  fillOpacity="1"
                  filter="url(#filter-2)"
                  xlinkHref="#path-1"
                />
                <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1" />
              </g>
              <text
                fontFamily="Consolas, Monaco, monospace"
                fontSize="65"
                fontWeight="400"
                fill="#666666"
                x="66"
                y="210"
              >
                {secondFormat(remain)}
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
