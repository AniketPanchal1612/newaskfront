import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { ClearErrors, getProductDetail, newProduct, updateProduct } from '../../actions/productAction';
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../constants/ProductConstant';
import MetaData from '../layout/MetaData';
import SideBar from './SideBar';

const UpdateProduct = ({match,history}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [material, setMaterial] = useState('');
    const[dimensions, setDimensions] = useState('');
    const[warrenty,setWarrenty] = useState('');
    const[color,setColor]=useState('');
    const [storage, setStorage] = useState('');
    const [images, setImages] = useState([]);

    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        'Select Category','Sofas','Bookcases and shelves','Dining Tables','Shoes Racks', 'Chairs', 'Single Beds','Folding ', 'Double Beds', 'Study Tables', 'TV & Media Units', 'Kitchen & Decor', 'Dining Sets', 'Wardrobes', 'Outdoors'
    ]

    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product)

    const productId = match.params.id;

    
    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetail(productId))
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category)
            setSeller(product.seller)
            setStock(product.stock)
            setOldImages(product.images)
            setWarrenty(product.warrenty)
            setColor(product.color)
            setStorage(product.storage)
            setDimensions(product.dimensions)
            setMaterial(product.material)
        }

        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(ClearErrors())
        }

        if (isUpdated) {
            history.push('/admin/products');
            alert.success('Product updated successfully');
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, product, productId])
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("object")

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        formData.set('warrenty',warrenty)
        formData.set('storage', storage)
        formData.set('color', color)
        formData.set('dimensions', dimensions)
        formData.set('material', material)

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProduct(product._id, formData))
    }
    const onChange = e => {
        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })

    }

  return (
    <Fragment>
            <MetaData title={'Update Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="material_field">Material</label>
                                    <input
                                        type="text"
                                        id="material_field"
                                        className="form-control"
                                        value={material}
                                        onChange={(e) => setMaterial(e.target.value)}
                                        required

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="storage_field">Storage</label>
                                    <input
                                        type="text"
                                        id="storage_field"
                                        className="form-control"
                                        value={storage}
                                        onChange={(e) => setStorage(e.target.value)}
                                        required

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="warrenty_field">Warrenty</label>
                                    <input
                                        type="text"
                                        id="warrenty_field"
                                        className="form-control"
                                        value={warrenty}
                                        onChange={(e) => setWarrenty(e.target.value)}
                                        required

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dimensions_field">Dimensions</label>
                                    <input
                                        type="text"
                                        id="dimensions_field"
                                        className="form-control"
                                        value={dimensions}
                                        onChange={(e) => setDimensions(e.target.value)}
                                        required

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="color_field">Color</label>
                                    <input
                                        type="text"
                                        id="color_field"
                                        className="form-control"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        required

                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            multiple
                                            onChange={onChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                    {oldImages && oldImages.map(img=>(
                                        <img key={img} className='mt-3 mr-2' style={{width:'60px'}} src={img.url} alt={img.url}  />
                                    ))}
                                    {imagesPreview.map(img => (

                                        <img className='mt-3 mr-2' style={{width:'60px'}} src={img} key={img} alt="Image" />

                                    ))}
                                    x
                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                                </button>

                            </form>
                        </div>

                    </Fragment>
                </div>
            </div>

        </Fragment>
  )
}

export default UpdateProduct
