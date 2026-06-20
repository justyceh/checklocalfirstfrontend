import Link from 'next/link';
import Image from 'next/image';
import type { Business } from '@/lib/types';
import FavoriteButton from '@/components/FavoriteButton';

type Props = {
  business: Business;
  photoSrc?: string;
};

export default function BusinessCard({ business, photoSrc }: Props) {
  return (
    <div className="relative flex flex-col rounded-xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md overflow-hidden">
      {photoSrc && (
        <div className="relative w-full aspect-4/3">
          <Image
            src={photoSrc}
            alt={business.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 p-5">
        <h2 className="text-lg font-semibold text-dark leading-snug">
          <Link
            href={`/businesses/${business.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {business.name}
          </Link>
        </h2>

        {business.description && (
          <p className="relative z-10 text-sm text-body leading-relaxed line-clamp-2">{business.description}</p>
        )}
      </div>

      <FavoriteButton businessId={business.id} className="absolute top-3 right-3 z-10" />
    </div>
  );
}
