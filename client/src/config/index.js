export const registerFormControls = [
    {
        name : 'userName',
        label : 'User Name',
        placeholder : 'Enter your user name',
        componentType : 'input',
        type : 'text',
    },
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter your email',
        componentType : 'input',
        type : 'email',
    },
    {
        name : 'password',
        label : 'password',
        placeholder : 'Enter your password',
        componentType : 'input',
        type : 'password',
    },
]

export const loginFormControls = [
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter your email',
        componentType : 'input',
        type : 'email',
    },
    {
        name : 'password',
        label : 'password',
        placeholder : 'Enter your password',
        componentType : 'input',
        type : 'password',
    },
]


export const addProductFormElement = [
    {
        label : "Title",
        name : "title",
        componentType : "input",
        type : "text",
        placeholder: "Enter products title",
    },
    {
        label : "Description",
        name : "description",
        componentType : "textarea",
        placeholder: "Enter products description",
    },
    {
        label : "Category",
        name : "category",
        componentType : "select",
        options: [
            { id: "moonlamp", label : "MoonLamp"},
            { id: "walldecor", label : "WallDecor"},
            { id: "keychain", label : "Keychain"},
            { id: "flipname", label : "Flipname"},
            { id: "nameplate", label : "NamePlate"},
            { id: "numberplate", label : "NumberPlate"},   
        ]
    },
    {

        label : "Price",
        name : "price",
        componentType : "input",
        type: "number",
        placeholder: "Enter Price Products",
    },
    {

        label : "Sale Price",
        name : "salePrice",
        componentType : "input",
        type: "number",
        placeholder: "Enter Price Products (optional)",
    },
    {

        label : "Total Stock",
        name : "totalStock",
        componentType : "input",
        type: "number",
        placeholder: "Enter Total Stock",
    },

];

export const shoppingViewHeaderMenuItems = [
    {
        id: "home",
        label : "Home",
        path : "/shop/home"
    },
    {
        id: "products",
        label : "All Products",
        path : "/shop/listing"
    },
    {
        id: "moonlamp",
        label : "MoonLamp",
        path : "/shop/listing"
    },
    {
        id: "keychain",
        label : "Keychain",
        path : "/shop/listing"
    },
    {
        id: "flipname",
        label : "FlipName",
        path : "/shop/listing"
    },
    {
        id: "walldecor",
        label : "WallDecor",
        path : "/shop/listing"
    },
    // {
    //     id: "3dmodel",
    //     label : "3DModel",
    //     path : "/shop/listing"
    // },
    {
        id: "numberplate",
        label : "NumberPlate",
        path : "/shop/listing"
    },
    {
        id: "nameplate",
        label : "NamePlate",
        path : "/shop/listing"
    },
    {
        id: "search",
        label : "Search",
        path : "/shop/search"
    }
]

export const categoryOptionsMap = {
    moonlamp : "MoonLamp",
    walldecor : "WallDecor",
    keychain : "Keychain",
    filpname : "flipName",
    nameplate : "NamePlate",
    numberplate : "NumberPlate"

}

export const filterOptions = {
    
        category:[
            { id: "moonlamp", label : "MoonLamp"},
            { id: "walldecor", label : "WallDecor"},
            { id: "keychain", label : "Keychain"},
            { id: "flipname", label : "Flipname"},
            { id: "nameplate", label : "NamePlate"},
            { id: "numberplate", label : "NumberPlate"},
        ]
    
};


export const sortOptions = [
    {id : "price-lowtohigh", label : "Price: Low to high"},
    {id : "price-hightolow", label : "Price: High to Low"},
    {id : "title-atoz", label : "Title : A to Z"},
    {id : "title-ztoa", label : "Title : z to A"},
];



export const addressFromControls = [
    {
        label : "Full Name",
        name : "fullName",
        componentType : "input",
        type : "text",
        placeholder : "Enter your Full Name",
    },
    {
        label : "Address",
        name : "address",
        componentType : "input",
        type : "text",
        placeholder : "Enter your Address",
    },
    {
        label : "City",
        name : "city",
        componentType : "input",
        type : "text",
        placeholder : "Enter your City",
    },
    {
        label : "State",
        name : "state",
        componentType : "input",
        type : "text",
        placeholder : "Enter your State",
    },
    
    {
        label : "Pincode",
        name : "pincode",
        componentType : "input",
        type : "text",
        placeholder : "Enter your Pincode",
    },
    {
        label : "Phone",
        name : "phone",
        componentType : "input",
        type : "text",
        placeholder : "Enter your Phone number",
    },
    {
        label : "Notes",
        name : "notes",
        componentType : "textarea",
        placeholder : "Enter your Address",
    },
]


  



