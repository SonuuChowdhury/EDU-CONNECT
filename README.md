# EDU CONNECT 🎓

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg)](https://reactjs.org/)
[![Backend - Node.js](https://img.shields.io/badge/Backend-Node.js-green.svg)](https://nodejs.org/)
[![Database - MongoDB](https://img.shields.io/badge/Database-MongoDB-green.svg)](https://www.mongodb.com/)
[![Real-time - Socket.IO](https://img.shields.io/badge/Real--time-Socket.IO-black.svg)](https://socket.io/)

A comprehensive and modern institute management system designed to streamline administrative processes, enhance communication, and provide real-time analytics for educational institutions.

## 🌟 Key Features

- **Real-time Dashboard Analytics** 📊
  - Interactive charts and visualizations using Recharts
  - Real-time data updates via Socket.IO
  - Circular progress indicators for key metrics

- **Advanced User Management** 👥
  - Role-based access control
  - Secure authentication using JWT
  - Password encryption with bcrypt

- **Interactive Calendar System** 📅
  - Event scheduling and management
  - Academic calendar integration
  - Important date notifications

- **Document Management** 📄
  - Excel file processing with XLSX
  - File upload and management
  - Integrated with ImageKit for media handling

- **Communication Hub** 💬
  - Real-time notifications
  - Instant messaging system
  - Broadcast announcements

- **AI Integration** 🤖
  - Powered by Google's Generative AI
  - Smart automation features
  - Intelligent data processing

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **AOS** - Scroll animations
- **Font Awesome** - Icons
- **Swiper** - Touch sliders
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Redis** - Caching
- **Socket.IO** - Real-time events
- **JWT** - Authentication
- **Nodemailer** - Email services
- **ImageKit** - Media management
- **Google Generative AI** - AI features

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Redis

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/ADVANCED-INSTITUTE-MANAGEMENT-PORTAL.git
\`\`\`

2. Install Frontend dependencies
\`\`\`bash
cd Frontend
npm install
\`\`\`

3. Install Backend dependencies
\`\`\`bash
cd Backend
npm install
\`\`\`

4. Configure environment variables
\`\`\`bash
# Backend/.env
PORT=3000
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
\`\`\`

5. Start the development servers
\`\`\`bash
# Backend
npm run dev

# Frontend
cd ../Frontend
npm run dev
\`\`\`

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Environment variable protection
- Redis session management

## 🎯 Future Roadmap

- [ ] Mobile application development
- [ ] Advanced analytics dashboard
- [ ] Integration with learning management systems
- [ ] AI-powered student performance prediction
- [ ] Automated reporting system

## 👥 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 🤝 Support

For support, email support@institute-portal.com or join our Slack channel.

## 🌟 Acknowledgments

- AZ BUG BUSTERS team
- Smart India Hackathon 2024
- All contributors and supporters

---

Developed with ❤️ by AZ BUG BUSTERS @ SIH 2024
