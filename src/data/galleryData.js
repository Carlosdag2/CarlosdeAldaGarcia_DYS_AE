// Datos de las imágenes de la galería
export const galleryImages = [
    {
        id: 1,
        src: "https://media.somosindustria.com/media/img/socials/1200_socials_economia_circular_06_21.jpg",
        title: "Reciclaje",
        icon: "bi-recycle",
        iconColor: "text-success",
        description: "La gestión responsable de residuos es fundamental para un futuro sostenible.",
        category: "sostenibilidad",
        badgeClass: "bg-success"
    },
    {
        id: 2,
        src: "https://mexico.unir.net/wp-content/uploads/sites/6/2025/11/Energia-eolica-el-viento-como-generador-de-electricidad.jpg",
        title: "Energía Eólica",
        icon: "bi-wind",
        iconColor: "text-info",
        description: "Las energías renovables son el camino hacia la independencia energética limpia.",
        category: "sostenibilidad",
        badgeClass: "bg-success"
    },
    {
        id: 3,
        src: "https://miro.medium.com/1*vxjAHkrXbGG6gOiPZgjeZA.jpeg",
        title: "Tecnología",
        icon: "bi-cpu",
        iconColor: "text-primary",
        description: "La transformación digital impulsa la innovación y eficiencia empresarial.",
        category: "digitalizacion",
        badgeClass: "bg-primary"
    },
    {
        id: 4,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeP5KAWp5okpxCZzzoZm1tbSR9UdOBfoJYWw&s",
        title: "Big Data",
        icon: "bi-bar-chart",
        iconColor: "text-primary",
        description: "El análisis de datos permite tomar decisiones informadas y sostenibles.",
        category: "digitalizacion",
        badgeClass: "bg-primary"
    },
    {
        id: 5,
        src: "https://www.repsol.com/content/dam/repsol-corporate/es/energia-e-innovacion/Mantenimiento-placas-solares.jpg",
        title: "Energía Solar",
        icon: "bi-sun",
        iconColor: "text-warning",
        description: "La energía solar fotovoltaica es una fuente limpia e inagotable.",
        category: "energia",
        badgeClass: "bg-warning text-dark"
    },
    {
        id: 6,
        src: "https://www.factorenergia.com/wp-content/uploads/2018/08/energias-renovables.jpg",
        title: "Renovables",
        icon: "bi-lightning",
        iconColor: "text-warning",
        description: "La transición energética es clave para combatir el cambio climático.",
        category: "energia",
        badgeClass: "bg-warning text-dark"
    },
    {
        id: 7,
        src: "https://ecosistemas.ovacen.com/wp-content/uploads/2018/01/bosque.jpg",
        title: "Bosques",
        icon: "bi-tree",
        iconColor: "text-success",
        description: "Los bosques son los pulmones del planeta y hogar de biodiversidad.",
        category: "naturaleza",
        badgeClass: "bg-success"
    },
    {
        id: 8,
        src: "https://www.fundacionaquae.org/wp-content/uploads/2021/05/proteger-ecosistemas-e1622287266551-1024x586.jpg",
        title: "Ecosistemas",
        icon: "bi-globe-americas",
        iconColor: "text-info",
        description: "Proteger los ecosistemas es proteger nuestra propia supervivencia.",
        category: "naturaleza",
        badgeClass: "bg-success"
    },
    {
        id: 9,
        src: "https://somosiberoamerica.org/wp-content/uploads/2023/05/N1_Crecimiento-verde_DESTACADA.png",
        title: "Crecimiento Verde",
        icon: "bi-flower2",
        iconColor: "text-success",
        description: "El desarrollo sostenible equilibra progreso económico y cuidado ambiental.",
        category: "sostenibilidad",
        badgeClass: "bg-success"
    },
    {
        id: 10,
        src: "https://www.enel.com/content/dam/enel-com/immagini/retail/our-offer-smart-city-tablet-min.jpg",
        title: "Smart Cities",
        icon: "bi-building",
        iconColor: "text-primary",
        description: "Las ciudades inteligentes optimizan recursos mediante tecnología.",
        category: "digitalizacion",
        badgeClass: "bg-primary"
    },
    {
        id: 11,
        src: "https://www.factorenergia.com/wp-content/uploads/2021/02/energia-hidraulica.jpg",
        title: "Energía Hidráulica",
        icon: "bi-droplet",
        iconColor: "text-info",
        description: "El agua es fuente de vida y de energía limpia renovable.",
        category: "energia",
        badgeClass: "bg-warning text-dark"
    },
    {
        id: 12,
        src: "https://www.fundacionaquae.org/wp-content/uploads/2014/08/oceanos2.jpg",
        title: "Océanos",
        icon: "bi-water",
        iconColor: "text-info",
        description: "Mantener los océanos limpios es vital para la vida marina y humana.",
        category: "naturaleza",
        badgeClass: "bg-success"
    }
];

// Categorías de filtrado
export const galleryCategories = [
    { id: "all", label: "Todas", icon: "bi-grid-3x3-gap" },
    { id: "sostenibilidad", label: "Sostenibilidad", icon: "bi-tree" },
    { id: "digitalizacion", label: "Digitalización", icon: "bi-cpu" },
    { id: "energia", label: "Energía", icon: "bi-lightning" },
    { id: "naturaleza", label: "Naturaleza", icon: "bi-flower1" }
];

// Mapeo de categorías a nombres para badges
export const categoryNames = {
    sostenibilidad: "Sostenibilidad",
    digitalizacion: "Digitalización",
    energia: "Energía",
    naturaleza: "Naturaleza"
};
