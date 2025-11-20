import React from 'react';
import { Star, MapPin } from 'lucide-react';

interface ServiceCardProps {
  image: string;
  title: string;
  subtitle: string;
  rating: number;
  reviews: number;
  location?: string;
  price?: string;
  tags?: string[];
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  subtitle,
  rating,
  reviews,
  location,
  price,
  tags,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-full hover:-translate-y-2"
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-royal-900/0 group-hover:bg-royal-900/10 z-10 transition-colors duration-500"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {price && (
          <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-sm text-xs font-bold text-royal-900 shadow-lg border border-gold-500/30 tracking-wider">
            {price}
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-1 relative">
        {/* Gold accent line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-display text-xl font-bold text-royal-900 leading-tight group-hover:text-gold-600 transition-colors">{title}</h3>
            <p className="text-sm text-slate-500 font-serif italic mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center gap-1 bg-cream px-2 py-1 rounded border border-slate-100">
            <Star size={12} className="fill-gold-500 text-gold-500" />
            <span className="text-xs font-bold text-royal-900">{rating}</span>
            <span className="text-xs text-slate-400">({reviews})</span>
          </div>
        </div>

        {location && (
          <div className="flex items-center gap-1 text-slate-500 text-xs mb-4 font-medium uppercase tracking-wide">
            <MapPin size={12} className="text-gold-500" />
            {location}
          </div>
        )}

        {tags && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-50">
            {tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] uppercase tracking-widest font-bold bg-slate-50 text-slate-600 px-3 py-1 rounded-full border border-slate-100 group-hover:border-gold-500/30 group-hover:text-royal-900 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};