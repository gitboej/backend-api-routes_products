import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function Products() {
  const { data, error, isLoading } = useSWR("/api/products", fetcher);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <ul>
      {data.map(({ id, name, description, price, currency, category }) => (
        <li key={id}>
          <p>
            {name}: {description}
          </p>
          <p>
            {price},- {currency}
          </p>
          <p>Category: {category}</p>
        </li>
      ))}
    </ul>
  );
}
