import { useEffect, useRef } from 'react';
import customJazzicon from '../../utils/CustomJazzicon/CustomJazzicon';
import styles from './MyCustomJazzicon.module.scss';

interface PropsMyCustomJazzicon
{
  autor: string;
  diametro: number;
}

export const MyCustomJazzicon = ({autor, diametro}: PropsMyCustomJazzicon) =>
{
  const divRef = useRef<HTMLDivElement|null>(null);

  useEffect(() =>
  {
    if (!divRef.current)
    {
      return;
    }

    const newNodo = customJazzicon(diametro, parseInt(autor.slice(2, 10), 16));
    const oldNodo = divRef.current.firstChild;

    oldNodo
      ? divRef.current.replaceChild(newNodo, oldNodo)
      : divRef.current.appendChild(newNodo);
  }, []);

  return (<div className={styles.icon} ref={divRef} style={{ 'width': `${diametro}px`, 'height': `${diametro}px` }} />);
};
