import React from 'react';

interface CardProps {
  title: string;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
    {title && (
      <header className="px-5 py-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </header>
    )}
    <div>{children}</div>
  </div>
);

export default Card;
