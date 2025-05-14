import { notFound } from 'next/navigation';
import houses from '@/../public/src/houses.json';
import AuctionUI from './AuctionUI';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export function generateStaticParams() {
  return houses.map((house) => ({
    id: house.id.toString(),
  }));
}

export default function PropertyDetailPage({ params }: Props) {
  const house = houses.find((h) => h.id.toString() === params.id);

  if (!house) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        {house.size} in {house.location}
      </h1>
      <p>Price: ₹{house.price.toLocaleString()}</p>
      <p>Furnished: {house.furnished}</p>
      <p>Status: {house.status}</p>
      <p>Transaction Type: {house.transaction_type}</p>
      <p>
        Owner: {house.owner.name} ({house.owner.phone})
      </p>
      <p>Amenities: {house.amenities.join(', ')}</p>

      <AuctionUI house={house} />
    </div>
  );
}
