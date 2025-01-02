import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk(
    "/products/addnewproducts",
    async (formData) => {
        const result = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/admin/products/add`, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return result?.data;
    });


export const fetchAllProduct = createAsyncThunk(
    "/products/fetchAllproducts",
    async () => {
        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/products/get`,
        );

        return result?.data;
    });


export const editProduct = createAsyncThunk("/products/editproduct",
    async ({id, formData}) => {
        const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`, 
            formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return result?.data;
    });


export const deleteProduct = createAsyncThunk("/products/deleteproduct",
    async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`, 
            );

        return result?.data;
    });

const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProduct.pending, (state)=>{
            state.isLoading = true;

        }).addCase(fetchAllProduct.fulfilled, (state,action)=>{
            
            

            state.isLoading = false;
            state.productList = action.payload.data;
        
        // eslint-disable-next-line no-unused-vars
        }).addCase(fetchAllProduct.rejected, (state,action)=>{
            
            state.isLoading = false;
            state.productList = [];
        })
    },
});


export default AdminProductsSlice.reducer;