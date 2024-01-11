export default function CreateProduct() {
  return (
    <main className="p-3">
      <h1 className=" text-3xl font-semibold text-center my-7">
        Create Product
      </h1>
      <div className="flex justify-center">
        <form className=" flex flex-col m-5 w-auto  lg: :w-2/4">
          <input
            className="p-2 mb-1 border bg-white rounded"
            type="file"
            accept="image/*"
          />
          <input
            type="text"
            placeholder="title"
            className=" border p-3 rounded-lg mb-1"
            id="title"
            maxLength="62"
            minLength="10"
            required
          />

          <textarea
            type="text"
            placeholder="Description"
            className=" border p-3 rounded-lg mb-1"
            id="description"
            required
          />
          <input
            type="number"
            placeholder="price"
            className=" border p-3 rounded-lg mb-1"
            id="price"
            required
          />
          <input
            type="number"
            placeholder="discount"
            className=" border p-3 rounded-lg mb-1"
            max="100"
            min="0"
            id="discount"
          />
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-75">
            Create Product
          </button>
        </form>
      </div>
    </main>
  );
}
