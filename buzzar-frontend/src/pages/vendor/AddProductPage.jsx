import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const AddProductPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
    });

    // ✅ NEW: multiple image URLs
    const [images, setImages] = useState([""]);

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Image handlers
    const handleImageChange = (index, value) => {
        const updated = [...images];
        updated[index] = value;
        setImages(updated);
    };

    const addImageField = () => {
        setImages([...images, ""]);
    };

    const removeImageField = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post("/api/products", {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
                images: images.filter((url) => url.trim() !== ""), // ✅ important
            });
            navigate("/vendor/products");
        } catch (err) {
            console.error(err);
            setError("Failed to create product.");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Add Product</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Product Name"
                    onChange={handleChange}
                    required
                />
                <br />

                <input
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    onChange={handleChange}
                    required
                />
                <br />

                <input
                    name="stock"
                    type="number"
                    placeholder="Stock"
                    onChange={handleChange}
                    required
                />
                <br />

                <input
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                />
                <br />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                />
                <br />

                {/* ✅ Image URLs */}
                <h4>Product Images (URLs)</h4>
                {images.map((url, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder={`Image URL ${index + 1}`}
                            value={url}
                            onChange={(e) =>
                                handleImageChange(index, e.target.value)
                            }
                        />
                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeImageField(index)}
                            >
                                Remove
                            </button>
                        )}
                        <br />
                    </div>
                ))}

                <button type="button" onClick={addImageField}>
                    Add Image URL
                </button>

                <br /><br />

                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default AddProductPage;


















// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosClient from "../../api/axiosClient";

// const AddProductPage = () => {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         name: "",
//         price: "",
//         stock: "",
//         category: "",
//         description: "",
//     });

//     const [error, setError] = useState("");

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axiosClient.post("/api/products", {
//                 ...form,
//                 price: Number(form.price),
//                 stock: Number(form.stock),
//             });
//             navigate("/vendor/products");
//         } catch (err) {
//             console.error(err);
//             setError("Failed to create product.");
//         }
//     };

//     return (
//         <div style={{ padding: "2rem" }}>
//             <h2>Add Product</h2>

//             {error && <p style={{ color: "red" }}>{error}</p>}

//             <form onSubmit={handleSubmit}>
//                 <input
//                     name="name"
//                     placeholder="Product Name"
//                     onChange={handleChange}
//                     required
//                 />
//                 <br />

//                 <input
//                     name="price"
//                     type="number"
//                     step="0.01"
//                     placeholder="Price"
//                     onChange={handleChange}
//                     required
//                 />

//                  <br />



//                 <input
//                     name="stock"
//                     type="number"
//                     placeholder="Stock"
//                     onChange={handleChange}
//                     required
//                 />
//                 <br />

//                 <input
//                     name="category"
//                     placeholder="Category"
//                     onChange={handleChange}
//                 />
//                 <br />

//                 <textarea
//                     name="description"
//                     placeholder="Description"
//                     onChange={handleChange}
//                 />
//                 <br />

//                 <button type="submit">Create Product</button>
//             </form>
//         </div>
//     );
// };

// export default AddProductPage;
