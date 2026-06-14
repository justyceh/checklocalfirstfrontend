import type { BusinessService } from '@/lib/types';

export default function ServiceCard({ service }: { service: BusinessService }) {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-[#1a1a1a] leading-snug">{service.name}</h3>

      {service.description && (
        <p className="text-sm text-[#555] leading-relaxed line-clamp-3 flex-1">
          {service.description}
        </p>
      )}

      {service.price != null && (
        <p className="mt-auto pt-3 text-xl font-bold text-[#3a6e3f]">
          ${service.price.toFixed(2)}
        </p>
      )}
    </article>
  );
}
