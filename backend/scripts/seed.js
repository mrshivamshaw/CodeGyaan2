import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';
import { pathToFileURL } from 'url';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const DB_URI = process.env.DB_URI;

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
        image:
          'https://api.example.com/images/instructor1.jpg',
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
        image:
          'https://api.example.com/images/instructor2.jpg',
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
        image:
          'https://api.example.com/images/instructor3.jpg',
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
        image:
          'https://api.example.com/images/student1.jpg',
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
        image:
          'https://api.example.com/images/student2.jpg',
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
        thumbnail:
          'https://api.example.com/images/web-dev-course.jpg',
        instruction: [
          'Complete all videos',
          'Build 5 projects',
          'Pass final exam',
        ],
        tag: ['JavaScript', 'React', 'Node.js'],
        studentsEnrolled: [users[3]._id, users[4]._id],
      },
      {
        courseName: 'Data Science Masterclass',
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
        thumbnail:
          'https://api.example.com/images/data-science-course.jpg',
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
        thumbnail:
          'https://api.example.com/images/aws-course.jpg',
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
        status: 'Draft',
        price: 4499,
        thumbnail:
          'https://api.example.com/images/react-native-course.jpg',
        instruction: [
          'Complete app projects',
          'Deploy to app stores',
        ],
        tag: ['React', 'Mobile Development'],
        studentsEnrolled: [],
      },
    ]);
    console.log(`✓ Created ${courses.length} courses`);

    // Update courses in Category
    categories[0].courses = [courses[0]._id];
    categories[1].courses = [courses[3]._id];
    categories[2].courses = [courses[1]._id];
    categories[3].courses = [courses[2]._id];
    await Promise.all(categories.map(cat => cat.save()));

    // Update instructor courses
    users[0].courses = [courses[0]._id, courses[3]._id];
    users[1].courses = [courses[1]._id];
    users[2].courses = [courses[2]._id];
    users[3].enrolledCourses = [courses[0]._id, courses[2]._id];
    users[4].enrolledCourses = [courses[0]._id, courses[1]._id];

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
