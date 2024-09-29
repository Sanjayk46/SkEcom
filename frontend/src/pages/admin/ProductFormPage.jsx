// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Button, Form } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import {
//   useCreateProductMutation,
//   useGetProductDetailsQuery,
//   useUpdateProductMutation,
//   useUploadProductImageMutation
// } from '../../slices/productsApiSlice';
// import FormContainer from '../../components/FormContainer';
// import Loader from '../../components/Loader';
// import Message from '../../components/Message';
// import Meta from '../../components/Meta';

// const ProductFormPage = () => {
//   const { id: productId } = useParams();

//   const isUpdateMode = !!productId;

//   const [name, setName] = useState('');
//   const [image, setImage] = useState('');
//   const [description, setDescription] = useState('');
//   const [brand, setBrand] = useState('');
//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState(0);
//   const [countInStock, setCountInStock] = useState(0);

//   const getProductQueryResult = useGetProductDetailsQuery(productId);

//   const {
//     data: product,
//     isLoading,
//     error
//   } = isUpdateMode
//     ? getProductQueryResult
//     : { data: null, isLoading: false, error: null };

//   const [createProduct, { isLoading: isCreateProductLoading }] =
//     useCreateProductMutation();
//   const [updateProduct, { isLoading: isUpdateProductLoading }] =
//     useUpdateProductMutation();
//   const [uploadProductImage, { isLoading: isUploadImageLoading }] =
//     useUploadProductImageMutation();

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isUpdateMode && product) {
//       setName(product.name);
//       setImage(product.image);
//       setDescription(product.description);
//       setBrand(product.brand);
//       setCategory(product.category);
//       setPrice(product.price);
//       setCountInStock(product.countInStock);
//     }
//   }, [isUpdateMode, product]);

//   const uploadFileHandler = async e => {
//     const formData = new FormData();
//     formData.append('image', e.target.files[0]);
//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       setImage(res.imageUrl);
//       toast.success(res.message);
//     } catch (error) {
//       toast.error(error?.data?.message || error.error);
//       console.log(error);
//     }
//   };

//   const submitHandler = async e => {
//     e.preventDefault();
//     try {
//       const productData = {
//         name,
//         image,
//         description,
//         brand,
//         category,
//         price,
//         countInStock
//       };
//       if (isUpdateMode) {
//         const { data } = await updateProduct({
//           productId,
//           ...productData
//         });
//         toast.success(data.message);
//       } else {
//         const { data } = await createProduct(productData);

//         toast.success(data.message);
//       }
//       navigate('/admin/product-list');
//     } catch (error) {
//       toast.error(error?.data?.message || error.error);
//     }
//   };

//   return (
//     <>
//     <Meta title={'Product Form'} />
//       <Link to='/admin/product-list' className='btn btn-light my-3'>
//         Go Back
//       </Link>
//       {(isUpdateProductLoading ||
//         isCreateProductLoading ||
//         isUploadImageLoading) && <Loader />}
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant='danger'>
//           {error?.data?.message || error.error}
//         </Message>
//       ) : (
//         <FormContainer>
//           <Meta title={'Product Form'} />
//           <h1>{isUpdateMode ? 'Update Product' : 'Create Product'}</h1>
//           <Form onSubmit={submitHandler}>
//             <Form.Group controlId='name'>
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type='name'
//                 placeholder='Enter name'
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId='price'>
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type='number'
//                 placeholder='Enter price'
//                 value={price}
//                 onChange={e => setPrice(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId='image'>
//               <Form.Label>Image</Form.Label>
//               <Form.Control
//                 type='file'
//                 onChange={uploadFileHandler}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId='brand'>
//               <Form.Label>Brand</Form.Label>
//               <Form.Control
//                 type='text'
//                 placeholder='Enter brand'
//                 value={brand}
//                 onChange={e => setBrand(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId='countInStock'>
//               <Form.Label>Count In Stock</Form.Label>
//               <Form.Control
//                 type='number'
//                 placeholder='Enter countInStock'
//                 value={countInStock}
//                 onChange={e => setCountInStock(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId='category'>
//               <Form.Label>Category</Form.Label>
//               <Form.Control
//                 type='text'
//                 placeholder='Enter category'
//                 value={category}
//                 onChange={e => setCategory(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId='description'>
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as='textarea'
//                 rows={3}
//                 type='text'
//                 placeholder='Enter description'
//                 value={description}
//                 onChange={e => setDescription(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Button
//               type='submit'
//               variant='primary'
//               style={{ marginTop: '1rem' }}
//             >
//               {isUpdateMode ? 'Update Product' : 'Create Product'}
//             </Button>
//           </Form>
//         </FormContainer>
//       )}
//     </>
//   );
// };

// export default ProductFormPage;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation
} from '../../slices/productsApiSlice';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';

const ProductFormPage = () => {
  const { id: productId } = useParams();

  const isUpdateMode = !!productId;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [picPreview, setPicPreview] = useState(''); // Preview for Cloudinary upload
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const getProductQueryResult = useGetProductDetailsQuery(productId);

  const {
    data: product,
    isLoading,
    error
  } = isUpdateMode
    ? getProductQueryResult
    : { data: null, isLoading: false, error: null };

  const [createProduct, { isLoading: isCreateProductLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdateProductLoading }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdateMode && product) {
      setName(product.name);
      setImage(product.image);
      setPicPreview(product.image); // Set initial preview if editing
      setDescription(product.description);
      setBrand(product.brand);
      setCategory(product.category);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [isUpdateMode, product]);

  // Cloudinary image upload handler
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'chat-app'); // Replace with your Cloudinary upload preset
    formData.append('cloud_name', 'diwunv4ge'); // Replace with your Cloudinary cloud name

    try {
      // Use the Cloudinary API to upload the image
      const res = await fetch('https://api.cloudinary.com/v1_1/diwunv4ge/image/upload', {
        method: 'POST',
        body: formData,
        mode:'cors'
      });

      const data = await res.json();
      setImage(data.url); // Set the Cloudinary image URL for the product
      setPicPreview(URL.createObjectURL(file)); // Preview the uploaded image
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Image upload failed');
      console.error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock
    };

    try {
      if (isUpdateMode) {
        const { data } = await updateProduct({ productId, ...productData });
        toast.success(data.message || 'Product updated successfully');
      } else {
        const { data } = await createProduct(productData);
        toast.success(data.message || 'Product created successfully');
      }
      navigate('/admin/product-list');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <Meta title={isUpdateMode ? 'Update Product' : 'Create Product'} />
      <Link to='/admin/product-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      {(isUpdateProductLoading || isCreateProductLoading) && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.message}</Message>
      ) : (
        <FormContainer>
          <h1>{isUpdateMode ? 'Update Product' : 'Create Product'}</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='file'
                onChange={uploadFileHandler}
                accept='image/*'
              ></Form.Control>
              {picPreview && (
                <div className='mt-3'>
                  <img src={picPreview} alt='Uploaded Product' width='200' />
                </div>
              )}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
              disabled={isUpdateProductLoading || isCreateProductLoading}
            >
              {isUpdateMode ? 'Update Product' : 'Create Product'}
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductFormPage;
