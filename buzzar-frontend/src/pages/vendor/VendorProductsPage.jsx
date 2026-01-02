import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const VendorProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axiosClient.get("/api/vendor/products");
                setProducts(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    //handleDelete
    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await axiosClient.delete(`/api/products/${productId}`);
            setProducts(products.filter((p) => p._id !== productId));
        } catch (err) {
            console.error(err);
            alert("Failed to delete product.");
        }
    };
    //handleDelete Ends


    if (loading) return <p>Loading products...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Vendor Products</h2>

            <Link to="/vendor/products/new">
                <button>Add Product</button>
            </Link>

            <table style={{ width: "100%", marginTop: "1rem" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>${p.price}</td>
                            <td>{p.stock}</td>

                            <td>
                                <Link
                                    to={`/vendor/products/${p._id}/edit`}
                                    style={{ marginRight: "0.5rem" }}
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDelete(p._id)}
                                    style={{ color: "red" }}
                                >
                                    Delete
                                </button>
                            </td>

                            {/* <td>
                <Link to={`/vendor/products/${p._id}/edit`}>
                  Edit
                </Link>
              </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VendorProductsPage;
