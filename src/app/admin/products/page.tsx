"use client";
export default function ProductPage() {
  return (
    <div className="prose mt-4 max-w-none overflow-x-auto">
      <div className="flex justify-evenly">
        <h1 className="mb-0">Products</h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => (window.location.href = "/admin/products/new")}
        >
          Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse">
          {/* head */}
          <thead>
            <tr className="bg-gray-100">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Stock </th>
              <th>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="">{/* <Image /> */}</div>
                  <div>
                    <span>Product Name</span>
                  </div>
                </div>
              </td>
              <td>$100</td>
              <td>Product Description</td>
              <td></td>
              <td>
                <button className="btn btn-primary btn-sm">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
