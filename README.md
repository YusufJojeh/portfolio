# Yusuf Mohammad Jojeh - Portfolio Website

A modern, responsive portfolio website built with React.js, Tailwind CSS, and Framer Motion. Showcasing the skills, experience, and projects of Yusuf Mohammad Jojeh, a Full-Stack Developer from Aleppo, Syria.

## 🚀 Features

- **Modern Design**: Clean, professional design with glassmorphism effects
- **Responsive**: Fully responsive across all devices and screen sizes
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **Interactive Components**: Engaging user interactions and hover effects
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels
- **Performance**: Optimized for fast loading with lazy loading and code splitting

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Frontend**: React 19.1.0
- **Styling**: Tailwind CSS 3.4.0
- **Animations**: Framer Motion 11.0.0
- **Icons**: Lucide React 0.400.0
- **Internationalization**: next-intl 4.7.0
- **3D Graphics**: Three.js 0.182.0
- **Package Manager**: npm

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YusufJojeh/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `.next` directory.

### 5. Start Production Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx     # Navigation header
│   │   ├── Hero.jsx       # Hero section
│   │   ├── About.jsx      # About section
│   │   ├── Skills.jsx     # Skills section
│   │   ├── Experience.jsx # Experience timeline
│   │   ├── Projects.jsx   # Projects showcase
│   │   ├── Contact.jsx    # Contact form
│   │   └── Footer.jsx     # Footer
│   ├── contexts/          # React contexts
│   │   └── ThemeContext.jsx # Theme management
│   ├── data/              # Portfolio data
│   │   └── portfolio.js   # Personal information and data
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## 🎨 Customization

### Personal Information

Update your personal information in `src/data/portfolio.js`:

```javascript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  location: "Your Location",
  summary: "Your summary...",
  contact: {
    phone: "Your Phone",
    email: "your.email@example.com",
    github: "github.com/yourusername",
    linkedin: "linkedin.com/in/yourusername"
  }
};
```

### Styling

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Fonts**: Update Google Fonts in `index.html`
- **Animations**: Customize animations in `src/index.css`

### Content

- **Projects**: Add/remove projects in the `projects` array
- **Skills**: Update skills and proficiency levels
- **Experience**: Modify work experience entries
- **Education**: Update educational background

## 🌐 Deployment

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Deploy automatically on every push

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Netlify

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables if needed
4. Deploy

### Other Platforms

For other platforms (AWS, DigitalOcean, etc.):
1. Build the project: `npm run build`
2. Start the production server: `npm start`
3. Ensure Node.js 18+ is available
4. Set `NODE_ENV=production`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: yassaf.jojah@gmail.com
- **Phone**: +963 980 278 664
- **GitHub**: [github.com/YusufJojeh](https://github.com/YusufJojeh)
- **LinkedIn**: [linkedin.com/in/yusuf-jojeh](https://linkedin.com/in/yusuf-jojeh)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [Vite](https://vitejs.dev/) - Build tool

---

Made with ❤️ by Yusuf Mohammad Jojeh
