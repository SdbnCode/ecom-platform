"use client";
export default function AddProduct() {
  return (
    <div className="prose mt-4 flex max-w-none justify-center">
      <form className="form-control w-full max-w-md gap-4">
        <h1>Add Product</h1>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name:</span>
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            className="input input-bordered input-primary w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Price:</span>
          </label>
          <input
            type="number"
            placeholder="0.00"
            name="Price"
            step="0.01"
            className="input input-bordered input-primary w-full pl-8"
            min="0"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description:</span>
          </label>
          <textarea
            placeholder="Enter product description"
            name="Description"
            className="textarea textarea-bordered textarea-primary w-full"
            rows={4}
            required
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Image:</span>
          </label>
          <input
            type="file"
            name="Image"
            className="file-input file-input-bordered file-input-primary w-full"
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-md mt-4 w-full">
          Add Product
        </button>
      </form>
    </div>
  );
}
