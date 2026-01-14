import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [images, setImages] = useState([]); // ✅ NEW
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosClient.get(`/api/products/${id}`);
        setForm(res.data);
        setImages(res.data.images || []); // ✅ preload images
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <p style={{ color: "red", padding: "2rem" }}>{error}</p>;
  }

  if (!form) {
    return <p style={{ padding: "2rem" }}>Loading product...</p>;
  }

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
      await axiosClient.put(`/api/products/${id}`, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        images: images.filter((url) => url.trim() !== ""), // ✅ important
      });
      navigate("/vendor/products");
    } catch (err) {
      console.error(err);
      setError("Failed to update product.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />

        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
        />
        <br />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <br />

        <input
          name="category"
          value={form.category || ""}
          onChange={handleChange}
        />
        <br />

        <textarea
          name="description"
          value={form.description || ""}
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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProductPage;






// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosClient from "../../api/axiosClient";

// const EditProductPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axiosClient.get(`/api/products/${id}`);
//         setForm(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load product.");
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (error) {
//     return <p style={{ color: "red", padding: "2rem" }}>{error}</p>;
//   }

//   if (!form) {
//     return <p style={{ padding: "2rem" }}>Loading product...</p>;
//   }

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosClient.put(`/api/products/${id}`, {
//         ...form,
//         price: Number(form.price),
//         stock: Number(form.stock),
//       });
//       navigate("/vendor/products");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update product.");
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Edit Product</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <input
//           name="price"
//           type="number"
//           step="0.01"
//           value={form.price}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <input
//           name="stock"
//           type="number"
//           value={form.stock}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <input
//           name="category"
//           value={form.category || ""}
//           onChange={handleChange}
//         />
//         <br />

//         <textarea
//           name="description"
//           value={form.description || ""}
//           onChange={handleChange}
//         />
//         <br />

//         <button type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default EditProductPage;
