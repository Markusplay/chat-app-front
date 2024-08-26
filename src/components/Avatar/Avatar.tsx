import { FC } from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: FC<AvatarProps> = ({ src, alt }) => {
  return (
    <img
      className={styles.avatar}
      src={
        src ||
        `https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg`
      }
      alt={alt}
    />
  );
};

export default Avatar;
