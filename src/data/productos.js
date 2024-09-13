export default {
    riesgo_test: [
        {
            id: 'P001',
            title: 'Ayuda financiera',
            items: [{
                id: 'P001I001',
                icon: 'finance',
                description: 'Financiamiento para consolidado de deudas',
            },
            {
                id: 'P001I002',
                icon: 'card-account-phone',
                description: 'Contacto para un asesor financiero',
            }],
            message_no_products: {
                icon: 'alert-circle',
                description: 'No tienes productos aquí',
            }
        },
        {
            id: 'P002',
            title: 'Apertura de cuenta',
            items: [{
                id: 'P002I001',
                icon: 'account-cash',
                description: 'Puedes abrir una cuenta de ahorros'
            }],
            message_no_products: {
                icon: 'alert-circle',
                description: 'No tienes productos aquí',
            }
        },
        {
            id: 'P003',
            title: 'Crédito personal',
            items: [{
                id: 'P003I001',
                icon: 'cash',
                description: 'Crédito personal hasta $2,000.00'
            }],
            message_no_products: {
                icon: 'alert-circle',
                description: 'No tienes productos aquí',
            }
        }
    ],
    riesgo_default: [
        {
            id: 'P000',
            title: 'No tienes productos',
            items: [{
                id: 'P000I001',
                icon: 'alert-circle',
                description: 'No has ingresado tus ingresos y egresos',
            }],
            message_no_products: { }
        }
    ],
    riesgo_extremo: [
        {
            id: 'P001',
            title: 'Ayuda financiera',
            items: [{
                id: 'P001I001',
                icon: 'finance',
                description: 'Financiamiento para consolidado de deudas',
            },
            {
                id: 'P001I002',
                icon: 'card-account-phone',
                description: 'Contacto para un asesor financiero',
            }],
            message_no_products: {
                icon: 'alert-circle',
                description: 'No tienes productos aquí',
            }
        }
    ],
    riesgo_alto: [
        {
            id: 'P002',
            title: 'Apertura de cuenta',
            items: [{
                id: 'P002I001',
                icon: 'account-cash',
                description: 'Puedes abrir una cuenta de ahorros'
            }],
            message_no_products: {
                icon: 'alert-circle',
                description: 'No tienes productos aquí',
            }
        }
    ],
    riesgo_suficiente: [{
        id: 'P002',
        title: 'Apertura de cuenta',
        items: [{
            id: 'P002I001',
            icon: 'account-cash',
            description: 'Puedes abrir una cuenta de ahorros'
        }],
        message_no_products: {
            icon: 'alert-circle',
            description: 'No tienes productos aquí',
        }
    },
    {
        id: 'P003',
        title: 'Crédito personal',
        items: [{
            id: 'P003I001',
            icon: 'cash',
            description: 'Crédito personal hasta $2,000.00'
        }],
        message_no_products: {
            icon: 'alert-circle',
            description: 'No tienes productos aquí',
        }
    }],
    riesgo_bueno: [{
        id: 'P002',
        title: 'Apertura de cuenta',
        items: [{
            id: 'P002I001',
            icon: 'account-cash',
            description: 'Puedes abrir una cuenta de ahorros'
        }],
        message_no_products: {
            icon: 'alert-circle',
            description: 'No tienes productos aquí',
        }
    },
    {
        id: 'P003',
        title: 'Crédito personal',
        items: [{
            id: 'P003I001',
            icon: 'cash',
            description: 'Crédito personal hasta $8,000.00'
        }],
        message_no_products: {
            icon: 'alert-circle',
            description: 'No tienes productos aquí',
        }
    }],
    riesgo_muy_bueno: [{
        id: 'P002',
        title: 'Apertura de cuenta',
        items: [{
            id: 'P002I001',
            icon: 'account-cash',
            description: 'Puedes abrir una cuenta de ahorros'
        }],
        message_no_products: {
            icon: 'alert-circle',
            description: 'No tienes productos aquí',
        }
    },
    {
        id: 'P003',
        title: 'Crédito personal',
        items: [{
            id: 'P003I001',
            icon: 'cash',
            description: 'Crédito personal hasta $25,000.00'
        }],
        message_no_products: {
            icon: 'alert-circle',
            description: 'No tienes productos aquí',
        }
    }],
    riesgo_excelente: [{
        id: 'P002',
        title: 'Apertura de cuenta',
        items: [{
            id: 'P002I001',
            icon: 'account-cash',
            description: 'Puedes abrir una cuenta de ahorros'
        }],
        message_no_products: {
            icon: 'alert-circle',
            description: 'No tienes productos aquí',
        }
    },
    {
        id: 'P003',
        title: 'Crédito personal',
        items: [{
            id: 'P003I001',
            icon: 'cash',
            description: 'Crédito personal hasta $50,000.00'
        }],
        message_no_products: {
            icon: 'alert-circle',
            description: 'No tienes productos aquí',
        }
    }],
}