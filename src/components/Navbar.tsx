import React from 'react';
import { Category } from '../types';


interface NavbarProps {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  categories: Category[];
}
export const Navbar = ({activeCategory, setActiveCategory, categories}: NavbarProps) => (
  <nav className="app-nav" aria-label="Категории полуприцепов">
    <div className="nav-inner">
      <div className="nav-categories">{categories.map(cat => <button key={cat.id} type="button" aria-pressed={activeCategory===cat.id} onClick={()=>setActiveCategory(cat.id)} className={activeCategory===cat.id?'category-button is-active':'category-button'}>{cat.label}</button>)}</div>
    </div>
  </nav>
);

