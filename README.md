# 👥 Employee Management System

Modern employee management application built with React, TypeScript, and Airtable integration.

## 🚀 Live Demo

**[View Live Demo →](https://your-deployment-url.vercel.app)**

## ✨ Features

- 📊 **Real-time data** from Airtable
- 🔍 **Advanced filtering** by department, job title, status
- 🔎 **Smart search** across multiple fields
- ✏️ **Add new employees** with form validation
- 📱 **Responsive design** for all devices
- ⚡ **Fast performance** with React Query caching
- 🎨 **Modern UI** with Material-UI components

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Styling**: SCSS Modules + Emotion
- **State Management**: React Query
- **Forms**: React Hook Form + Yup validation
- **Animations**: Framer Motion
- **Backend**: Airtable API
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/employee-management.git
cd employee-management

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your Airtable credentials

# Start development server
npm run dev
```

## ⚙️ Environment Setup

Create `.env` file in project root:

```env
VITE_AIRTABLE_API_KEY=your_airtable_api_key
VITE_AIRTABLE_BASE_ID=your_base_id
VITE_AIRTABLE_TABLE_NAME=Employee list
```

### Getting Airtable Credentials:

1. Go to [Airtable.com](https://airtable.com)
2. Create account and base with "Employee list" table
3. Get API key from [Account settings](https://airtable.com/account)
4. Get Base ID from API documentation

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Connect [Vercel](https://vercel.com) to your repository
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Option 2: Netlify

1. Push code to GitHub
2. Connect [Netlify](https://netlify.com) to your repository  
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables

## 📁 Project Structure

```
src/
├── components/
│   ├── EmployeeList/      # Main table component
│   ├── EmployeeFilters/   # Filtering & search
│   └── AddEmployeeForm/   # Employee creation form
├── hooks/
│   └── useAirtable.ts     # API integration
├── types/
│   └── employee.ts        # TypeScript types
├── config/
│   └── airtable.ts        # API configuration
└── theme/
    └── theme.ts           # MUI theme
```

## 🏗️ Architecture

### Data Flow
1. **Airtable API** → React Query → Components
2. **Filtering**: Client-side with multiple criteria
3. **Forms**: React Hook Form + Yup validation
4. **State**: Local state + React Query cache

### Performance Optimizations
- React Query caching and background updates
- SCSS modules for scoped styling
- Material-UI tree-shaking
- TypeScript for compile-time optimization

## 📱 Responsive Design

- **Desktop**: Full table with all columns
- **Tablet**: Responsive grid layout
- **Mobile**: Card-based layout with essential info

## 🔧 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint check
```

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Author

**Denis Shapochkin**
- GitHub: [@denisshapochkin](https://github.com/denisshapochkin)
- Email: your.email@example.com

---

⭐ Star this repository if you found it helpful!
