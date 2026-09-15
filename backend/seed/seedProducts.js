const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

dotenv.config();

const products = [
  { name: 'Windbreaker Jacket', subCategory: 'Shirts', category: 'Casual', gender: 'Women', price: 340, originalPrice: 420, rating: 4.5, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600', isTopSelling: true, isNewArrival: true, discount: 19 },
  { name: 'Knitted Crewneck Sweater', subCategory: 'Hoodie', category: 'Formal', gender: 'Men', price: 280, rating: 4.8, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600', isNewArrival: true },
  { name: 'Padded Vest Gilet', subCategory: 'Shirts', category: 'Gym', gender: 'Men', price: 230, rating: 4.4, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', isNewArrival: true },
  { name: 'Streetwear Zip-Up Hoodie', subCategory: 'Hoodie', category: 'Party', gender: 'Men', price: 290, originalPrice: 350, rating: 4.5, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600', isNewArrival: true, discount: 17 },
  { name: 'Printed Hawaiian Shirt', subCategory: 'Shirts', category: 'Party', gender: 'Men', price: 135, originalPrice: 170, rating: 4.3, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600', discount: 21 },
  { name: 'Turtleneck Thermal Top', subCategory: 'T-Shirts', category: 'Formal', gender: 'Women', price: 165, originalPrice: 200, rating: 4.6, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600', discount: 18 },
  { name: 'Sleeveless Gym Tank Top', subCategory: 'T-Shirts', category: 'Gym', gender: 'Men', price: 75, rating: 4.0, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600' },
  { name: 'Heavyweight Fleece Sweatpants', subCategory: 'Jeans', category: 'Gym', gender: 'Men', price: 210, rating: 4.7, image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600' },
  { name: 'Classic Denim Jacket', subCategory: 'Shirts', category: 'Casual', gender: 'Men', price: 320, originalPrice: 400, rating: 4.8, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600', isTopSelling: true, discount: 20 },
  { name: 'Cargo Jogger Pants', subCategory: 'Jeans', category: 'Gym', gender: 'Men', price: 220, rating: 4.4, image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=600' },
  { name: 'Formal Oxford Shirt', subCategory: 'Shirts', category: 'Formal', gender: 'Men', price: 270, rating: 4.8, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600' },
  { name: 'Classic Wool Blazer', subCategory: 'Shirts', category: 'Formal', gender: 'Men', price: 590, originalPrice: 700, rating: 4.9, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600', isTopSelling: true, discount: 16 },
  { name: 'Relaxed Fit Cargo Shorts', subCategory: 'Shorts', category: 'Casual', gender: 'Men', price: 125, rating: 4.2, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600' },
  { name: 'Tie-Dye Casual T-shirt', subCategory: 'T-Shirts', category: 'Party', gender: 'Women', price: 115, originalPrice: 150, rating: 4.1, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600', discount: 23 },
  { name: 'Puffer Winter Jacket', subCategory: 'Shirts', category: 'Party', gender: 'Women', price: 480, originalPrice: 600, rating: 4.9, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600', discount: 20 },
  { name: 'Slim Fit Corduroy Shirt', subCategory: 'Shirts', category: 'Formal', gender: 'Men', price: 195, originalPrice: 250, rating: 4.4, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600', discount: 22 },
  { name: 'Wren Valvet Blazer Dress', subCategory: 'Shirts', category: 'Party', gender: 'Women', price: 395, originalPrice: 450, rating: 4.6, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', isTopSelling: true, isNewArrival: true, discount: 12 },
  { name: 'Branded A+ Copy T-Shirt', subCategory: 'Shirts', category: 'Party', gender: 'Men', price: 230, originalPrice: 399, rating: 4.8, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', isTopSelling: true, discount: 42 },
  { name: 'Skinny Fit Jeans', subCategory: 'Jeans', category: 'Casual', gender: 'Men', price: 240, originalPrice: 260, rating: 3.5, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600', isTopSelling: true, discount: 8 },
  { name: 'Casual Summer Dress', subCategory: 'Dress', category: 'Casual', gender: 'Women', price: 180, rating: 4.5, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', isNewArrival: true },
  { name: 'Sporty Track Pants', subCategory: 'Jeans', category: 'Gym', gender: 'Men', price: 130, rating: 4.3, image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600' },
  { name: 'Elegant Evening Gown', subCategory: 'Dress', category: 'Party', gender: 'Women', price: 550, originalPrice: 700, rating: 4.9, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600', discount: 21 },
  { name: 'Business Suit Blazer', subCategory: 'Shirts', category: 'Formal', gender: 'Men', price: 620, rating: 4.7, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600' },
  { name: 'Vintage Graphic Tee', subCategory: 'T-Shirts', category: 'Casual', gender: 'Men', price: 95, rating: 4.1, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600', isNewArrival: true },
  { name: 'Yoga Flex Leggings', subCategory: 'Jeans', category: 'Gym', gender: 'Women', price: 145, originalPrice: 180, rating: 4.6, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600', discount: 19 },
  { name: 'Floral Maxi Dress', subCategory: 'Dress', category: 'Party', gender: 'Women', price: 320, rating: 4.5, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', isNewArrival: true },
  { name: 'Premium Leather Boots', subCategory: 'Shoes', category: 'Casual', gender: 'Men', price: 380, originalPrice: 450, rating: 4.8, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600', discount: 16 }
];

const seed = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: 'admin', role: 'admin' });

    if (adminExists) {
      console.log('⏭️  Database already seeded — skipping everything to preserve your data.');
      console.log('    (To reset everything, drop the collections in MongoDB Atlas and run this again.)');
      process.exit(0);
    }

    console.log('🌱 First-time setup detected — seeding fresh data...\n');

    const hashedAdminPass = await bcrypt.hash('admin1', 10);
    await User.create({
      name: 'Administrator',
      email: 'admin',
      password: hashedAdminPass,
      role: 'admin'
    });
    console.log('✅ Admin user created: admin / admin1');

    const hashedUserPass = await bcrypt.hash('user123', 10);
    const sampleUsers = [
      { name: 'mhm.dev', email: 'hussainkadir245@gmail.com' },
      { name: 'okok', email: 'toviyox163@hebase.com' },
      { name: 'Zaid', email: 'xesav85362@crybio.com' }
    ];
    for (const u of sampleUsers) {
      await User.create({ ...u, password: hashedUserPass, role: 'user' });
    }
    console.log(`✅ ${sampleUsers.length} sample users created`);

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded`);

    console.log('\n🎉 Setup complete! You can now log in with admin / admin1');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();