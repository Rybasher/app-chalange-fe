'use client';
import React, { ReactNode } from 'react';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  children?: ReactNode
};

const Button: React.FC<ButtonProps> = ({ label, onClick, className, children, type }) => {
  return (
    <button type={type || 'button'} className={`${className}`} onClick={onClick}>
      {label}
      {children}
    </button>
  );
};

export default Button;