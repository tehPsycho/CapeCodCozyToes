const imageUrl = (name) => new URL(`../../images/${name}`, import.meta.url).href

export const galleryItems = [
  { id: 'nursery-set', title: 'Nursery Basket, Blanket + Bunny', category: 'Nursery', image: imageUrl('nursery set basket blanket bunny.jpg') },
  { id: 'turtle-group', title: 'Coastal Turtle Plush Friends', category: 'Animals', image: imageUrl('turtles.jpg') },
  { id: 'chenille-blanket', title: 'Chunky Chenille Blanket', category: 'Blankets', image: imageUrl('blanket.jpg') },
  { id: 'chicken-plushies', title: 'Farmhouse Chicken Plushies', category: 'Animals', image: imageUrl('chickens.jpg') },
  { id: 'single-turtle', title: 'Seafoam Turtle Plush', category: 'Animals', image: imageUrl('turtle.jpg') },
  { id: 'american-flag', title: 'American Flag Blanket', category: 'Blankets', image: imageUrl('American flag.jpg') },
  { id: 'flower-scrunchie', title: 'Flower + Ballerina Scrunchie', category: 'Scrunchies', image: imageUrl('flower and scrunchie.jpg') },
  { id: 'boy-bunny', title: 'Bunny Keepsake Moment', category: 'Nursery', image: imageUrl('boy and bunny.jpg') },
]

export const galleryFilters = ['All', 'Animals', 'Blankets', 'Nursery', 'Scrunchies', 'Other']
