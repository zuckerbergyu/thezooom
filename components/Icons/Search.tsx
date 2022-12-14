import { Colors } from 'constants/theme';

const defaultColor = Colors.primary['500'];

const SvgComponent = (props: { color?: string }) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.7683 18.4851L22.2923 22"
      stroke={props.color || defaultColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12.5166"
      cy="11.7666"
      r="8.98856"
      stroke={props.color || defaultColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
