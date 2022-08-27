const getMenuFrontEnd = ( role ) => {
    menu = [
        {
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'Progresos', url: 'progress' },
                { titulo: 'Graficas', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'RxJs', url: 'rxjs' }
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: 'usuarios' },
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Médicos', url: 'medicos' },
            ]
        }
    ];

    if( role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd    
}