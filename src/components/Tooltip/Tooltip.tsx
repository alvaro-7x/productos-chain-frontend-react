import styles from './Tooltip.module.scss';

interface PropsTooltip
{
  texto: string;
  posicion?: string;
}

export const Tooltip = ({texto, posicion = 'left'}: PropsTooltip) =>
{
  const style = posicion === 'left'
    ? {'left': '0'}
    : {'right': '0'};

  return (
    <div className={`tooltipItem ${styles.tooltip}`} style={style}>
      <div className={styles.texto}>{texto}</div>
    </div>
  );
};
