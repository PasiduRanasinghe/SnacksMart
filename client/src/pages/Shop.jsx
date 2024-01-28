import ProductCard from '../components/ProductCard';

export default function Shop() {
  return (
    <div className="flex flex-row gap-2  m-4">
      <ProductCard />
      <ProductCard />
    </div>
  );
}
