import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';
import { pathToFileURL } from 'url';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const DB_URI = process.env.DB_URI;

// Build URLs to local frontend assets served statically by the backend at /assets
const ASSET_BASE = process.env.ASSET_BASE || 'http://localhost:5000';
const asset = (p) =>
  `${ASSET_BASE}/assets/${p.split('/').map(encodeURIComponent).join('/')}`;

// Import models
import User from '../models/user.js';
import Profile from '../models/profile.js';
import Category from '../models/category.js';
import Course from '../models/course.js';
import Section from '../models/section.js';
import SubSection from '../models/SubSection.js';
import Tag from '../models/tag.js';
import RatingAndReview from '../models/ratingAndReviews.js';
import CourseProgress from '../models/courseProgess.js';
import Cart from '../models/cart.js';
import OTP from '../models/otp.js';

async function seedDatabase() {
  try {
    if (!DB_URI) {
      console.error('DB_URI not set in .env');
      process.exit(1);
    }

    await mongoose.connect(DB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Category.deleteMany({});
    await Course.deleteMany({});
    await Section.deleteMany({});
    await SubSection.deleteMany({});
    await Tag.deleteMany({});
    await RatingAndReview.deleteMany({});
    await CourseProgress.deleteMany({});
    await Cart.deleteMany({});
    await OTP.deleteMany({});

    // Create Categories
    console.log('Creating categories...');
    const categories = await Category.insertMany([
      {
        name: 'Web Development',
        description: 'Learn web development from basics to advanced',
      },
      {
        name: 'Mobile Development',
        description: 'Build amazing mobile applications',
      },
      {
        name: 'Data Science',
        description: 'Master data science and machine learning',
      },
      {
        name: 'Cloud Computing',
        description: 'Learn cloud platforms and DevOps',
      },
      {
        name: 'Programming',
        description: 'Master core programming languages',
      },
      {
        name: 'Blockchain',
        description: 'Build decentralized apps and Web3 projects',
      },
      {
        name: 'Cyber Security',
        description: 'Ethical hacking and security fundamentals',
      },
      {
        name: 'Game Development',
        description: 'Create games with modern engines',
      },
    ]);
    console.log(`✓ Created ${categories.length} categories`);

    // Create Tags
    console.log('Creating tags...');
    const tags = await Tag.insertMany([
      {
        name: 'JavaScript',
        description: 'JavaScript programming language',
      },
      {
        name: 'React',
        description: 'React JavaScript library',
      },
      {
        name: 'Python',
        description: 'Python programming language',
      },
      {
        name: 'MongoDB',
        description: 'MongoDB database',
      },
      {
        name: 'Node.js',
        description: 'Node.js JavaScript runtime',
      },
    ]);
    console.log(`✓ Created ${tags.length} tags`);

    // Create Profiles for instructors
    console.log('Creating profiles...');
    const profiles = await Profile.insertMany([
      {
        gender: 'Male',
        dateOfBirth: '1990-01-15',
        about: 'Experienced full-stack developer with 10+ years experience',
        contactNumber: '+1234567890',
      },
      {
        gender: 'Female',
        dateOfBirth: '1992-05-20',
        about: 'Data scientist and AI enthusiast',
        contactNumber: '+1987654321',
      },
      {
        gender: 'Male',
        dateOfBirth: '1988-03-10',
        about: 'Cloud architect and DevOps expert',
        contactNumber: '+1555555555',
      },
    ]);
    console.log(`✓ Created ${profiles.length} profiles`);

    // Create Users (Instructors & Students)
    console.log('Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.insertMany([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'instructor@example.com',
        password: hashedPassword,
        gender: 'Male',
        accountType: 'Instructor',
        additionalDetails: profiles[0]._id,
        image: asset('Instructor.8b4c4f204053f0dfe844.png'),
        enrolledCourses: [],
        courses: [],
        cart: { courses: [], totalPrice: 0 },
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'instructor2@example.com',
        password: hashedPassword,
        gender: 'Female',
        accountType: 'Instructor',
        additionalDetails: profiles[1]._id,
        image: asset('aboutus/aboutus1.png'),
        enrolledCourses: [],
        courses: [],
        cart: { courses: [], totalPrice: 0 },
      },
      {
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'instructor3@example.com',
        password: hashedPassword,
        gender: 'Male',
        accountType: 'Instructor',
        additionalDetails: profiles[2]._id,
        image: asset('aboutus/aboutus2.png'),
        enrolledCourses: [],
        courses: [],
        cart: { courses: [], totalPrice: 0 },
      },
      {
        firstName: 'Alice',
        lastName: 'Brown',
        email: 'student1@example.com',
        password: hashedPassword,
        gender: 'Female',
        accountType: 'Student',
        additionalDetails: profiles[0]._id,
        image: asset('aboutus/aboutus3.f5cfba861877ea03735d.png'),
        enrolledCourses: [],
        courses: [],
        cart: { courses: [], totalPrice: 0 },
      },
      {
        firstName: 'Bob',
        lastName: 'Wilson',
        email: 'student2@example.com',
        password: hashedPassword,
        gender: 'Male',
        accountType: 'Student',
        additionalDetails: profiles[1]._id,
        image: asset('Call center-cuate.png'),
        enrolledCourses: [],
        courses: [],
        cart: { courses: [], totalPrice: 0 },
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create SubSections
    console.log('Creating subsections...');
    const subSections = await SubSection.insertMany([
      {
        title: 'Introduction to HTML',
        description: 'Learn the basics of HTML',
        videoUrl: 'https://example.com/videos/html-intro.mp4',
        duration: '15:30',
      },
      {
        title: 'CSS Basics',
        description: 'Style your web pages with CSS',
        videoUrl: 'https://example.com/videos/css-basics.mp4',
        duration: '20:45',
      },
      {
        title: 'JavaScript Fundamentals',
        description: 'Master JavaScript fundamentals',
        videoUrl:
          'https://example.com/videos/js-fundamentals.mp4',
        duration: '45:20',
      },
      {
        title: 'React Hooks',
        description: 'Learn React Hooks in depth',
        videoUrl: 'https://example.com/videos/react-hooks.mp4',
        duration: '35:15',
      },
      {
        title: 'MongoDB Basics',
        description: 'Introduction to MongoDB',
        videoUrl: 'https://example.com/videos/mongodb-basics.mp4',
        duration: '30:00',
      },
      {
        title: 'Python Data Analysis',
        description: 'Data analysis with Python',
        videoUrl:
          'https://example.com/videos/python-data-analysis.mp4',
        duration: '50:30',
      },
    ]);
    console.log(`✓ Created ${subSections.length} subsections`);

    // Create Sections
    console.log('Creating sections...');
    const sections = await Section.insertMany([
      {
        sectionName: 'Frontend Basics',
        subSection: [subSections[0]._id, subSections[1]._id],
      },
      {
        sectionName: 'JavaScript & React',
        subSection: [subSections[2]._id, subSections[3]._id],
      },
      {
        sectionName: 'Backend Fundamentals',
        subSection: [subSections[4]._id],
      },
      {
        sectionName: 'Data Science',
        subSection: [subSections[5]._id],
      },
    ]);
    console.log(`✓ Created ${sections.length} sections`);

    // Create Courses
    console.log('Creating courses...');
    const courses = await Course.insertMany([
      {
        courseName: 'The Complete Web Development Bootcamp',
        courseDescription:
          'Learn web development from scratch. Build real-world projects.',
        startDate: '2024-06-01',
        mode: 'Online',
        instructor: users[0]._id,
        whatYouWillLearn:
          'HTML, CSS, JavaScript, React, Node.js, MongoDB',
        category: categories[0]._id,
        courseContent: [sections[0]._id, sections[1]._id],
        status: 'Published',
        price: 4999,
        thumbnail: asset('courseListBanner/website-development-banner_33099-1687.png'),
        instruction: [
          'Complete all videos',
          'Build 5 projects',
          'Pass final exam',
        ],
        tag: ['JavaScript', 'React', 'Node.js'],
        studentsEnrolled: [users[3]._id, users[4]._id],
      },
      {
        courseName: 'Data Science & Machine Learning Masterclass',
        courseDescription:
          'Become a data scientist. Learn Python, Pandas, and ML.',
        startDate: '2024-07-01',
        mode: 'Online',
        instructor: users[1]._id,
        whatYouWillLearn:
          'Python, Pandas, NumPy, Scikit-learn, Machine Learning',
        category: categories[2]._id,
        courseContent: [sections[3]._id],
        status: 'Published',
        price: 3999,
        thumbnail: asset('courseListBanner/machine-lerning1-min-2048x695-1.png'),
        instruction: [
          'Complete all assignments',
          'Build ML models',
          'Participate in projects',
        ],
        tag: ['Python', 'Data Science'],
        studentsEnrolled: [users[4]._id],
      },
      {
        courseName: 'Cloud Computing with AWS',
        courseDescription:
          'Master AWS and cloud architecture. Deploy production apps.',
        startDate: '2024-08-01',
        mode: 'Online',
        instructor: users[2]._id,
        whatYouWillLearn:
          'AWS, EC2, S3, Lambda, RDS, VPC, CloudFront',
        category: categories[3]._id,
        courseContent: [],
        status: 'Published',
        price: 5999,
        thumbnail: asset('courseListBanner/cloud-computing (1).png'),
        instruction: [
          'Set up AWS account',
          'Deploy applications',
          'Optimize costs',
        ],
        tag: ['AWS', 'Cloud Computing'],
        studentsEnrolled: [users[3]._id],
      },
      {
        courseName: 'Mobile App Development with React Native',
        courseDescription:
          'Build cross-platform mobile apps with React Native.',
        startDate: '2024-09-01',
        mode: 'Online',
        instructor: users[0]._id,
        whatYouWillLearn:
          'React Native, JavaScript, Mobile UI/UX, Firebase',
        category: categories[1]._id,
        courseContent: [sections[1]._id],
        status: 'Published',
        price: 4499,
        thumbnail: asset('courseListBanner/202308021690977891.png'),
        instruction: [
          'Complete app projects',
          'Deploy to app stores',
        ],
        tag: ['React', 'Mobile Development'],
        studentsEnrolled: [],
      },
      {
        courseName: 'Python Programming Masterclass',
        courseDescription:
          'Go from beginner to pro in Python with hands-on projects.',
        startDate: '2024-10-01',
        mode: 'Online',
        instructor: users[1]._id,
        whatYouWillLearn:
          'Python syntax, OOP, file handling, automation, APIs',
        category: categories[4]._id,
        courseContent: [],
        status: 'Published',
        price: 2999,
        thumbnail: asset('courseListBanner/python-programing-banner.png'),
        instruction: [
          'Write daily code',
          'Build automation scripts',
          'Complete capstone project',
        ],
        tag: ['Python', 'Programming'],
        studentsEnrolled: [users[3]._id],
      },
      {
        courseName: 'Java Programming for Beginners',
        courseDescription:
          'Master core Java and object-oriented programming.',
        startDate: '2024-10-15',
        mode: 'Online',
        instructor: users[2]._id,
        whatYouWillLearn:
          'Java basics, OOP, collections, exceptions, JVM',
        category: categories[4]._id,
        courseContent: [],
        status: 'Published',
        price: 3499,
        thumbnail: asset('courseListBanner/Java-Programming-Training-For-Beginners.png'),
        instruction: [
          'Complete all exercises',
          'Build console apps',
          'Pass the final quiz',
        ],
        tag: ['Java', 'Programming'],
        studentsEnrolled: [],
      },
      {
        courseName: 'Blockchain & Web3 Development',
        courseDescription:
          'Build decentralized apps and smart contracts on Ethereum.',
        startDate: '2024-11-01',
        mode: 'Online',
        instructor: users[0]._id,
        whatYouWillLearn:
          'Solidity, smart contracts, Web3.js, dApps, NFTs',
        category: categories[5]._id,
        courseContent: [],
        status: 'Published',
        price: 6999,
        thumbnail: asset('courseListBanner/blockchain-course.png'),
        instruction: [
          'Deploy a smart contract',
          'Build a dApp',
          'Mint an NFT',
        ],
        tag: ['Blockchain', 'Web3', 'Solidity'],
        studentsEnrolled: [users[4]._id],
      },
      {
        courseName: 'Ethical Hacking & Cyber Security',
        courseDescription:
          'Learn penetration testing and how to secure systems.',
        startDate: '2024-11-15',
        mode: 'Online',
        instructor: users[1]._id,
        whatYouWillLearn:
          'Networking, Linux, pentesting, OWASP, security tools',
        category: categories[6]._id,
        courseContent: [],
        status: 'Published',
        price: 5499,
        thumbnail: asset('courseListBanner/cyberSecurity.png'),
        instruction: [
          'Set up a lab environment',
          'Run vulnerability scans',
          'Write a security report',
        ],
        tag: ['Cyber Security', 'Ethical Hacking'],
        studentsEnrolled: [],
      },
      {
        courseName: 'Game Development with Unity',
        courseDescription:
          'Create 2D and 3D games from scratch using Unity and C#.',
        startDate: '2024-12-01',
        mode: 'Online',
        instructor: users[2]._id,
        whatYouWillLearn:
          'Unity engine, C#, physics, animation, game design',
        category: categories[7]._id,
        courseContent: [],
        status: 'Published',
        price: 4799,
        thumbnail: asset('courseListBanner/gameDevelopment.png'),
        instruction: [
          'Build a 2D platformer',
          'Build a 3D game',
          'Publish to a store',
        ],
        tag: ['Game Development', 'Unity', 'C#'],
        studentsEnrolled: [],
      },
      {
        courseName: 'DevOps Engineering: CI/CD & Docker',
        courseDescription:
          'Automate builds and deployments with Docker, CI/CD and Kubernetes.',
        startDate: '2024-12-15',
        mode: 'Online',
        instructor: users[0]._id,
        whatYouWillLearn:
          'Docker, Kubernetes, CI/CD pipelines, Git, monitoring',
        category: categories[3]._id,
        courseContent: [],
        status: 'Published',
        price: 5299,
        thumbnail: asset('courseListBanner/image.png'),
        instruction: [
          'Containerize an app',
          'Build a CI/CD pipeline',
          'Deploy to Kubernetes',
        ],
        tag: ['DevOps', 'Docker', 'Kubernetes'],
        studentsEnrolled: [users[3]._id],
      },
    ]);
    console.log(`✓ Created ${courses.length} courses`);

    // Update courses in Category
    categories[0].courses = [courses[0]._id];            // Web Development
    categories[1].courses = [courses[3]._id];            // Mobile Development
    categories[2].courses = [courses[1]._id];            // Data Science
    categories[3].courses = [courses[2]._id, courses[9]._id]; // Cloud Computing
    categories[4].courses = [courses[4]._id, courses[5]._id]; // Programming
    categories[5].courses = [courses[6]._id];            // Blockchain
    categories[6].courses = [courses[7]._id];            // Cyber Security
    categories[7].courses = [courses[8]._id];            // Game Development
    await Promise.all(categories.map(cat => cat.save()));

    // Update instructor courses
    users[0].courses = [courses[0]._id, courses[3]._id, courses[6]._id, courses[9]._id];
    users[1].courses = [courses[1]._id, courses[4]._id, courses[7]._id];
    users[2].courses = [courses[2]._id, courses[5]._id, courses[8]._id];
    users[3].enrolledCourses = [courses[0]._id, courses[2]._id, courses[4]._id, courses[9]._id];
    users[4].enrolledCourses = [courses[0]._id, courses[1]._id, courses[6]._id];

    // Add courses to carts
    users[3].cart.courses = [courses[2]._id];
    users[3].cart.totalPrice = courses[2].price;
    users[4].cart.courses = [courses[3]._id];
    users[4].cart.totalPrice = courses[3].price;

    await Promise.all(users.map(user => user.save()));
    console.log(`✓ Updated user courses and enrollments`);

    // Create Ratings and Reviews
    console.log('Creating ratings and reviews...');
    const reviews = await RatingAndReview.insertMany([
      {
        user: users[3]._id,
        rating: 5,
        review: 'Excellent course! Highly recommended.',
        course: courses[0]._id,
      },
      {
        user: users[4]._id,
        rating: 4,
        review: 'Great content but needs more practice problems.',
        course: courses[0]._id,
      },
      {
        user: users[4]._id,
        rating: 5,
        review: 'Amazing data science course!',
        course: courses[1]._id,
      },
    ]);
    console.log(`✓ Created ${reviews.length} ratings and reviews`);

    // Update courses with reviews
    courses[0].ratingAndReviews = [reviews[0]._id, reviews[1]._id];
    courses[1].ratingAndReviews = [reviews[2]._id];
    await Promise.all([courses[0].save(), courses[1].save()]);

    // Update users with reviews
    users[3].ratingAndReview = [reviews[0]._id];
    users[4].ratingAndReview = [reviews[1]._id, reviews[2]._id];
    await Promise.all([users[3].save(), users[4].save()]);

    console.log(`✓ Updated course and user reviews`);

    // Create Course Progress
    console.log('Creating course progress...');
    const courseProgress = await CourseProgress.insertMany([
      {
        courseID: courses[0]._id,
        userId: users[3]._id,
        completedVideos: [subSections[0]._id],
      },
      {
        courseID: courses[0]._id,
        userId: users[4]._id,
        completedVideos: [
          subSections[0]._id,
          subSections[1]._id,
          subSections[2]._id,
        ],
      },
      {
        courseID: courses[1]._id,
        userId: users[4]._id,
        completedVideos: [subSections[5]._id],
      },
    ]);
    console.log(`✓ Created ${courseProgress.length} course progress records`);

    // Update users with course progress
    users[3].courseProgress = [courseProgress[0]._id];
    users[4].courseProgress = [courseProgress[1]._id, courseProgress[2]._id];
    await Promise.all([users[3].save(), users[4].save()]);

    console.log('✓ All data seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`  • Categories: ${categories.length}`);
    console.log(`  • Tags: ${tags.length}`);
    console.log(`  • Users: ${users.length} (3 Instructors, 2 Students)`);
    console.log(`  • Profiles: ${profiles.length}`);
    console.log(`  • Courses: ${courses.length}`);
    console.log(`  • Sections: ${sections.length}`);
    console.log(`  • SubSections: ${subSections.length}`);
    console.log(`  • Reviews: ${reviews.length}`);
    console.log(`  • Course Progress: ${courseProgress.length}`);
    console.log('\n🔑 Credentials:');
    console.log('  Instructor: instructor@example.com');
    console.log('  Student: student1@example.com');
    console.log('  Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
