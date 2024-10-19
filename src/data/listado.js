export default {
    riesgo_global: [
        {
            id: 'P000',
            title: 'No tienes productos',
            items: [{
                id: 'P000I001',
                icon: 'alert-circle',
                description: 'No has ingresado tus ingresos y egresos',
            }],
            message_no_products: { }
        },
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
        },
        {
            id: 'P004',
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
        },
        {
            id: 'P005',
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
        },
        {
            id: 'P006',
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
        },
        {
            id: 'C001',
            title: 'Clásica',
            description: 'Tarjeta de crédito clásica',
            image: require('../../assets/img-cards/clasica.png'),
        },
        {
            id: 'C002',
            title: 'Oro',
            description: 'Tarjeta de crédito oro',
            image: require('../../assets/img-cards/oro.png'),
        },
        {
            id: 'C003',
            title: 'Platinum',
            description: 'Tarjeta de crédito platinum',
            image: require('../../assets/img-cards/platinum.png'),
        },
        {
            id: 'C004',
            title: 'Black',
            description: 'Tarjeta de crédito black',
            image: require('../../assets/img-cards/black.png'),
        },
    ],
}