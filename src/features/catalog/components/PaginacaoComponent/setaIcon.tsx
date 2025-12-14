interface Props {
  direction?: 'left' | 'right';
  size?: number;
  color?: string;
}

/**
 * Componente que gera uma seta com a direção 'Left' ou 'Right'
 * @param param0 
 * @returns 
 */
const SetaIcon: React.FC<Props> = ({
  direction = 'right',
  size = 20,
  color = 'white',
}) => {
  const rotation = direction === 'right' ? 'rotate(180deg)' : 'none';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: rotation, display: 'block', margin: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="14 18 8 12 14 6" />
    </svg>
  );
};

export default SetaIcon