export const PRODUCT_CATEGORIES = [
  {
    label: 'Vehicles',
    value: 'vehicles',
    img: '/sedan.png',
    featured: [
      {
        name: 'Used Cars',
        href: '/listings?category=vehicles&type=used&vehicle_type=car',
        imageSrc: 'https://placekitten.com/300/203', // Replace with actual image URL
      },
      {
        name: 'Motorcycles',
        href: '/listings?category=vehicles&type=all&vehicle_type=motorcycle',
        imageSrc: 'https://placekitten.com/300/204', // Replace with actual image URL
      },
      {
        name: 'Boats',
        href: '/listings?category=vehicles&type=all&vehicle_type=boat',
        imageSrc: 'https://placekitten.com/300/205', // Replace with actual image URL
      },
    ],
  },
  {
    label: 'Products',
    value: 'Products',
    img: '/cassette.png',
    featured: [
      {
        name: 'Used Cars',
        href: '/listings?category=vehicles&type=used&vehicle_type=car',
        imageSrc: 'https://placekitten.com/300/203', // Replace with actual image URL
      },
      {
        name: 'Motorcycles',
        href: '/listings?category=vehicles&type=all&vehicle_type=motorcycle',
        imageSrc: 'https://placekitten.com/300/204', // Replace with actual image URL
      },
      {
        name: 'Boats',
        href: '/listings?category=vehicles&type=all&vehicle_type=boat',
        imageSrc: 'https://placekitten.com/300/205', // Replace with actual image URL
      },
    ],
  },
    {
      label: 'Apartments',
      value: 'apartments',
      img: '/town.png',
      featured: [
        {
          name: 'Apartments for Rent',
          href: '/listings?category=real_estate&type=rent&property_type=apartment',
          imageSrc: 'https://placekitten.com/300/200', // Replace with actual image URL
        },
        {
          name: 'Villas for Sale',
          href: '/listings?category=real_estate&type=sale&property_type=villa',
          imageSrc: 'https://placekitten.com/300/201', // Replace with actual image URL
        },
        {
          name: 'Commercial Properties',
          href: '/listings?category=real_estate&type=rent&property_type=commercial',
          imageSrc: 'https://placekitten.com/300/202', // Replace with actual image URL
        },
      ],
    },
    {
      label: 'Shops',
      value: 'Shops',
      img: '/store.png',
      featured: [
        {
          name: 'Full-time Positions',
          href: '/listings?category=jobs&type=full-time',
          imageSrc: 'https://placekitten.com/300/206', // Replace with actual image URL
        },
        {
          name: 'Part-time Positions',
          href: '/listings?category=jobs&type=part-time',
          imageSrc: 'https://placekitten.com/300/207', // Replace with actual image URL
        },
        {
          name: 'Remote Work',
          href: '/listings?category=jobs&type=remote',
          imageSrc: 'https://placekitten.com/300/208', // Replace with actual image URL
        },
      ],
    },
    
    // Add more categories as needed...
  ];
  